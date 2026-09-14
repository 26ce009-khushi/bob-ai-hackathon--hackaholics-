# ⚕ ClinicalAI Monitor — Clinical Trial Risk Monitor & Protocol Deviation Detector

> **IBM BoB AI Innovation Hackathon 2026 — Problem Statement P1**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Hackathon](https://img.shields.io/badge/IBM%20BoB%20Hackathon-2026-0F62FE)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📋 Project Overview

The **Clinical Trial Risk Monitor & Protocol Deviation Detector** is a fully functional AI-powered healthcare web application that:

- **Monitors** 200 clinical trial patient records across 10 research sites
- **Detects** protocol deviations in real time (missed visits, wrong doses, banned co-medications, missing labs)
- **Classifies** deviation severity per **ICH E6 GCP guidelines** (Major / Minor / Administrative)
- **Calculates** site-level and patient-level **risk scores (0–100)** using a weighted AI algorithm
- **Generates** CAPA-ready reports with root cause analysis, corrective actions, and follow-up dates
- **Visualizes** data through interactive charts (Pie, Bar, Line, Donut)

---

## 🚀 Features

| Feature | Description |
|--------|-------------|
| 🔍 Protocol Deviation Detection | Missed visits, wrong dose, banned meds, missing lab, documentation gaps |
| 🏷️ ICH E6 GCP Classification | Major, Minor, Administrative severity badges |
| 📊 Risk Score Engine | Weighted 0–100 score per patient and site |
| 🏥 Site Risk Dashboard | 10 hospitals ranked by average risk score |
| 📋 CAPA Report Generator | One-click printable CAPA with AI recommendations |
| 📈 Data Visualizations | Pie chart, bar chart, line trend, risk donut |
| 👥 200 Patient Records | Realistic dummy data across 10 global sites |
| 🔎 Patient Record Checker | Interactive form to analyze any patient |
| 🔔 Toast Notifications | Real-time feedback and alerts |
| 📱 Fully Responsive | Works on all screen sizes |

---

## 🛠️ Technologies Used

- **HTML5** — Semantic markup, accessible forms
- **CSS3** — Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript** — No frameworks, pure JS
- **Canvas API** — Native chart rendering (no Chart.js dependency)
- **IBM Design System** — IBM Blue (#0F62FE), IBM Plex Sans font
- **ICH E6 GCP** — Good Clinical Practice compliance rules

---

## 📁 Folder Structure

```
bob-ai-hackathon-clinical-risk-monitor/
├── README.md                    ← This file
├── index.html                   ← Home Page
├── about.html                   ← About the Problem
├── dashboard.html               ← Patient Monitoring Dashboard
├── patient-checker.html         ← AI Patient Record Checker
├── risk-analysis.html           ← Full Risk Analysis Report
├── capa-report.html             ← CAPA Report Generator
├── site-dashboard.html          ← Site Risk Dashboard
├── documentation.html           ← Project Documentation
├── assets/
│   ├── css/
│   │   ├── style.css            ← Global styles
│   │   └── dashboard.css        ← Dashboard-specific styles
│   ├── js/
│   │   ├── data.js              ← 200-patient sample dataset
│   │   ├── ai-engine.js         ← AI deviation detection logic
│   │   ├── charts.js            ← Canvas-based chart rendering
│   │   └── main.js              ← Utilities, toast, modal, counters
│   ├── images/                  ← Place images here
│   └── screenshots/             ← Place screenshots here
├── docs/
│   ├── project-documentation.md ← Detailed project docs
│   ├── ppt-content.md           ← PPT slide content (7 slides)
│   └── demo-script.md           ← 3-minute demo script
├── presentation/                ← Add PPT file here
└── demo/                        ← Demo assets folder
```

---

## 🚀 Installation & Usage

### Option 1: Open Directly (No server needed)
```bash
# 1. Clone the repository
git clone https://github.com/your-team/bob-ai-hackathon-clinical-risk-monitor.git

# 2. Open index.html in any modern browser
# That's it! No build steps required.
```

### Option 2: Local Development Server
```bash
# Using Python
python -m http.server 8080
# Then open http://localhost:8080

# Using Node.js (npx)
npx serve .
# Then open http://localhost:3000

# Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

---

## 📖 Page Guide

| Page | URL | Description |
|------|-----|-------------|
| Home | `index.html` | Hero, features, how it works |
| About | `about.html` | Clinical trials, deviations, FDA problem |
| Dashboard | `dashboard.html` | KPIs, charts, patient table |
| Patient Checker | `patient-checker.html` | AI form analysis |
| Risk Analysis | `risk-analysis.html` | Full 200-patient risk report |
| CAPA Report | `capa-report.html` | Printable CAPA generator |
| Site Dashboard | `site-dashboard.html` | 10-site risk rankings |
| Documentation | `documentation.html` | Architecture, AI logic, tech stack |

---

## 🧠 AI Logic Summary

### Protocol Deviation Rules (ICH E6 GCP)
```
Major Deviations (Weight: 20–35 points each):
  ✗ Visit > 14 days outside window    (+25)
  ✗ Dose ≥2x or ≤0.5x expected        (+30)
  ✗ Banned co-medication               (+35)
  ✗ Missing critical lab test          (+20)

Minor Deviations (Weight: 10 points each):
  ✗ Visit 7–14 days outside window
  ✗ Minor dose variance

Administrative Deviations (Weight: 5 points):
  ✗ Missing documentation/signature

Risk Score = Σ(weights), capped at 100
Categories: Low(0-30) | Medium(31-60) | High(61-80) | Critical(81-100)
```

---

## 📸 Screenshots

Place screenshots in `assets/screenshots/` folder:

| File | Page |
|------|------|
| `home.png` | Home page hero section |
| `dashboard.png` | Patient monitoring dashboard |
| `patient-checker.png` | AI patient analysis form |
| `risk-analysis.png` | Risk analysis report |
| `capa-report.png` | CAPA report generated |
| `site-dashboard.png` | Site risk rankings |
| `charts.png` | Data visualizations |

---

## 👥 Team Members

| Role | Responsibility |
|------|---------------|
| 👨‍💻 **Team Lead / AI Developer** | AI engine, risk scoring, CAPA logic |
| 🎨 **UI/UX Designer** | IBM Design System, responsive layout |
| 📊 **Data Engineer** | Dataset, charts, aggregations |
| 📋 **Documentation / Presenter** | Docs, demo script, presentation |

---

## 🏆 IBM BoB AI Innovation Hackathon 2026

- **Platform:** IBM BoB AI  
- **Problem Statement:** P1 — Clinical Trial Risk Monitor & Protocol Deviation Detector  
- **Track:** Healthcare AI  
- **Guidelines Implemented:** ICH E6 Good Clinical Practice (GCP), FDA 21 CFR Part 312  

---

## 📜 License

MIT License — Free to use for educational and hackathon purposes.

---

## 🙏 Acknowledgements

- IBM BoB AI Platform for the hackathon infrastructure
- ICH (International Council for Harmonisation) for E6 GCP guidelines
- IBM Design System for the component design language

---

*Built with ❤️ and IBM BoB AI for the IBM BoB AI Innovation Hackathon 2026*
