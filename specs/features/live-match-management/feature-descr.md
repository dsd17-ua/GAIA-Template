## 0) Feature Name & Summary
**Feature Name:** Live Match Management

**Executive Summary (3–5 lines):**
- **Problem:** Current methods for tracking handball matches (paper/manual) are prone to errors and lack real-time visibility.
- **Opportunity:** Digitalizing the control table allows for real-time accurate scoring, timekeeping, and event logging.
- **Expected Outcome:** A reliable, easy-to-use interface for table officials that ensures accurate match data and reduces operational stress.

**Fit with Vision / Product Goal:**
This is the core value proposition of the Handball Scoreboard App: providing the essential tool for managing the game itself, which is the foundation for any future expansion (stats, streaming, etc.).

---
## 1) Description of the feature
This feature encompasses the end-to-end management of a live handball match. It allows users (table officials) to set up a match, control the game clock (start/stop), update scores for both teams, and log critical game events such as timeouts, 2-minute exclusions, and cards (yellow/red). It provides a high-contrast, optimized interface for real-time usage on tablets and desktops.

---
## 2) Users/Roles & Impacted Personas
`[List who uses or is affected by the feature and what they aim to accomplish]`

| Role/Persona | Key Objectives | Tasks / Jobs-to-be-done | Current Pain | Stakeholders (gov/compliance/others) |
|---|---|---|---|---|
| `Table Official` | `Accurate match tracking` | `Start/stop clock, Log goals/fouls` | `Paper sheets are slow/error-prone` | `Referees, Competition Organizers` |
| `Referee` | `Game control` | `Verify score/time, check exclusions` | `Asking table for time/score updates` | `Table Official` |
| `Team Staff` | `Tactical awareness` | `Check time, score, and exclusion times` | `Poor visibility of table score` | `Table Official` |

---

## 3) Problem / Opportunity Statement
**Context:** Local and amateur handball matches often rely on physical scoreboards or manual paper tracking.
**Problem Statement:** Our **Table Officials** experience **stress and errors** when **managing fast-paced games**, which causes **disputes over scores/time and game delays**.
**Why Now:** Critical need to modernize the match day experience and provide a foundation for reliable data.

---

## 4) Objectives & Business Outcomes

| Objective / Outcome | KPI / Metric | Baseline | Target | Time Horizon | Measurement Method |
|---|---|---|---|---|---|
| `Reliable Score Tracking` | `Error Correction Rate` | `N/A (New)` | `< 1 correction / match` | `MVP Launch` | `Event log analysis (undo actions)` |
| `Speed of Operation` | `Time to log goal` | `N/A` | `< 2 seconds` | `MVP Launch` | `User observation / timestamps` |
| `User Satisfaction` | `Official Feedback` | `N/A` | `4.5/5 stars` | `Post-Match` | `Qualitative Survey` |

---

## 5) Scope (In/Out)
**In scope:**
- **Match Setup:** Define teams and duration.
- **Timekeeping:** Start, stop, pause, reset game clock.
- **Scoring:** Increment/decrement goals for Local/Visitor.
- **Disciplinary:** 2-min exclusions (timer), Cards (Yellow/Red).
- **Timeouts:** Track and limit team timeouts (3 per team).
- **Match State:** First half, Second half, Finished.

**Out of scope (to prevent scope creep):**
- **Player Rosters:** Assigning goals/events to specific player names (MVP uses numbers or generic team events).
- **Public Streaming Overlay:** Sending graphics to OBS/YouTube.
- **League Management:** No standings or season scheduling.
- **User Accounts:** No login required for local MVP usage.

**Key Assumptions:**
- App runs locally or on a stable web connection.
- Device has sufficient screen size (Tablet/Laptop) -> Mobile is secondary.

**Dependencies / Blockers:**
- None.

---

## 6) Non-Functional Requirements (NFRs)

### 6.1 Security & Privacy
- **Personal Data (PII):** Minimal. Only player numbers are processed. No stored profiles in MVP.
- **Encryption/Hashing:** HTTPS for web delivery.
- **Access Control:** Public access for MVP (local tool).
- **Compliance:** GDPR compliant (no personal data stored).

### 6.2 Performance
- **Performance Budgets:** Input response latency < 50ms for clock buttons.
- **Load/Throughput Limits:** Single active match per client. Low concurrency.
- **Query/Index Efficiency:** Local state management is primary; persistence is secondary.

### 6.3 Availability & Reliability
- **SLO/SLA/SLI:** Local-first capability recommended (PWA).
- **Graceful Degradation:** Warning on page close/reload to prevent data loss.

### 6.4 Accessibility (a11y) & Internationalization (i18n)
- **Accessibility:** High contrast for readability in bright gyms (WCAG AA). Large touch targets (48px+).
- **Languages/Locales:** **Spanish** (User Facing) and English (Code).

### 6.5 Observability
- **Logs:** Console logging for state transitions (Debug mode).

---

### Annexes (optional)
- **Risks:** Browser crash loosing match state -> Mitigation: Persist state to `localStorage`.
