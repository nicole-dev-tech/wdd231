/*  ============================================================
    thankyou.js — Confirmation page logic
    Cape Town Chamber of Commerce
    Author: Nicole Makayi | WDD 231
    ============================================================ */

// Read GET params passed from the join form and populate the summary
var params = new URLSearchParams(window.location.search);

var fieldMap = {
  'first-name': 'out-first-name',
  'last-name':  'out-last-name',
  'email':      'out-email',
  'mobile':     'out-mobile',
  'org-name':   'out-org-name',
  'timestamp':  'out-timestamp'
};

Object.keys(fieldMap).forEach(function(param) {
  var val = params.get(param);
  var el  = document.getElementById(fieldMap[param]);
  if (el && val) {
    el.textContent = decodeURIComponent(val.replace(/\+/g, ' '));
  }
});

// ── Footer ───────────────────────────────────────────────────
var yearEl = document.getElementById('year');
var modEl  = document.getElementById('lastModified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl)  modEl.textContent  = document.lastModified;