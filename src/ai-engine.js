/**
 * ai-engine.js — Clinical Trial AI Protocol Deviation Detector
 * IBM BoB AI Innovation Hackathon 2026
 *
 * Implements ICH E6 GCP-compliant deviation detection,
 * severity classification, risk scoring, and CAPA recommendations.
 */

// ────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────
const VISIT_WINDOW_DAYS  = 7;   // Acceptable visit window ±7 days
const CRITICAL_LATE_DAYS = 14;  // Beyond 14 days = major deviation

// Risk scoring weights
const WEIGHTS = {
  majorDeviation:    25,
  minorDeviation:    10,
  adminDeviation:     5,
  missedVisit:       15,
  wrongDose:         30,
  bannedMed:         35,
  missingCriticalLab:20,
  missingDoc:         5
};

// ────────────────────────────────────────────────────────────
// AI Deviation Detector
// ────────────────────────────────────────────────────────────
function analyzePatient(patient) {
  const deviations = [];
  let rawScore = 0;

  // 1. Visit Timing Check
  const sched    = new Date(patient.scheduledDate);
  const actual   = new Date(patient.visitDate);
  const diffDays = Math.round((actual - sched) / (1000 * 60 * 60 * 24));

  if (Math.abs(diffDays) > CRITICAL_LATE_DAYS) {
    deviations.push({
      type:        "Missed/Late Visit",
      severity:    "Major",
      detail:      `Visit was ${Math.abs(diffDays)} days ${diffDays > 0 ? "late" : "early"} (>14 days threshold).`,
      rootCause:   "Patient scheduling failure or site communication breakdown.",
      corrective:  "Immediately schedule a makeup visit and assess patient safety.",
      preventive:  "Implement automated visit reminder system for patients and coordinators.",
      responsible: "Clinical Site Coordinator",
      followUp:    addDaysFromToday(7)
    });
    rawScore += WEIGHTS.majorDeviation;
  } else if (Math.abs(diffDays) > VISIT_WINDOW_DAYS) {
    deviations.push({
      type:        "Late Visit",
      severity:    "Minor",
      detail:      `Visit was ${Math.abs(diffDays)} days ${diffDays > 0 ? "late" : "early"} (>${VISIT_WINDOW_DAYS}-day window).`,
      rootCause:   "Patient non-compliance or scheduling conflict.",
      corrective:  "Document deviation and notify the Sponsor/CRO within 5 working days.",
      preventive:  "Introduce patient engagement program and visit reminder calls.",
      responsible: "Site Coordinator + Principal Investigator",
      followUp:    addDaysFromToday(14)
    });
    rawScore += WEIGHTS.minorDeviation;
  }

  // 2. Dose Check
  if (patient.doseGiven !== patient.expectedDose) {
    const ratio = patient.doseGiven / patient.expectedDose;
    const isCritical = ratio >= 2 || ratio <= 0.5;
    deviations.push({
      type:        "Wrong Dose Administered",
      severity:    isCritical ? "Major" : "Minor",
      detail:      `Administered ${patient.doseGiven} mg; expected ${patient.expectedDose} mg (${((ratio - 1) * 100).toFixed(0)}% deviation).`,
      rootCause:   isCritical
        ? "Serious dosing error — possible data entry or dispensing failure."
        : "Minor dose variance — possible pharmacy label misread.",
      corrective:  "Immediate physician review of patient status. Report SAE if symptoms present.",
      preventive:  "Double-check dispensing workflow; introduce barcode verification.",
      responsible: "Principal Investigator + Pharmacist",
      followUp:    addDaysFromToday(3)
    });
    rawScore += isCritical ? WEIGHTS.wrongDose : WEIGHTS.minorDeviation;
  }

  // 3. Banned Co-medication Check
  const bannedMeds = (window.APP_DATA && window.APP_DATA.bannedMeds) || [];
  if (bannedMeds.includes(patient.comed)) {
    deviations.push({
      type:        "Prohibited Co-medication",
      severity:    "Major",
      detail:      `Patient is taking ${patient.comed}, which is on the protocol-banned medication list.`,
      rootCause:   "Prescribing physician was not informed of trial restrictions, or patient self-medicated.",
      corrective:  "Immediately discontinue banned medication; assess drug-drug interactions; report to sponsor.",
      preventive:  "Provide updated medication restriction checklist at every visit; add EHR alert.",
      responsible: "Principal Investigator + Medical Monitor",
      followUp:    addDaysFromToday(3)
    });
    rawScore += WEIGHTS.bannedMed;
  }

  // 4. Lab Test Check
  if (patient.labCompleted === "No") {
    deviations.push({
      type:        "Missing Laboratory Test",
      severity:    "Major",
      detail:      "Required lab test not completed per protocol schedule.",
      rootCause:   "Lab requisition not submitted or patient refused sample collection.",
      corrective:  "Collect missing lab samples immediately; assess impact on efficacy data.",
      preventive:  "Implement lab test checklist that triggers before visit completion sign-off.",
      responsible: "Clinical Research Coordinator + Lab Technician",
      followUp:    addDaysFromToday(5)
    });
    rawScore += WEIGHTS.missingCriticalLab;
  }

  // 5. Documentation Check
  if (patient.docComplete === "No") {
    deviations.push({
      type:        "Missing Documentation",
      severity:    "Administrative",
      detail:      "Visit documentation or consent form is incomplete in the patient record.",
      rootCause:   "Site staff oversight or electronic data capture system error.",
      corrective:  "Complete all outstanding documentation within 48 hours; obtain retroactive signatures if permitted.",
      preventive:  "Add mandatory documentation completion step before visit closure in eCRF system.",
      responsible: "Data Manager + Site Coordinator",
      followUp:    addDaysFromToday(2)
    });
    rawScore += WEIGHTS.missingDoc;
  }

  // ── Risk Score calculation (cap at 100)
  const riskScore = Math.min(100, rawScore);

  // ── Risk Category
  let riskCategory = "Low";
  if      (riskScore >= 81) riskCategory = "Critical";
  else if (riskScore >= 61) riskCategory = "High";
  else if (riskScore >= 31) riskCategory = "Medium";

  return {
    patientId:    patient.id,
    patientName:  patient.name,
    siteName:     patient.siteName,
    deviations,
    riskScore,
    riskCategory,
    totalDeviations:  deviations.length,
    majorCount:   deviations.filter(d => d.severity === "Major").length,
    minorCount:   deviations.filter(d => d.severity === "Minor").length,
    adminCount:   deviations.filter(d => d.severity === "Administrative").length,
    analysisDate: new Date().toISOString().split("T")[0]
  };
}

// ────────────────────────────────────────────────────────────
// Site Risk Aggregator
// ────────────────────────────────────────────────────────────
function computeSiteRisks(patients) {
  const siteMap = {};

  patients.forEach(p => {
    if (!siteMap[p.siteId]) {
      siteMap[p.siteId] = {
        siteId:       p.siteId,
        siteName:     p.siteName,
        total:        0,
        major:        0,
        minor:        0,
        admin:        0,
        riskSum:      0,
        activePatients: 0
      };
    }
    const result = analyzePatient(p);
    const s = siteMap[p.siteId];
    s.total++;
    s.major  += result.majorCount;
    s.minor  += result.minorCount;
    s.admin  += result.adminCount;
    s.riskSum += result.riskScore;
    if (p.status === "Active") s.activePatients++;
  });

  return Object.values(siteMap).map(s => {
    const avgRisk = Math.round(s.riskSum / s.total);
    let status = "Low";
    if      (avgRisk >= 81) status = "Critical";
    else if (avgRisk >= 61) status = "High";
    else if (avgRisk >= 31) status = "Medium";
    return { ...s, avgRisk, status };
  }).sort((a, b) => b.avgRisk - a.avgRisk);
}

// ────────────────────────────────────────────────────────────
// Dashboard KPI Calculator
// ────────────────────────────────────────────────────────────
function computeKPIs(patients) {
  let totalMajor = 0, totalMinor = 0, totalAdmin = 0, missedVisits = 0;

  patients.forEach(p => {
    const r = analyzePatient(p);
    totalMajor += r.majorCount;
    totalMinor += r.minorCount;
    totalAdmin += r.adminCount;
    if (r.deviations.some(d => d.type.includes("Visit"))) missedVisits++;
  });

  const activePatients = patients.filter(p => p.status === "Active").length;
  const siteRisks = computeSiteRisks(patients);
  const highRiskSites = siteRisks.filter(s => s.status === "High" || s.status === "Critical").length;

  return {
    totalPatients:  patients.length,
    activePatients,
    missedVisits,
    majorDeviations: totalMajor,
    minorDeviations: totalMinor,
    adminDeviations: totalAdmin,
    highRiskSites
  };
}

// ────────────────────────────────────────────────────────────
// Deviation Trend (last 8 weeks)
// ────────────────────────────────────────────────────────────
function computeTrend(patients) {
  const weeks = [];
  for (let w = 7; w >= 0; w--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - w * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const label = `W${8-w}`;
    let major = 0, minor = 0, admin = 0;

    patients.forEach(p => {
      const vd = new Date(p.visitDate);
      if (vd >= weekStart && vd <= weekEnd) {
        const r = analyzePatient(p);
        major += r.majorCount;
        minor += r.minorCount;
        admin += r.adminCount;
      }
    });
    weeks.push({ label, major, minor, admin });
  }
  return weeks;
}

// ────────────────────────────────────────────────────────────
// Severity Distribution for Pie
// ────────────────────────────────────────────────────────────
function computeSeverityDist(patients) {
  let major = 0, minor = 0, admin = 0, none = 0;
  patients.forEach(p => {
    const r = analyzePatient(p);
    if      (r.majorCount > 0)  major++;
    else if (r.minorCount > 0)  minor++;
    else if (r.adminCount > 0)  admin++;
    else                        none++;
  });
  return { major, minor, admin, none };
}

// ────────────────────────────────────────────────────────────
// Helper: Add days from today → date string
// ────────────────────────────────────────────────────────────
function addDaysFromToday(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

// ────────────────────────────────────────────────────────────
// Badge HTML helper (shared across pages)
// ────────────────────────────────────────────────────────────
function severityBadge(severity) {
  const map = {
    "Major":          "badge-major",
    "Minor":          "badge-minor",
    "Administrative": "badge-admin",
    "None":           "badge-none"
  };
  return `<span class="badge ${map[severity] || 'badge-none'}"><span class="badge-dot"></span>${severity}</span>`;
}

function riskBadge(category) {
  const map = {
    "Critical": "badge-critical",
    "High":     "badge-high",
    "Medium":   "badge-medium",
    "Low":      "badge-low"
  };
  return `<span class="badge ${map[category] || 'badge-low'}"><span class="badge-dot"></span>${category}</span>`;
}

// Expose globally
window.AI = {
  analyzePatient,
  computeSiteRisks,
  computeKPIs,
  computeTrend,
  computeSeverityDist,
  severityBadge,
  riskBadge
};
