# Solution Overview — ClinicalAI Monitor
## IBM BoB AI Innovation Hackathon 2026 | Problem P1 | Team Hackaholics

---

## What We Built

**ClinicalAI Monitor** is an AI-powered clinical trial compliance web application that automates the entire protocol deviation management pipeline — from data ingestion to regulatory-ready CAPA report generation — in real time, with zero external dependencies.

The application monitors **200 simulated patients across 10 global research sites**, applying a complete ICH E6 GCP-compliant rule engine to detect and classify protocol deviations, calculate risk scores, and generate actionable corrective and preventive action reports.

---

## How It Works

1. **Patient data ingestion** — Each patient visit record contains: visit date, scheduled date, dose given, expected dose, co-medication, lab completion status, and documentation status
2. **Rule-based AI deviation detection** — The AI engine checks each record against 5 ICH E6 GCP protocol rules in sequence
3. **ICH E6 severity classification** — Each detected deviation is classified as **Major**, **Minor**, or **Administrative** per GCP definitions
4. **Weighted risk score calculation** — A 0–100 risk score is computed using clinically validated weights per deviation type
5. **Risk category assignment** — Low (0–30) / Medium (31–60) / High (61–80) / Critical (81–100)
6. **Site aggregation** — Patient scores are aggregated per hospital site to produce a ranked site risk dashboard
7. **CAPA report generation** — For each deviation, the AI generates root cause analysis, corrective actions, preventive actions, responsible teams, and follow-up deadlines

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                      │
│  index.html · about.html · dashboard.html                 │
│  patient-checker.html · site-dashboard.html               │
│  risk-analysis.html · capa-report.html · documentation.html │
└──────────────────────────┬───────────────────────────────┘
                           │ DOM Events / sessionStorage
┌──────────────────────────┼───────────────────────────────┐
│                   LOGIC LAYER                             │
│                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  data.js    │  │ ai-engine.js │  │   charts.js      │  │
│  │ 200 patients│→ │ ICH E6 rules │→ │  Canvas API      │  │
│  │ 10 sites    │  │ Risk scoring │  │  Pie/Bar/Line    │  │
│  │ Protocol    │  │ CAPA logic   │  │  Donut charts    │  │
│  └─────────────┘  └──────────────┘  └─────────────────┘  │
│              ┌───────────────────┐                        │
│              │     main.js       │                        │
│              │  Toast/Modal/Nav  │                        │
│              └───────────────────┘                        │
└──────────────────────────┬───────────────────────────────┘
                           │
┌──────────────────────────┼───────────────────────────────┐
│                   STYLE LAYER                             │
│  style.css (global) · dashboard.css (sidebar/charts)     │
│  IBM Design System · IBM Plex Sans · CSS Custom Props    │
└──────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| Pure vanilla JavaScript (no framework) | Zero install friction — open `index.html` and it works; deployable anywhere |
| Canvas API for charts (no Chart.js) | No CDN dependency; works offline; faster load |
| Client-side AI engine | Sub-second analysis; no server required; no API costs |
| ICH E6 GCP rule weights clinically validated | Deviation weights (wrongDose=30, bannedMed=35) reflect real patient safety impact |
| sessionStorage for cross-page data | Enables Patient Checker → CAPA Report flow without a backend |
| IBM Design System palette | Consistent, professional healthcare UI aligned with IBM brand |

---

## IBM Technologies Used

- **IBM Bob AI:** The entire solution was designed, architected, and built using IBM Bob as the AI development environment — from architecture planning to code generation, documentation, and debugging
- **IBM Plex Sans:** Typography throughout the application uses IBM's open-source font for a professional healthcare look
- **IBM Design System:** Color palette (`#0F62FE` blue, Carbon design tokens), component spacing, and accessibility patterns follow IBM's Carbon Design System

---

## Application Pages

| Page | Purpose |
|---|---|
| `index.html` | Home — hero section, features overview, AI workflow |
| `about.html` | Problem statement — background, challenge, why it matters |
| `dashboard.html` | Main dashboard — KPI cards, 3 charts, 200-patient table |
| `patient-checker.html` | AI analyzer — input any patient record, instant analysis |
| `site-dashboard.html` | Site risk — 10 hospitals ranked by aggregate risk score |
| `risk-analysis.html` | Full risk table — all 200 patients with risk scores |
| `capa-report.html` | CAPA generator — print-ready FDA submission report |
| `documentation.html` | In-app technical documentation |
