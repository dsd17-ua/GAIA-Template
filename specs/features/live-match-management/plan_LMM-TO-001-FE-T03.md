# LMM-TO-001-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-001-FE-T03**  
**Related user story**: **LMM-TO-001** (from `specs/features/live-match-management/user-stories.md`)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: All tasks must include inline references to `LMM-TO-001-FE-T03` and scenarios `New Match Setup`.

---

## 1) Context & Objective
- **Ticket summary**: Build the Frontend Form to create a new match.
- **Impacted entities/tables**: N/A (UI only, consumes BE endpoint).
- **Impacted services/modules**: `src/features/live-match/`, `src/app/router/`.
- **Impacted tests**: Component testing for Form + E2E test for the flow.

## 2) Scope
- **In scope**: 
  - New Route `/matches/new`.
  - Form UI: Inputs for Local, Visitor names. "Start Match" button.
  - Integration with React Query mutation (using Axios POST /matches).
  - Validation: Names required.
  - Redirect to `/matches/{id}/dashboard` on success.
- **Out of scope**: 
  - Authentication.
  - Complex Configuration (Period length selector is optional/default hidden for MVP T03, focus on names).
- **Assumptions**: 
  - `src/features` folder structure follows `techstack-frontend.md`.
  - Tailwind/shadcn components (`Input`, `Button`, `Form`) available.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Route/Structure**: Create feature folder `src/features/live-match`.
2.  **Define Component Test**: `src/features/live-match/components/MatchSetupForm.test.tsx` (using RTL).
3.  **Implementation**:
    - Build Form component using `react-hook-form` + `zod`.
    - Create Mutation hook `useCreateMatch`.
    - Create Page wrapper `NewMatchPage.tsx`.
    - Add Route.
4.  **Verification**: Manual run + local e2e.

### 3.2 NFR hooks
- **Accessibility**: Semantic HTML `<form>`, labels linked to inputs, focus management on error.
- **Brand**: Use primary buttons, standard input spacing (`gap-4`). Use `layout/AppLayout`.
- **Validation**: Client-side Zod validation before API call.

## 4) Atomic Task Breakdown

### Task 1: Scaffolding Feature Directory
- **Purpose**: Structure compliance.
- **Prerequisites**: None.
- **Artifacts impacted**: `src/features/live-match/{api,components,hooks,pages,types.ts}`.
- **Test types**: Manual check.
- **BDD Acceptance**: Directory structure matches rules.

### Task 2: API Hook (React Query)
- **Purpose**: Data mutation.
- **Prerequisites**: Backend endpoint T02 (or mock).
- **Artifacts impacted**: `src/features/live-match/api/createMatch.ts`.
- **Test types**: Unit (MSW optional or mock).
- **BDD Acceptance**: Hook exposes `mutate` function.

### Task 3: Match Setup Form Component
- **Purpose**: UI implementation.
- **Prerequisites**: Task 2.
- **Artifacts impacted**: `src/features/live-match/components/MatchSetupForm.tsx`.
- **Test types**: Component (RTL).
- **BDD Acceptance**: Given I enter names, When I submit, Then mutate is called.

### Task 4: Page & Routing
- **Purpose**: Navigation.
- **Prerequisites**: Task 3.
- **Artifacts impacted**: `src/features/live-match/pages/NewMatchPage.tsx`, `src/app/router/routes.tsx`.
- **Test types**: Manual/E2E.
- **BDD Acceptance**: Navigating to `/` (or `/matches/new`) shows the form.
