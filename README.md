# ClinicalAI Monitor — Clinical Trial Risk Monitor & Protocol Deviation Detector

> **IBM BoB AI Innovation Hackathon 2026 | Problem P1 | Track: AI**
> Team: **Hackaholics**

---

## 👥 Team

| Field | Value |
|---|---|
| **Team Name** | Hackaholics |
| **Track** | AI |
| **Team Lead** | Hackaholics Team Lead — hackaholics@charusat.ac.in |
| **Members** | Hackaholics Member 1, Hackaholics Member 2, Hackaholics Member 3 |

---

## 🎯 Problem Statement

A major clinical trial has 5,000+ patient visits across 200+ sites. Protocol deviations — missed visits, wrong dosing, banned co-medications — go undetected until the FDA audit. A single rejected submission delays drug approval by **6–12 months** and costs **$50–100M**. Risk managers need real-time visibility into which sites are highest risk before problems escalate.

---

## 💡 Solution

**ClinicalAI Monitor** is an AI-powered web application that compares patient visit records against the ICH E6 GCP protocol specification in real time. It classifies each deviation by severity (Major / Minor / Administrative), calculates a 0–100 weighted risk score per patient and per research site, and generates print-ready CAPA reports with AI-recommended corrective and preventive actions — reducing CAPA preparation from days to seconds.

---

## ✨ Key Features

- **AI Protocol Deviation Detection:** Real-time checking of 200 patients across 10 research sites against ICH E6 GCP rules
- **ICH E6 GCP Severity Classification:** Consistent Major / Minor / Administrative classification with weighted 0–100 risk scoring
- **Site Risk Dashboard:** All 10 hospitals ranked by aggregate risk score for proactive CRA targeting
- **One-Click CAPA Generator:** Print-ready regulatory reports with root cause, corrective actions, responsible teams, and follow-up dates
- **Interactive Patient Checker:** Analyze any patient record instantly with full AI deviation explanation and risk score

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Languages** | HTML5, CSS3, JavaScript (ES6+) |
| **Frameworks** | None — pure vanilla JS |
| **IBM Technologies** | IBM Bob AI, IBM Plex Sans, IBM Design System |
| **Databases** | None — client-side JSON dataset |
| **Other** | Canvas API, ICH E6 GCP Rules Engine, GitHub Actions CI/CD |

---

## 📁 Repository Structure

```
├── index.html              # Home page
├── about.html              # Problem statement page
├── dashboard.html          # Main monitoring dashboard (KPIs, charts, patient table)
├── patient-checker.html    # AI patient record analyzer
├── site-dashboard.html     # Site risk ranking dashboard
├── risk-analysis.html      # Full 200-patient risk table
├── capa-report.html        # CAPA report generator
├── documentation.html      # In-app documentation
├── assets/
│   ├── css/                # Stylesheets (IBM Design System)
│   ├── js/                 # AI engine, charts, data, utilities
│   └── screenshots/        # App screenshots
├── src/                    # Source code (mirrors assets/js)
├── docs/                   # Written documentation
│   ├── problem-statement.md
│   ├── solution-overview.md
│   ├── architecture.md
│   └── setup-guide.md
├── demo/                   # Demo artifacts
│   └── demo-video-link.txt
├── presentation/           # Slide deck
└── submission.yaml         # Structured submission metadata
```

---

## ⚡ How to Run

This is a **pure HTML/CSS/JavaScript application** — no server, no install, no build step required.

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/bob-ai-hackathone-hackaholics.git
cd bob-ai-hackathone-hackaholics

# 2. Open in browser
# Simply open index.html in Chrome, Firefox, or Edge
```

Or serve locally for best experience:
```bash
# Using Python
python -m http.server 8080
# Then open http://localhost:8080

# Using Node.js
npx serve .
# Then open http://localhost:3000
```

---

## 🖥️ Demo

| Artifact | Link |
|---|---|
| 📹 Demo Video | [See demo/demo-video-link.txt](demo/demo-video-link.txt) |
| 🌐 Live Demo | [See demo/live-demo-url.txt](demo/live-demo-url.txt) |
| 🖼️ Screenshots | [See assets/screenshots/](assets/screenshots/) |
| 📊 Presentation | [See presentation/](presentation/) |

---

## ⚠️ Known Limitations

- Patient data is simulated (200 synthetic records) — not connected to a live EDC system
- No IBM watsonx.ai API integration in this prototype (AI engine is rule-based JavaScript)
- No authentication or role-based access control (hackathon scope)
- Free-text clinical note NLP is listed as future scope

---

## 🏅 What We're Most Proud Of

The [`assets/js/ai-engine.js`](assets/js/ai-engine.js) implements a complete ICH E6 GCP-compliant deviation detection engine in pure vanilla JavaScript — zero external dependencies. It processes 200 patient records sub-second, classifies 5 deviation types, calculates weighted risk scores (0–100), and generates full CAPA recommendations with responsible teams and follow-up dates. The output is print-ready for real FDA regulatory submission.

---

*IBM BoB AI Innovation Hackathon 2026 | Problem P1 | Team Hackaholics*
