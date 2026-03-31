# E. coli GFP Expression Demo

This project is written like an Instructables build so a new lab member can reproduce the full workflow end-to-end.

## Intro

Goal: transform E. coli K-12 HB101 with the pGLO plasmid, induce expression with L-arabinose, measure OD600 and fluorescence, and regenerate the same processed tables and figures from raw data.

Expected biosafety level: BSL-1.

## Supplies

- E. coli K-12 HB101 competent cells
- pGLO plasmid DNA
- LB media and agar
- Ampicillin stock
- L-arabinose
- 96-well black clear-bottom plate
- Sterile tips and tubes
- Plate reader with OD600 and GFP channel (Ex 485 nm, Em 510-530 nm)
- 37C shaking incubator

## Before You Start

1. Read metadata/biological-context.txt.
2. Confirm controls and acceptance criteria in protocols/induction-and-measurement.md.
3. Verify project file map in docs/reproducibility-checklist.md.

## Step 1: Transform Cells

Follow protocols/transformation.md.

What to capture:
- Plating setup
- Labeling strategy
- Colony outcomes after incubation

## Step 2: Prepare Cultures for Measurement

Use protocols/induction-and-measurement.md.

Critical details:
- Dilute to OD600 = 0.05
- Dispense plate according to data/raw/metadata-sample-map.csv
- Include media blank, host control, and pGLO transformant conditions

## Step 3: Run Plate Reader Timecourse

Use a 30-minute interval for 4 hours with shaking between reads.

Output required:
- data/raw/plate-reader-example.csv format
- Columns: time_min, condition, replicate, od600, fluorescence_au

## Step 4: Process Raw Data

Run:

python3 analysis/process_plate_data.py --raw data/raw/plate-reader-example.csv --map data/raw/metadata-sample-map.csv --out data/processed/summary-stats.csv

## Step 5: Generate Plots

Run:

python3 analysis/plot_results.py --summary data/processed/summary-stats.csv --outdir results/figures

## Step 6: Run Simple Expression Model

Run:

python3 analysis/simple-expression-model.py --out data/processed/model-sweep.csv

## Step 7: Confirm Reproducibility

Complete docs/reproducibility-checklist.md.

## Required Image Upload List

Create a folder named docs/images and upload these images with the exact filenames below.

1. 01-workbench-setup.jpg
What to show: full bench layout with labeled reagents and sterile area.

2. 02-transformation-plating.jpg
What to show: transformation recovery and plating workflow.

3. 03-colony-selection.jpg
What to show: colony plate with selected colonies marked.

4. 04-culture-tubes-labeled.jpg
What to show: overnight cultures with clear condition labels.

5. 05-plate-map-before-read.jpg
What to show: loaded 96-well plate before first read.

6. 06-plate-reader-settings.jpg
What to show: instrument method screen showing OD600 and GFP settings.

7. 07-raw-export-preview.jpg
What to show: first few rows of exported raw table.

8. 08-analysis-script-run.jpg
What to show: terminal run of processing script with output path visible.

9. 09-final-figure-preview.jpg
What to show: generated fluorescence and growth plots.

10. 10-results-summary.jpg
What to show: final comparison of host control vs pGLO transformant.

## Optional Advanced Uploads

- 11-plasmid-map-screenshot.jpg
- 12-gel-or-qc-image.jpg
- 13-sanger-trace-preview.jpg

## Molecular Files You Still Need to Add

- constructs/pGLO.gb
- constructs/pGLO.fasta
- Optional: constructs/sanger-traces (ab1 or zip)
