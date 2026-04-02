# What Happened

## The Experiment

We transformed E. coli with the pGLO plasmid, grew them in a 96-well plate, and measured growth and fluorescence over 4 hours. The ones with the plasmid glowed much brighter than the controls without it.

## The Numbers

Using the example data included here:

- **Host bacteria (no plasmid):** fluorescence = 1,368
- **Bacteria with pGLO:** fluorescence = 8,133
- **Difference:** 5.94x brighter

The pGLO transformants grew at the same rate as the controls, so the extra brightness is real GFP expression, not just because there were more cells.

## The Controls

We included:

- **Media only:** stayed dark and clear (no bacteria)
- **Bacteria without plasmid:** weak fluorescence (just cell autofluorescence)
- **Bacteria with pGLO:** bright green fluorescence

This confirms the plasmid is doing its job.

## Plots

The analysis script generated two plots:

- `results/figures/normalized-fluorescence.png` — growth and brightness over time
- `results/figures/fold-change-vs-host.png` — how much brighter the transformants are

## Limitations

This example dataset is for demonstration. For real science:

- Run it yourself with your own cells
- Include multiple biological replicates
- Verify the plasmid DNA sequence (we have GenBank files for that in `constructs/`)
- If you sequenced it, add those traces

## What's Next

Someone coming after you can:

1. Use this folder structure as a template for their own project
2. Modify the protocols for their organism or plasmid
3. Re-run the analysis script with their own data
4. Share their new project the same way
