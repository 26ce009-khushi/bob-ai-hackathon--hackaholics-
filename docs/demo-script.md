# 3-Minute Demo Presentation Script
## IBM BoB AI Innovation Hackathon 2026 | ClinicalAI Monitor | Problem P1

**Total Time: ~3 minutes**
---

### [0:00 – 0:20] Opening — Home Page

*[Open index.html in browser — full screen]*

"Welcome! This is the **ClinicalAI Monitor** — our AI-powered solution for Problem P1 of the IBM BoB AI Innovation Hackathon 2026.

The home page immediately tells you what this system does: it monitors clinical trial patients in real time, detects protocol deviations, and generates CAPA reports for FDA compliance.

Notice the live data here — you can already see the number of active patients and total deviations detected from our dataset of 200 patients across 10 global research sites."

---

### [0:20 – 0:45] About Page — Why This Matters

*[Click on About in the navigation]*

"Before the demo, let's quickly understand why this matters.

Clinical trials are governed by ICH E6 Good Clinical Practice guidelines. Any patient who misses a visit, receives the wrong dose, or takes a banned co-medication has a **protocol deviation**. 

This page shows that 42% of clinical trial sites currently have unreported deviations — and the consequences range from $250,000 fines to complete clinical holds. Our AI automates the detection and reporting that manually takes days."

---

### [0:45 – 1:30] Main Dashboard — Overview

*[Click on Dashboard in the navigation]*

"Here's the main monitoring dashboard. You can immediately see our seven KPI cards:
- **200 total patients** across 10 hospitals
- The number of **major, minor, and administrative deviations** detected
- The count of **high-risk sites** needing urgent attention

Below the KPIs we have three charts:
1. A **pie chart** showing severity distribution across all patients
2. A **bar chart** ranking all 10 sites by average risk score
3. A **line trend chart** showing deviation patterns over the last 8 weeks

And finally, the patient table below shows all 200 patients. I can search, filter by severity, and click any row to see details. Let me click 'View' on a high-risk patient..."

*[Click a patient with major deviations in the table]*

"The modal shows exactly what's wrong — this patient is on Warfarin, which is a banned co-medication, and their visit was 18 days late. Both major deviations."

---

### [1:30 – 2:10] Patient Checker — AI Analysis

*[Click Patient Checker in the navigation]*

"Now let me show the heart of the system — the AI Patient Record Checker.

I'll click **Load Sample** to populate a demo patient..."

*[Click Load Sample button]*

"This loads a patient at Apollo Research Center. They received 100mg when the protocol specifies 50mg — that's a 2x dose error — and they're taking Warfarin, which is banned.

I click **Analyze Patient**..."

*[Click Analyze Patient button — wait for animation]*

"The AI processes in under a second. The result: a **Critical risk score of 95/100**. Two major deviations detected. The AI recommends immediate physician review for the dose error and immediate discontinuation of the banned medication.

Every recommendation includes the responsible team and a follow-up date. One click to generate the CAPA report."

---

### [2:10 – 2:40] CAPA Report & Site Dashboard

*[Click CAPA Report in navigation]*

"In the CAPA Report Generator, I click **Load High-Risk Patient** and then **Generate Report**..."

*[Click Generate Report]*

"Instantly, we have a complete, print-ready CAPA report. It includes:
- Patient information
- All detected deviations with severity badges
- A full CAPA table with root cause, corrective actions, preventive actions, responsible teams, and follow-up dates
- The risk assessment summary
- And a signature section for the Principal Investigator

I can click **Print / Download PDF** to produce the document for regulatory submission."

*[Click Site Risk Dashboard]*

"Finally, the Site Risk Dashboard shows all 10 hospitals ranked from highest to lowest risk. Sites in red and orange need urgent CRA attention. I can click any site card to drill into the details and see exactly how many major, minor, and administrative deviations each site has."

---

### [2:40 – 3:00] Closing

"In summary, the ClinicalAI Monitor automates the entire clinical trial compliance pipeline:

✅ **Detects** protocol deviations in real time  
✅ **Classifies** severity per ICH E6 GCP guidelines  
✅ **Calculates** 0–100 risk scores  
✅ **Generates** CAPA reports in one click  
✅ Built with **IBM BoB AI** — pure HTML, CSS, and JavaScript

This solution could save pharmaceutical companies millions in audit failures and, more importantly, **protect patients** in clinical trials from compliance failures.

Thank you!"

---

## Technical Notes for Demo

- Open `index.html` directly in Chrome or Firefox
- Keep browser at 100% zoom for best appearance
- Use full-screen mode (F11) during presentation
- Load sample data on Patient Checker before presenting
- Have dashboard pre-loaded so charts are already rendered
- Tested on Chrome 120+, Firefox 120+, Edge 120+

---

*IBM BoB AI Innovation Hackathon 2026 | Problem P1 | ClinicalAI Monitor*
