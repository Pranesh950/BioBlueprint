#!/usr/bin/env python3
"""Generate figures from processed GFP summary statistics."""

from __future__ import annotations

import argparse
import csv
from collections import defaultdict
from pathlib import Path


def load_summary(path: Path) -> dict[str, dict[str, list[float]]]:
  grouped: dict[str, dict[str, list[float]]] = defaultdict(lambda: defaultdict(list))

  with path.open("r", encoding="utf-8", newline="") as handle:
    reader = csv.DictReader(handle)
    for row in reader:
      condition = row["condition"]
      grouped[condition]["time"].append(float(row["time_min"]))
      grouped[condition]["norm"].append(float(row["mean_fluorescence_per_od"]))
      grouped[condition]["norm_sd"].append(float(row["sd_fluorescence_per_od"]))

  return grouped


def make_plot(summary_path: Path, outdir: Path) -> None:
  try:
    import matplotlib.pyplot as plt
  except ImportError as error:
    raise SystemExit(
      "matplotlib is required for plotting. Install with: python3 -m pip install matplotlib"
    ) from error

  grouped = load_summary(summary_path)

  outdir.mkdir(parents=True, exist_ok=True)

  plt.figure(figsize=(8, 5))
  for condition, series in grouped.items():
    if condition == "media_blank":
      continue
    plt.plot(series["time"], series["norm"], marker="o", label=condition)

  plt.title("Normalized Fluorescence Over Time")
  plt.xlabel("Time (min)")
  plt.ylabel("Mean fluorescence / OD600")
  plt.grid(alpha=0.3)
  plt.legend()
  plt.tight_layout()
  plt.savefig(outdir / "normalized-fluorescence.png", dpi=180)
  plt.close()

  if "host_control" in grouped and "gfp_clone" in grouped:
    host = grouped["host_control"]
    gfp = grouped["gfp_clone"]
    fold = [g / h if h else 0.0 for g, h in zip(gfp["norm"], host["norm"])]

    plt.figure(figsize=(8, 5))
    plt.plot(gfp["time"], fold, marker="o", color="#1f6feb")
    plt.axhline(1.0, linestyle="--", color="#8c959f")
    plt.title("GFP Clone Fold-Change vs Host Control")
    plt.xlabel("Time (min)")
    plt.ylabel("Fold-change")
    plt.grid(alpha=0.3)
    plt.tight_layout()
    plt.savefig(outdir / "fold-change-vs-host.png", dpi=180)
    plt.close()


def main() -> None:
  parser = argparse.ArgumentParser(description="Create GFP summary plots")
  parser.add_argument("--summary", type=Path, required=True, help="Processed summary CSV")
  parser.add_argument("--outdir", type=Path, required=True, help="Directory for output figures")
  args = parser.parse_args()

  make_plot(args.summary, args.outdir)
  print(f"Wrote figures -> {args.outdir}")


if __name__ == "__main__":
  main()
