# Clinical Trial Risk Monitor — Project Documentation
**IBM BoB AI Innovation Hackathon 2026 | Problem Statement P1**

---

## Table of Contents
1. Introduction
2. Problem Statement
3. Existing System & Limitations
4. Proposed AI Solution
5. AI Workflow
6. Architecture Diagram
7. Technologies Used
8. AI Logic & Scoring
9. Testing
10. Future Scope
11. Conclusion

---

## 1. Introduction

The Clinical Trial Risk Monitor & Protocol Deviation Detector is an AI-powered healthcare web application built for the IBM BoB AI Innovation Hackathon 2026, addressing Problem Statement P1.

Clinical trials are governed by strict regulatory frameworks — primarily ICH E6 Good Clinical Practice (GCP) guidelines and FDA 21 CFR Part 312 — that require every departure from the approved trial protocol to be identified, documented, classified, and reported. Managing this compliance process across hundreds of patients at dozens of research sites is a significant operational challenge.

Our solution automates this entire pipeline: from data ingestion, through AI-driven deviation detection and ICH E6 classification, to risk scoring and CAPA report generation — all in real time, through a beautiful, responsive web application.

---

## 2. Problem Statement

### Background
A clinical trial protocol defines the exact conditions under which a drug or device is tested:
- **Visit schedule:** Patients must attend visits within defined windows (typically ±7 days)
- **Dosing:** Specific doses must be administered at specific times
- **Exclusions:** Certain co-medications are banned due to drug interactions
- **Lab requirements:** Specific tests must be completed at each visit
- **Documentation:** All observations must be recorded and signed

### The Challenge
**42%** of clinical trial sites have unreported protocol deviations (industry data). Manual monitoring by Clinical Research Associates (CRAs) fails because:
- Reviews happen periodically — deviations discovered weeks after occurrence
- Classification inconsistency across sites and monitors
- CAPA reports take days to prepare
- No site-level risk aggregation until FDA audit
- $250K+ penalties and clinical holds for systematic deviations

---

## 3. Existing System & Limitations

| Issue | Impact |
|-------|--------|
| Manual record review | Error-prone, slow, expensive |
| Reactive detection | Too late for patient safety intervention |
| Inconsistent classification | Reporting inconsistencies |
| No site-level dashboard | Audit surprises |
| Slow CAPA generation | Regulatory delays |

---

## 4. Proposed AI Solution

### Core Capabilities
1. **Protocol Deviation Detection** — Automated checking of all patient records against ICH E6 protocol rules
2. **ICH E6 Severity Classification** — Consistent Major/Minor/Administrative classification
3. **Weighted Risk Scoring** — 0–100 patient and site risk scores
4. **Site Risk Dashboard** — Hospital rankings by aggregate risk
5. **CAPA Report Generation** — One-click printable reports with AI recommendations
6. **Data Visualizations** — Pie, Bar, Line, Donut charts

---

## 5. AI Workflow

```
INPUT: Patient Visit Record
         ↓
STEP 1: Visit Timing Analysis
  → |actualVisit – scheduledVisit| > 7 days  → Minor Deviation
  → |actualVisit – scheduledVisit| > 14 days → Major Deviation
         ↓
STEP 2: Dose Deviation Check
  → doseRatio = doseGiven / expectedDose
  → ratio ≥ 2.0 or ≤ 0.5 → Major Deviation (+30 pts)
  → other variance      → Minor Deviation (+10 pts)
         ↓
STEP 3: Co-medication Screen
  → medication in BANNED_MEDS list → Major Deviation (+35 pts)
         ↓
STEP 4: Lab Test Audit
  → labCompleted = "No" → Major Deviation (+20 pts)
         ↓
STEP 5: Documentation Check
  → docComplete = "No" → Administrative Deviation (+5 pts)
         ↓
RISK SCORE = Σ(applicable weights), capped at 100
CATEGORY:
  Low      (0–30)   — No immediate action required
  Medium   (31–60)  — Review within 5 business days
  High     (61–80)  — Site visit recommended within 2 weeks
  Critical (81–100) — Immediate escalation to Medical Monitor

OUTPUT: Deviations list, Risk Score, Risk Category, CAPA Recommendations
```

---

## 6. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  index.html │ about.html │ dashboard.html │ patient-checker  │
│  risk-analysis.html │ capa-report.html │ site-dashboard.html │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────────┐
│                    LOGIC LAYER                               │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  data.js    │  │ ai-engine.js │  │    charts.js      │   │
│  │ 200 patients│  │ ICH E6 rules │  │ Canvas rendering  │   │
│  │ 10 sites    │  │ Risk scoring │  │ Pie/Bar/Line/Donut│   │
│  │ JSON        │  │ CAPA logic   │  │                   │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
│              ┌──────────────────┐                           │
│              │    main.js       │                           │
│              │ Toast/Modal/Nav  │                           │
│              └──────────────────┘                           │
└─────────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────────┐
│                    STYLE LAYER                               │
│  style.css (global) │ dashboard.css (sidebar/charts)        │
│  IBM Design System │ IBM Plex Sans │ CSS Custom Properties  │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Technologies Used

| Technology | Purpose |
|-----------|---------|
| HTML5 | Semantic markup, forms, structure |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| Vanilla JavaScript | AI logic, DOM manipulation, data rendering |
| Canvas API | Chart rendering (no external library) |
| IBM Plex Sans | Typography |
| IBM Design System | Color palette, components |
| ICH E6 GCP Rules | Clinical compliance framework |
| sessionStorage | Cross-page data passing |

---

## 8. AI Logic & Scoring

### Risk Scoring Weights
```javascript
const WEIGHTS = {
  majorDeviation:     25,  // Base major weight
  minorDeviation:     10,  // Base minor weight
  adminDeviation:      5,  // Admin documentation
  missedVisit:        15,  // Visit timing breach
  wrongDose:          30,  // Dose error — patient safety
  bannedMed:          35,  // Highest — drug interaction risk
  missingCriticalLab: 20,  // Protocol lab not done
  missingDoc:          5   // Documentation gap
};
```

### CAPA Recommendations by Deviation Type

| Deviation | Corrective Action | Preventive Action |
|-----------|------------------|-------------------|
| Wrong Dose | Immediate physician review; report SAE if symptoms | Barcode dispensing verification |
| Banned Medication | Discontinue immediately; assess interactions | EHR alerts at prescription time |
| Missing Lab | Collect sample immediately; assess data impact | Lab checklist before visit sign-off |
| Late Visit | Schedule makeup visit; assess safety | Automated patient reminders |
| Missing Doc | Complete within 48 hours | Mandatory eCRF completion workflow |

---

## 9. Testing

### Test Scenarios
| # | Input | Expected | Result |
|---|-------|----------|--------|
| 1 | comed=Warfarin | Major deviation, +35 score | ✅ Pass |
| 2 | dose=100, expected=50 | Major deviation, +30 score | ✅ Pass |
| 3 | Visit 20 days late | Major deviation, +25 score | ✅ Pass |
| 4 | labCompleted=No | Major deviation, +20 score | ✅ Pass |
| 5 | docComplete=No | Admin deviation, +5 score | ✅ Pass |
| 6 | All fields correct | Score=0, No deviations | ✅ Pass |
| 7 | Multiple major issues | Score ≥81, Critical | ✅ Pass |
| 8 | 200 patients processed | All KPIs calculated | ✅ Pass |
| 9 | Site aggregation | 10 sites ranked | ✅ Pass |

---

## 10. Future Scope

1. **IBM Watson NLP Integration** — Free-text clinical note analysis
2. **Predictive Risk ML Model** — Predict deviations before they occur
3. **EDC System Integration** — Connect to Medidata Rave, Oracle Clinical One
4. **Mobile Application** — React Native app for site coordinators
5. **Regulatory Export** — FDA 21 CFR Part 312 eCTD format reports
6. **Multi-protocol Support** — Support oncology, cardiology, CNS protocols
7. **Audit Trail** — Immutable blockchain-based deviation log
8. **Role-based Access** — CRA / PI / Sponsor / Regulator dashboards

---

## 11. Conclusion

The ClinicalAI Monitor demonstrates that AI can transform clinical trial compliance from a reactive, expensive manual process into a proactive, real-time automated system accessible to any research site.

Key achievements:
- **100% consistent** ICH E6 GCP deviation classification
- **Sub-second** analysis vs. days for manual review
- **One-click** CAPA generation ready for regulatory submission
- **No external dependencies** — pure HTML/CSS/JS, deployable anywhere
- **200 patient records** with realistic data diversity

Built for the IBM BoB AI Innovation Hackathon 2026.

---

*Document prepared by the ClinicalAI Monitor team | IBM BoB Hackathon 2026 | Problem P1*
