# E. coli GFP Expression Demo

This is a complete example of a bioengineering project on BioBlueprint. It walks you through transforming bacteria with a fluorescent plasmid, measuring the cells, and analyzing the data. Everything is here: the protocols, the raw data, the code to process it, and the results. If you can follow this, you can repeat it.

## What We're Doing

We're taking E. coli bacteria and putting a plasmid (a circle of DNA) into them that makes them glow under UV light. Then we'll measure how much they grow and how bright they are, compared to normal bacteria without the plasmid.

**Safety:** This is BSL-1. The bacteria are harmless. Standard lab precautions apply.

## What You'll Need

- E. coli K-12 HB101 (competent cells)
- pGLO plasmid DNA
- LB media and agar
- Ampicillin (antibiotic to select transformed cells)
- L-arabinose (sugar to turn on the fluorescent genes)
- 96-well plate (black, clear bottom)
- Plate reader (one that measures OD600 and fluorescence around 510 nm)
- Shaking incubator (37°C)
- Basic sterile lab supplies

## How This Project is Organized

Before you start, take a look at the layout so you know where to find things:

- **protocols/** → step-by-step instructions (you'll follow these)
- **constructs/** → the genetic sequences (plasmid info)
- **data/raw/** → the actual measurements from the plate reader
- **data/processed/** → cleaned-up data after running scripts
- **analysis/** → Python scripts that turn raw data into results
- **results/** → figures and summaries
- **docs/** → extra context and a checklist

## The Workflow

### Step 1: Transform the Cells

Read `protocols/transformation.md`. This tells you how to mix competent cells with plasmid DNA, recover them, and plate them out. Pay attention to:

- How you set up the plates
- How you label everything (you'll have many plates)
- Where colonies grow and what they look like

### Step 2: Pick Colonies and Grow Overnight Cultures

Follow `protocols/induction-and-measurement.md`. You'll:

- Pick colonies that grew from the transformation
- Grow them in liquid culture overnight
- Measure the starting cell density so you can dilute to OD600 = 0.05 for the experiment

### Step 3: Set Up the Plate Reader Experiment

Load the 96-well plate with your samples (follow the map in `data/raw/metadata-sample-map.csv`):

- Column A: media only (blank)
- Column B: bacteria without plasmid (negative control)
- Columns C-E: bacteria with pGLO plasmid (three replicates)

Run the plate reader every 30 minutes for 4 hours. It will measure:

- OD600 (cell growth)
- Fluorescence (how bright the GFP is)

Save the results as a CSV file in the format shown in `data/raw/plate-reader-example.csv`.

### Step 4: Add L-arabinose (Optional)

The pGLO plasmid only turns on the GFP genes if L-arabinose is present. Your experiment might test:

- Cultures with L-arabinose added (GFP should turn on)
- Cultures without it (baseline)

See `protocols/induction-and-measurement.md` for details.

### Step 5: Process the Raw Data

Once you have your plate reader CSV, run:

```bash
cd web/projects/ecoli-gfp-expression-demo
python3 analysis/process_plate_data.py \
  --raw data/raw/plate-reader-example.csv \
  --map data/raw/metadata-sample-map.csv \
  --out data/processed/summary-stats.csv
```

This script:

- Normalizes fluorescence by cell density (to account for growth differences)
- Calculates fold-change compared to controls
- Checks data quality

The output goes to `data/processed/summary-stats.csv`.

### Step 6: Generate Figures

```bash
python3 analysis/plot_results.py \
  --summary data/processed/summary-stats.csv \
  --outdir results/figures
```

This makes plots showing:

- Growth curves (OD vs time)
- Fluorescence over time
- Comparison to controls

### Step 7: Optional—Run a Simple Model

If you want to model GFP expression dynamics, run:

```bash
python3 analysis/simple-expression-model.py \
  --out data/processed/model-sweep.csv
```

This simulates different expression rates and plots them alongside your data.

### Step 8: Check Reproducibility

Open `docs/reproducibility-checklist.md` and go through it. Did you capture everything? Are there notes for the next person? This is where you confirm the project is complete.

## Images (Optional but Helpful)

If you want to make this project easier for someone else to follow, take photos of each stage and put them in `docs/images/`. Name them like this:

1. `01-workbench-setup.jpg` — your full bench with all reagents labeled
2. `02-transformation-plating.jpg` — the transformation day, showing recovery and plating
3. `03-colony-selection.jpg` — the plate with colonies, marked with which ones you picked
4. `04-culture-tubes.jpg` — your overnight cultures, clearly labeled
5. `05-plate-before-reader.jpg` — the loaded 96-well plate before the first read
6. `06-plate-reader-settings.jpg` — your instrument setup (temperature, wavelengths, shaking)
7. `07-raw-data-preview.jpg` — first few rows of the plate reader export
8. `08-analysis-run.jpg` — terminal output showing the script running successfully
9. `09-generated-figures.jpg` — your final plots
10. `10-results-comparison.jpg` — control vs transformant side-by-side

Optional bonus images:

- Plasmid map screenshots
- Gel electrophoresis or DNA quality checks
- Sanger sequencing traces (if you have them)

## One More Thing

You also need:

- `constructs/pGLO.gb` — GenBank file for the plasmid (so others can see the sequence)
- `constructs/pGLO.fasta` — FASTA version of the sequence
- Optional: `constructs/sanger-traces/` — if you verified the DNA by sequencing

once you have these, your project is publication-ready for BioBlueprint.
