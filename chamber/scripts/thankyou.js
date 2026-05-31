/* thankyou.js — reads GET params from form submission and displays them */

const LEVEL_LABELS = {
  np:     'NP Membership (Non-Profit)',
  bronze: 'Bronze Membership',
  silver: 'Silver Membership',
  gold:   'Gold Membership'
};

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  function fill(id, key, transform) {
    const el = document.getElementById(id);
    if (!el) return;
    const val = params.get(key);
    el.textContent = val ? (transform ? transform(val) : val) : '—';
  }

  fill('out-first-name',  'first-name');
  fill('out-last-name',   'last-name');
  fill('out-email',       'email');
  fill('out-mobile',      'mobile');
  fill('out-org-name',    'org-name');
  fill('out-membership',  'membership-level', v => LEVEL_LABELS[v] ?? v);
  fill('out-timestamp',   'timestamp');
});