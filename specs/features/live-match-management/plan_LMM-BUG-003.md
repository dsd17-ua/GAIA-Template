# Plan: LMM-BUG-003 — Fix useMatchEvents Import Error

## Goal
Fix the `SyntaxError: The requested module ... does not provide an export named 'CreateMatchEvent'` error.
This is caused by `verbatimModuleSyntax: true` in `tsconfig.json`, which requires type-only imports to be explicitly marked with `type` or `import type`.

## User Review Required
> [!NOTE]
> This is a hotfix for a build error found during verification of LMM-TO-004-FE-T03. No functional changes, only syntax/imports.

## Proposed Changes

### Frontend (`frontend`)

#### [MODIFY] [useMatchEvents.ts](file:///Users/dario/Documents/INFORMATICA/4/CUATRI2/GCS/GAIA/PRACT/GAIA-Template/frontend/src/features/live-match/hooks/useMatchEvents.ts)
- Change `import { matchEventService, MatchEvent, CreateMatchEvent }`
- To `import { matchEventService } from ...` and `import type { MatchEvent, CreateMatchEvent } from ...`

#### [MODIFY] [ExclusionList.tsx](file:///Users/dario/Documents/INFORMATICA/4/CUATRI2/GCS/GAIA/PRACT/GAIA-Template/frontend/src/features/live-match/components/ExclusionList.tsx)
- Ensure `MatchEvent` is imported as type.

#### [MODIFY] [matchEventService.ts](file:///Users/dario/Documents/INFORMATICA/4/CUATRI2/GCS/GAIA/PRACT/GAIA-Template/frontend/src/features/live-match/services/matchEventService.ts)
- Verify exports are correct (they seem to be).

## Verification Plan

### Automated Tests
- Run `npm run lint` to verify no more import errors.
- Run `npm run build` (or `tsc --noEmit`) to verify compilation.
- Run `npm run test src/features/live-match/components/ExclusionList.test.tsx` to ensure no regression.
