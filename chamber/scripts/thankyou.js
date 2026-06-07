// scripts/thankyou.js — Populates thank-you summary from URL search params

const MEMBERSHIP_LABELS = {
  np:     'NP Membership (Non-Profit — No Fee)',
  bronze: 'Bronze Membership — R 1 500 / year',
  silver: 'Silver Membership — R 3 500 / year',
  gold:   'Gold Membership — R 6 500 / year',
};

function setField(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || '—';
}

function formatTimestamp(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('en-ZA', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

(function populateSummary() {
  const params = new URLSearchParams(window.location.search);

  setField('out-first-name',  params.get('first-name'));
  setField('out-last-name',   params.get('last-name'));
  setField('out-email',       params.get('email'));
  setField('out-mobile',      params.get('mobile'));
  setField('out-org-name',    params.get('org-name'));
  setField('out-membership',  MEMBERSHIP_LABELS[params.get('membership-level')] || params.get('membership-level'));
  setField('out-timestamp',   formatTimestamp(params.get('timestamp')));
})();