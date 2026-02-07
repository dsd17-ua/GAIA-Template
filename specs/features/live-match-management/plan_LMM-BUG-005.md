# Plan: LMM-BUG-005 — Improve Team Selection Visibility

## Goal
The user reported that selecting the team for an exclusion is not clear.
We will enhance the existing button selection with stronger visual cues (ring/border, checkmark icon).

## User Review Required
> [!NOTE]
> This is a UX improvement. We will add a "ring" and checkmark to the selected team button.

## Proposed Changes

### Frontend (`frontend`)

#### [MODIFY] [AddExclusionDialog.tsx](file:///Users/dario/Documents/INFORMATICA/4/CUATRI2/GCS/GAIA/PRACT/GAIA-Template/frontend/src/features/live-match/components/AddExclusionDialog.tsx)
- Add `ring-2 ring-offset-2` to the selected button.
- Add a checkmark icon (from `lucide-react`) inside the selected button.
- Ensure the unselected button is `ghost` or `outline` with low opacity to emphasize contrast.

## Verification Plan

### Manual Verification
- Open Dashboard.
- Click "Add Exclusion".
- Toggle between teams.
- Verify clear visual distinction (ring + icon).
