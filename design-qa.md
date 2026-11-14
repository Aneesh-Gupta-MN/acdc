# Opening background fidelity QA

- Source visual truth: `/home/ag/Projects/ACDC_2.0/all-care-dental-storyboard-01-03-final.png`
- Implementation: `http://127.0.0.1:3001/?openingDebug=1`
- Implementation screenshots: inline Codex Browser captures from tab 6 (the browser API did not expose filesystem paths)
- Requested viewport: 390 × 844 mobile; the in-app browser reported and captured 582 × 1260 pixels at its 1.5 display scale
- Source pixels: 1448 × 1086 composite storyboard; the three phone panels were compared individually to matching opening states
- States: opening `p=0.00`, completed message `p=0.97`, halfway doctor cover `q=0.49`

## Full-view comparison evidence

The source storyboard and all three rendered mobile states were emitted together in one browser comparison. Section 1 now has a warm ivory field, cream illumination around the model, a curved lower ground surface, and a soft grounding shadow. Section 2 has a deep burgundy field with soft tonal variation and a full-width diagonal foreground fold. At `q=0.49`, the opaque warm-ivory doctor page physically covers the tooth and all lower scene layers while the shared header stays above it.

## Focused-region comparison evidence

The lower third of the opening and message states was inspected separately because the surface, model shadow, fold edge, and canvas transparency are the fidelity-critical regions. No rectangular canvas clear colour or clipping edge was visible. The fold is one continuous surface across the viewport rather than a detached triangle.

## Required fidelity surfaces

- Fonts and typography: unchanged from the approved existing composition; contrast remains sufficient in both background states.
- Spacing and layout rhythm: existing headline, model, action, and doctor composition was preserved. Only background-depth layers changed.
- Colors and visual tokens: local warm-ivory, cream, burgundy, and deep-burgundy opening tokens now reproduce the reference depth without changing global brand tokens.
- Image quality and asset fidelity: the verified `third_molar.glb` remains the live transparent-canvas subject. Its real embedded material maps intentionally differ from the storyboard's illustrative tooth, because the storyboard is composition guidance rather than anatomy.
- Copy and content: unchanged.

## Comparison history

### Initial findings

- P1: Section 1 read as nearly plain white and lacked the curved surface and grounding shadow.
- P1: Section 2's fold was a narrow triangular gradient and did not read as a continuous foreground surface.
- P2: Burgundy tonal variation was too weak to reproduce the storyboard's depth.

### Fixes and post-fix evidence

- Added a warm layered ivory field, separate curved cream ground plane, and model-aligned soft shadow.
- Replaced the triangular threshold with a full-width clipped fold using continuous burgundy shading.
- Strengthened soft burgundy radial light and shadow while preserving ivory headline contrast.
- Explicitly set the WebGL clear colour alpha to zero.
- Browser captures at `p=0.00`, `p=0.97`, and `q=0.49` show the corrected layers and opaque doctor cover.

## Findings

No actionable P0, P1, or P2 differences remain within the requested background-fidelity scope. The live model's texture is an intentional verified-source difference from the illustrative storyboard.

## Follow-up polish

- P3: A dedicated fine fabric/noise asset could reproduce the storyboard's satin grain more literally, but it is not required for the requested softly varying light and shadow and was deliberately not invented.

final result: passed
