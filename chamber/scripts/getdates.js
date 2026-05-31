/* getdates.js — injects copyright year and last-modified date */
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const modEl = document.getElementById('lastModified');
  if (modEl) modEl.textContent = document.lastModified;
});
