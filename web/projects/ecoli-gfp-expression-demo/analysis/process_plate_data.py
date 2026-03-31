#!/usr/bin/env python3
"""Process raw plate-reader GFP data into grouped summary statistics."""

from __future__ import annotations

import argparse
import csv
import math
from collections import defaultdict
from pathlib import Path


EXPECTED_MAP_COLUMNS = {"well", "condition", "replicate"}
EXPECTED_RAW_COLUMNS = {"time_min", "condition", "replicate", "od600", "fluorescence_au"}


def read_csv_rows(path: Path) -> list[dict[str, str]]:
  with path.open("r", encoding="utf-8", newline="") as handle:
    reader = csv.DictReader(handle)
    return list(reader)


def mean(values: list[float]) -> float:
  return sum(values) / len(values) if values else float("nan")


def stdev(values: list[float]) -> float:
  if len(values) < 2:
    return 0.0
  m = mean(values)
  return math.sqrt(sum((value - m) ** 2 for value in values) / (len(values) - 1))


def validate_columns(rows: list[dict[str, str]], required: set[str], file_label: str) -> None:
  if not rows:
    raise ValueError(f"{file_label}: no rows found")

  available = set(rows[0].keys())
  missing = sorted(required - available)
  if missing:
    raise ValueError(f"{file_label}: missing columns: {', '.join(missing)}")


def build_summary(raw_rows: list[dict[str, str]]) -> list[dict[str, str]]:
  grouped: dict[tuple[int, str], list[dict[str, float]]] = defaultdict(list)

  for row in raw_rows:
    time_min = int(row["time_min"])
    condition = row["condition"]
    od600 = float(row["od600"])
    fluorescence = float(row["fluorescence_au"])
    norm = fluorescence / od600 if od600 > 0 else float("nan")

    grouped[(time_min, condition)].append(
      {
        "od600": od600,
        "fluorescence": fluorescence,
        "normalized": norm,
      }
    )

  host_norm_by_time: dict[int, float] = {}
  for (time_min, condition), values in grouped.items():
    if condition == "host_control":
      host_norm_by_time[time_min] = mean([value["normalized"] for value in values])

  ordered_keys = sorted(grouped.keys(), key=lambda item: (item[0], item[1]))
  output_rows: list[dict[str, str]] = []

  for time_min, condition in ordered_keys:
    values = grouped[(time_min, condition)]
    od_vals = [item["od600"] for item in values]
    fl_vals = [item["fluorescence"] for item in values]
    norm_vals = [item["normalized"] for item in values]

    mean_norm = mean(norm_vals)
    host_norm = host_norm_by_time.get(time_min)
    fold_vs_host = mean_norm / host_norm if host_norm and condition != "media_blank" else ""

    output_rows.append(
      {
        "time_min": str(time_min),
        "condition": condition,
        "n": str(len(values)),
        "mean_od600": f"{mean(od_vals):.3f}",
        "sd_od600": f"{stdev(od_vals):.3f}",
        "mean_fluorescence_au": f"{mean(fl_vals):.1f}",
        "sd_fluorescence_au": f"{stdev(fl_vals):.1f}",
        "mean_fluorescence_per_od": f"{mean_norm:.1f}",
        "sd_fluorescence_per_od": f"{stdev(norm_vals):.1f}",
        "fold_vs_host": f"{fold_vs_host:.2f}" if isinstance(fold_vs_host, float) else "",
      }
    )

  return output_rows


def write_summary(path: Path, rows: list[dict[str, str]]) -> None:
  fieldnames = [
    "time_min",
    "condition",
    "n",
    "mean_od600",
    "sd_od600",
    "mean_fluorescence_au",
    "sd_fluorescence_au",
    "mean_fluorescence_per_od",
    "sd_fluorescence_per_od",
    "fold_vs_host",
  ]

  path.parent.mkdir(parents=True, exist_ok=True)
  with path.open("w", encoding="utf-8", newline="") as handle:
    writer = csv.DictWriter(handle, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)


def main() -> None:
  parser = argparse.ArgumentParser(description="Process GFP plate reader dataset")
  parser.add_argument("--raw", type=Path, required=True, help="Raw plate-reader CSV")
  parser.add_argument("--map", type=Path, required=True, help="Sample map CSV")
  parser.add_argument("--out", type=Path, required=True, help="Output summary CSV")
  args = parser.parse_args()

  raw_rows = read_csv_rows(args.raw)
  map_rows = read_csv_rows(args.map)

  validate_columns(raw_rows, EXPECTED_RAW_COLUMNS, "raw")
  validate_columns(map_rows, EXPECTED_MAP_COLUMNS, "map")

  summary_rows = build_summary(raw_rows)
  write_summary(args.out, summary_rows)

  print(f"Wrote summary rows: {len(summary_rows)} -> {args.out}")


if __name__ == "__main__":
  main()
