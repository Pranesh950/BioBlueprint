#!/usr/bin/env python3
"""Simple GFP expression model parameter sweep.

Model (toy steady-state proxy):
  GFP(t+1) = GFP(t) + alpha * growth - beta * GFP(t)

where alpha scales production, beta scales dilution/degradation.
"""

from __future__ import annotations

import argparse
import csv
from pathlib import Path


def simulate(alpha: float, beta: float, growth: float, steps: int) -> list[float]:
  gfp = 0.0
  values = []
  for _ in range(steps):
    gfp = gfp + alpha * growth - beta * gfp
    values.append(gfp)
  return values


def main() -> None:
  parser = argparse.ArgumentParser(description="Run simple GFP model sweep")
  parser.add_argument("--out", type=Path, required=True, help="Output CSV path")
  parser.add_argument("--steps", type=int, default=10, help="Number of time steps")
  args = parser.parse_args()

  alpha_values = [0.2, 0.35, 0.5]
  beta_values = [0.05, 0.1, 0.2]
  growth = 1.0

  args.out.parent.mkdir(parents=True, exist_ok=True)

  with args.out.open("w", encoding="utf-8", newline="") as handle:
    writer = csv.writer(handle)
    writer.writerow(["alpha", "beta", "time_step", "predicted_gfp"])

    for alpha in alpha_values:
      for beta in beta_values:
        values = simulate(alpha=alpha, beta=beta, growth=growth, steps=args.steps)
        for index, value in enumerate(values):
          writer.writerow([f"{alpha:.2f}", f"{beta:.2f}", index, f"{value:.4f}"])

  print(f"Wrote model sweep -> {args.out}")


if __name__ == "__main__":
  main()
