/**
 * main.js — Global JavaScript Utilities
 * IBM BoB AI Innovation Hackathon 2026
 * Navbar, Toast, Modal, Animated Counters, Scroll
 */

// ────────────────────────────────────────────────────────────
// DOM Ready helper
// ────────────────────────────────────────────────────────────
function onReady(fn) {
  if (document.readyState !== "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
}

// ────────────────────────────────────────────────────────────
// Navbar hamburger toggle
// ────────────────────────────────────────────────────────────
function initNavbar() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks  = document.querySelector(".nav-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
  });

  // Close on outside click
  document.addEventListener("click", e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
    }
  });

  // Highlight active page
  const currentPage = location.pathname.split("/").pop() || "index.html";
  navLinks.querySelectorAll("a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === currentPage) a.classList.add("active");
  });
}

// ────────────────────────────────────────────────────────────
// Toast Notification
// ────────────────────────────────────────────────────────────
function showToast(message, type = "info", duration = 4000) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const icons = { success: "✓", error: "✕", warning: "⚠", info: "ℹ" };
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || "ℹ"}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideIn 0.3s ease reverse";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ────────────────────────────────────────────────────────────
// Modal helpers
// ────────────────────────────────────────────────────────────
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add("open");
}
function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove("open");
}
function initModals() {
  // Close on overlay click
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) overlay.classList.remove("open");
    });
  });
  // Close buttons
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal-overlay").classList.remove("open");
    });
  });
}

// ────────────────────────────────────────────────────────────
// Animated Counter
// ────────────────────────────────────────────────────────────
function animateCounter(el, target, duration = 1200) {
  const start     = performance.now();
  const startVal  = 0;
  const easeOut   = t => 1 - Math.pow(1 - t, 3);

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current  = Math.round(startVal + (target - startVal) * easeOut(progress));
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

// ────────────────────────────────────────────────────────────
// Intersection Observer — trigger counters when visible
// ────────────────────────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.count);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
}

// ────────────────────────────────────────────────────────────
// Scroll-to-top button
// ────────────────────────────────────────────────────────────
function initScrollTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 400);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ────────────────────────────────────────────────────────────
// Loading overlay
// ────────────────────────────────────────────────────────────
function showLoading(msg = "Analyzing...") {
  let ov = document.getElementById("loadingOverlay");
  if (!ov) {
    ov = document.createElement("div");
    ov.id = "loadingOverlay";
    ov.className = "loading-overlay";
    ov.innerHTML = `<div class="spinner"></div><p style="color:#0F62FE;font-weight:600">${msg}</p>`;
    document.body.appendChild(ov);
  }
  ov.style.display = "flex";
}
function hideLoading() {
  const ov = document.getElementById("loadingOverlay");
  if (ov) ov.style.display = "none";
}

// ────────────────────────────────────────────────────────────
// Format date to readable form
// ────────────────────────────────────────────────────────────
function fmtDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

// ────────────────────────────────────────────────────────────
// Risk score color helper
// ────────────────────────────────────────────────────────────
function riskColor(score) {
  if (score >= 81) return "#DA1E28";
  if (score >= 61) return "#FF832B";
  if (score >= 31) return "#F1C21B";
  return "#24A148";
}
function riskClass(score) {
  if (score >= 81) return "critical";
  if (score >= 61) return "high";
  if (score >= 31) return "medium";
  return "low";
}
function riskCategory(score) {
  if (score >= 81) return "Critical";
  if (score >= 61) return "High";
  if (score >= 31) return "Medium";
  return "Low";
}

// ────────────────────────────────────────────────────────────
// Print / PDF helper
// ────────────────────────────────────────────────────────────
function printReport() {
  window.print();
}

// ────────────────────────────────────────────────────────────
// Initialize all global utilities
// ────────────────────────────────────────────────────────────
onReady(() => {
  initNavbar();
  initModals();
  initScrollTop();
  initCounters();
});

window.Utils = {
  showToast, openModal, closeModal,
  animateCounter, showLoading, hideLoading,
  fmtDate, riskColor, riskClass, riskCategory, printReport
};
