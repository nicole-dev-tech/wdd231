/* ============================================
   Connect&Learn Hub — Dynamic Dates Script
   File: scripts/getdates.js
   Author: Nicole Makayi
   ============================================ */

/* Get the current date */
const now = new Date();

/* Format options for a readable date e.g. "05 June 2026" */
const dateOptions = {
  day:   '2-digit',
  month: 'long',
  year:  'numeric'
};

const formattedDate = now.toLocaleDateString('en-ZA', dateOptions);
const currentYear   = now.getFullYear();

/* ── Populate meta bar ── */
const lastModifiedEl = document.getElementById('lastModified');
const currentYearEl  = document.getElementById('currentYear');

if (lastModifiedEl) {
  lastModifiedEl.textContent = formattedDate;
}

if (currentYearEl) {
  currentYearEl.textContent = currentYear;
}

/* ── Populate footer ── */
const footerYearEl     = document.getElementById('footerYear');
const footerModifiedEl = document.getElementById('footerModified');

if (footerYearEl) {
  footerYearEl.textContent = currentYear;
}

if (footerModifiedEl) {
  footerModifiedEl.textContent = 'Last modified: ' + formattedDate;
}