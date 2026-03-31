# Quality Control and Verification Protocol

## Objective

Confirm that measured fluorescence is linked to the intended GFP construct.

## QC Layers

1. Plate-level QC
- Check blank wells and no-plasmid controls.
- Flag runs where blank fluorescence drifts > 15 percent.

2. Clone identity QC
- Colony PCR across promoter-GFP segment.
- Expected amplicon size documented in primer sheet.

3. Sequence QC
- Sanger sequencing at promoter-RBS junction and GFP coding region.
- Validate no frame-shift and no stop codon insertion.

## Acceptance Criteria

- No-DNA control has no growth on antibiotic plate.
- GFP clone fluorescence/OD at final timepoint >= 3x host control.
- PCR amplicon size matches expected within +/- 20 bp.
- Sanger confirms intended design in key regions.

## Data Recording

- Record QC status in `data/processed/qc-report.json`.
- Record excluded wells and rationale in run notes.

## Troubleshooting

> Warning: If transformants grow but no fluorescence increase is observed, check promoter orientation and GFP coding frame.
> Tip: Sequence at least two independent transformant colonies.
