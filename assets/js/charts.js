/**
 * charts.js — Chart Rendering (Canvas-based, no external library)
 * IBM BoB AI Innovation Hackathon 2026
 * Uses native Canvas API for all visualisations
 */

// ────────────────────────────────────────────────────────────
// Color palette
// ────────────────────────────────────────────────────────────
const COLORS = {
  blue:   "#0F62FE",
  green:  "#24A148",
  red:    "#DA1E28",
  yellow: "#F1C21B",
  orange: "#FF832B",
  purple: "#8A3FFC",
  teal:   "#009D9A",
  gray:   "#8D8D8D"
};

// ────────────────────────────────────────────────────────────
// PIE CHART — Severity Distribution
// ────────────────────────────────────────────────────────────
function drawPieChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx    = canvas.getContext("2d");
  const W = canvas.width  = canvas.parentElement.offsetWidth || 320;
  const H = canvas.height = 280;

  ctx.clearRect(0, 0, W, H);

  const slices = [
    { label: "Major",          value: data.major, color: COLORS.red    },
    { label: "Minor",          value: data.minor, color: COLORS.yellow },
    { label: "Administrative", value: data.admin, color: COLORS.blue   },
    { label: "No Deviation",   value: data.none,  color: COLORS.green  }
  ];

  const total = slices.reduce((s, x) => s + x.value, 0);
  if (total === 0) return;

  const cx = W * 0.42, cy = H / 2, r = Math.min(cx, cy) - 20;
  let angle = -Math.PI / 2;

  slices.forEach(slice => {
    if (slice.value === 0) return;
    const sweep = (slice.value / total) * 2 * Math.PI;

    // Slice
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + sweep);
    ctx.closePath();
    ctx.fillStyle = slice.color;
    ctx.fill();

    // Thin white border
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Percentage label
    const mid = angle + sweep / 2;
    const pct = Math.round((slice.value / total) * 100);
    if (pct > 5) {
      const lx = cx + Math.cos(mid) * r * 0.65;
      const ly = cy + Math.sin(mid) * r * 0.65;
      ctx.fillStyle = "white";
      ctx.font = "bold 12px IBM Plex Sans, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${pct}%`, lx, ly);
    }
    angle += sweep;
  });

  // Legend (right side)
  const lx = W * 0.80, ly0 = cy - (slices.length * 22) / 2;
  slices.forEach((s, i) => {
    const lyi = ly0 + i * 26;
    ctx.fillStyle = s.color;
    ctx.fillRect(lx - 48, lyi, 14, 14);
    ctx.fillStyle = "#161616";
    ctx.font = "12px IBM Plex Sans, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(`${s.label} (${s.value})`, lx - 30, lyi + 7);
  });
}

// ────────────────────────────────────────────────────────────
// BAR CHART — Risk Score by Site
// ────────────────────────────────────────────────────────────
function drawBarChart(canvasId, siteRisks) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W   = canvas.width  = canvas.parentElement.offsetWidth || 480;
  const H   = canvas.height = 280;

  ctx.clearRect(0, 0, W, H);

  const pad   = { top: 20, right: 20, bottom: 60, left: 44 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const sites = siteRisks.slice(0, 10);
  const barW  = chartW / sites.length * 0.6;
  const gap   = chartW / sites.length;

  // Grid lines
  [0, 25, 50, 75, 100].forEach(v => {
    const y = pad.top + chartH - (v / 100) * chartH;
    ctx.strokeStyle = "#E0E0E0";
    ctx.lineWidth   = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(W - pad.right, y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#8D8D8D";
    ctx.font = "10px IBM Plex Sans, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(v, pad.left - 4, y + 4);
  });

  // Bars
  sites.forEach((site, i) => {
    const x   = pad.left + i * gap + (gap - barW) / 2;
    const bh  = (site.avgRisk / 100) * chartH;
    const y   = pad.top + chartH - bh;

    // Color by risk level
    let color = COLORS.green;
    if      (site.avgRisk >= 81) color = COLORS.red;
    else if (site.avgRisk >= 61) color = COLORS.orange;
    else if (site.avgRisk >= 31) color = COLORS.yellow;

    // Bar with rounded top
    const r = 4;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + barW - r, y);
    ctx.arcTo(x + barW, y, x + barW, y + r, r);
    ctx.lineTo(x + barW, y + bh);
    ctx.lineTo(x, y + bh);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Value label on top
    ctx.fillStyle = "#161616";
    ctx.font = "bold 11px IBM Plex Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(site.avgRisk, x + barW / 2, y - 6);

    // Site label below
    ctx.fillStyle = "#393939";
    ctx.font = "9.5px IBM Plex Sans, sans-serif";
    ctx.textAlign = "center";
    const shortName = site.siteName.split(" ")[0];
    ctx.fillText(shortName, x + barW / 2, pad.top + chartH + 14);
    ctx.fillText("S" + String(i + 1).padStart(2, "0"), x + barW / 2, pad.top + chartH + 26);
  });

  // Axis
  ctx.strokeStyle = "#393939";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, pad.top + chartH);
  ctx.lineTo(W - pad.right, pad.top + chartH);
  ctx.stroke();
}

// ────────────────────────────────────────────────────────────
// LINE CHART — Deviation Trend over 8 weeks
// ────────────────────────────────────────────────────────────
function drawLineChart(canvasId, trendData) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W   = canvas.width  = canvas.parentElement.offsetWidth || 600;
  const H   = canvas.height = 260;

  ctx.clearRect(0, 0, W, H);

  const pad    = { top: 24, right: 24, bottom: 52, left: 44 };
  const chartW  = W - pad.left - pad.right;
  const chartH  = H - pad.top - pad.bottom;
  const maxVal  = Math.max(...trendData.map(d => d.major + d.minor + d.admin), 10) + 2;

  const series = [
    { key: "major", label: "Major",  color: COLORS.red    },
    { key: "minor", label: "Minor",  color: COLORS.yellow },
    { key: "admin", label: "Admin",  color: COLORS.blue   }
  ];

  // Grid
  for (let g = 0; g <= 4; g++) {
    const v = (maxVal / 4) * g;
    const y = pad.top + chartH - (v / maxVal) * chartH;
    ctx.strokeStyle = "#E0E0E0";
    ctx.lineWidth   = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(W - pad.right, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#8D8D8D";
    ctx.font = "10px IBM Plex Sans, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(Math.round(v), pad.left - 4, y + 4);
  }

  // Lines + dots
  series.forEach(s => {
    const pts = trendData.map((d, i) => ({
      x: pad.left + (i / (trendData.length - 1)) * chartW,
      y: pad.top + chartH - (d[s.key] / maxVal) * chartH
    }));

    // Area fill
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pad.top + chartH);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, pad.top + chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, s.color + "33");
    grad.addColorStop(1, s.color + "00");
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.strokeStyle = s.color;
    ctx.lineWidth   = 2.5;
    ctx.lineJoin    = "round";
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();

    // Dots
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  });

  // X labels
  trendData.forEach((d, i) => {
    const x = pad.left + (i / (trendData.length - 1)) * chartW;
    ctx.fillStyle = "#393939";
    ctx.font = "11px IBM Plex Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(d.label, x, H - pad.bottom + 18);
  });

  // Axis
  ctx.strokeStyle = "#393939";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, pad.top + chartH);
  ctx.lineTo(W - pad.right, pad.top + chartH);
  ctx.stroke();

  // Legend
  const lY = H - 14;
  series.forEach((s, i) => {
    const lx = pad.left + 20 + i * 100;
    ctx.fillStyle = s.color;
    ctx.fillRect(lx, lY - 7, 20, 3);
    ctx.beginPath();
    ctx.arc(lx + 10, lY - 5.5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#393939";
    ctx.font = "11px IBM Plex Sans, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(s.label, lx + 16, lY - 1);
  });
}

// ────────────────────────────────────────────────────────────
// RISK SCORE DONUT — single patient score
// ────────────────────────────────────────────────────────────
function drawRiskDonut(canvasId, score, category) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const S   = 180;
  canvas.width = canvas.height = S;
  ctx.clearRect(0, 0, S, S);

  const cx = S / 2, cy = S / 2, r = S / 2 - 14;
  const colorMap = {
    Low:      COLORS.green,
    Medium:   COLORS.yellow,
    High:     COLORS.orange,
    Critical: COLORS.red
  };
  const color  = colorMap[category] || COLORS.blue;
  const sweep  = (score / 100) * 2 * Math.PI;
  const start  = -Math.PI / 2;

  // Background ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.strokeStyle = "#E0E0E0";
  ctx.lineWidth = 16;
  ctx.stroke();

  // Score arc
  ctx.beginPath();
  ctx.arc(cx, cy, r, start, start + sweep);
  ctx.strokeStyle = color;
  ctx.lineWidth   = 16;
  ctx.lineCap     = "round";
  ctx.stroke();

  // Score text
  ctx.fillStyle = "#161616";
  ctx.font = "bold 32px IBM Plex Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(score, cx, cy - 8);

  ctx.fillStyle = color;
  ctx.font = "bold 13px IBM Plex Sans, sans-serif";
  ctx.fillText(category, cx, cy + 18);
}

// Resize redraw helper
function initCharts() {
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof window.refreshCharts === "function") window.refreshCharts();
    }, 200);
  });
}

window.Charts = { drawPieChart, drawBarChart, drawLineChart, drawRiskDonut, initCharts };
