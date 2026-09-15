# Setup Guide — ClinicalAI Monitor
## IBM BoB AI Innovation Hackathon 2026 | Problem P1 | Team Hackaholics

> **This is a pure HTML/CSS/JavaScript application. No installation, no server, no build step is required.**

---

## Prerequisites

This application has **zero mandatory dependencies**. All you need is:

- [x] A modern web browser: **Chrome 100+**, Firefox 100+, or Edge 100+
- [x] The repository cloned to your local machine

Optional (for a local server experience):
- [ ] Python 3.x (for `python -m http.server`) — pre-installed on most systems
- [ ] Node.js 16+ (for `npx serve`) — only if you prefer it

---

## Environment Variables

**None required.** This is a fully client-side application with no backend.

The `src/.env.example` file is provided as a template for **future backend integration** (e.g., IBM watsonx.ai API, EDC system connection). It is not needed to run the current application.

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/bob-ai-hackathone-hackaholics.git

# 2. Enter the project directory
cd bob-ai-hackathone-hackaholics
```

That's it. No `npm install`, no `pip install`, no `docker compose` needed.

---

## Running the Application

### Option A — Direct File Open (Simplest)
```
Open the file  index.html  in Chrome, Firefox, or Edge.
Double-click it in your file explorer, or drag it into a browser window.
```

### Option B — Python Local Server (Recommended for best experience)
```bash
# Python 3
python -m http.server 8080

# Then open in browser:
# http://localhost:8080
```

### Option C — Node.js Local Server
```bash
npx serve .

# Then open in browser:
# http://localhost:3000
```

### Option D — VS Code Live Server
If you use VS Code, install the **Live Server** extension, right-click `index.html`, and select **"Open with Live Server"**.

---

## Application Pages

Once running, navigate to these pages:

| Page | URL (local server) | Description |
|---|---|---|
| Home | `http://localhost:8080/` | Landing page |
| Dashboard | `http://localhost:8080/dashboard.html` | Main monitoring dashboard |
| Patient Checker | `http://localhost:8080/patient-checker.html` | AI patient analyzer |
| Site Risk | `http://localhost:8080/site-dashboard.html` | Site risk rankings |
| Risk Analysis | `http://localhost:8080/risk-analysis.html` | Full patient risk table |
| CAPA Report | `http://localhost:8080/capa-report.html` | Report generator |
| Documentation | `http://localhost:8080/documentation.html` | In-app docs |

---

## Quick Demo Walkthrough

```
1. Open index.html         → Read the overview, see live stats in hero cards
2. Open dashboard.html     → View all 200 patients, KPI cards, and 3 charts
3. Open patient-checker.html → Click "Load Sample" then "Analyze Patient"
4. Open capa-report.html   → Click "Load High-Risk Patient" then "Generate Report"
5. Open site-dashboard.html → See 10 hospitals ranked by risk score
```

---

## Running Tests

The application includes a browser-based test suite. Open the browser console (F12) on any page and run:

```javascript
// Quick validation — paste in browser console on dashboard.html
const pts = window.APP_DATA.patients;
const kpis = window.AI.computeKPIs(pts);
console.table(kpis);

// Test single patient analysis
const result = window.AI.analyzePatient(pts[0]);
console.log(result);

// Test site risk aggregation
const sites = window.AI.computeSiteRisks(pts);
console.table(sites);
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Charts not rendering | Use a local server (Option B/C) instead of direct file open — some browsers restrict Canvas on `file://` |
| Page looks broken | Ensure you are opening files from the repo root, not a subfolder |
| Data resets on refresh | Expected behaviour — patient data is regenerated each load for variety |
| Cross-page data lost | Patient Checker → CAPA flow uses `sessionStorage`; ensure both pages are in the same browser tab session |
| Fonts not loading | Requires internet connection for Google Fonts (IBM Plex Sans); falls back to system sans-serif offline |
