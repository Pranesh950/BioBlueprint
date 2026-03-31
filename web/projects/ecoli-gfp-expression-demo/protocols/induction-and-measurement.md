# Growth and Fluorescence Measurement Protocol

## Objective

Measure GFP signal and growth kinetics for transformed and control strains.

## Design

- Conditions:
  - `media_blank`
  - `host_control` (HB101-CTRL-01)
  - `gfp_clone` (HB101-pGLO-01, +L-arabinose)
- Replicates: 3 technical replicates per condition
- Readouts: OD600 and GFP fluorescence (Ex 485 nm, Em 510-530 nm)

## Materials

- LB + ampicillin + L-arabinose for transformed culture
- LB (no antibiotic) for host control
- Black clear-bottom 96-well plate

## Equipment

- Plate reader with OD600 and fluorescence channels
- 37C shaking incubator

## Steps

1. Inoculate overnight starter cultures for each condition.
2. Dilute each culture to OD600 = 0.05 in fresh media.
3. Dispense 200 uL per well according to `data/raw/metadata-sample-map.csv`.
4. Run plate reader every 30 minutes for 4 hours with orbital shaking between reads.
5. Export raw table with columns:
   - time_min
   - condition
   - replicate
   - od600
   - fluorescence_au

## Controls and Acceptance

- Media blank fluorescence must remain low and stable.
- Host control should show minimal fluorescence compared with the induced pGLO clone.
- Replicate coefficient of variation target: <= 20 percent.

## Troubleshooting

> Warning: High blank fluorescence suggests plate contamination or optical bleed.
> Tip: Normalize fluorescence by OD600 to compare growth-adjusted expression.
