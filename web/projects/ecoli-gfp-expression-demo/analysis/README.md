# Analysis Guide

## Purpose

This folder contains scripts to process plate-reader data, generate figures, and run a simple GFP expression model.

## Scripts

- `process_plate_data.py`: computes grouped summary statistics and normalized fluorescence
- `plot_results.py`: generates plots from summary statistics
- `simple-expression-model.py`: runs a minimal expression model parameter sweep

## Run Order

1. Process data:

```bash
python3 process_plate_data.py \
  --raw ../data/raw/plate-reader-example.csv \
  --map ../data/raw/metadata-sample-map.csv \
  --out ../data/processed/summary-stats.csv
```

2. Generate figures:

```bash
python3 plot_results.py \
  --summary ../data/processed/summary-stats.csv \
  --outdir ../results/figures
```

3. Run model sweep:

```bash
python3 simple-expression-model.py --out ../data/processed/model-sweep.csv
```

## Dependencies

- Python 3.10+
- `matplotlib` for plot generation

Install optional plotting dependency:

```bash
python3 -m pip install matplotlib
```
