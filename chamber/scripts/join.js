// scripts/join.js — Membership modals + form timestamp

// ── Timestamp ──────────────────────────────────────────────────
const tsInput = document.getElementById('timestamp');
if (tsInput) tsInput.value = new Date().toISOString();

// ── Modal helpers ──────────────────────────────────────────────
function openModal(id) {
  const dialog = document.getElementById(id);
  if (dialog && typeof dialog.showModal === 'function') {
    dialog.showModal();
    // Trap focus on first focusable element
    dialog.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus();
  }
}

function closeModal(id) {
  const dialog = document.getElementById(id);
  if (dialog && typeof dialog.close === 'function') dialog.close();
}

// ── Open — "Learn More" card buttons ──────────────────────────
document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.modal;
    if (btn.dataset.select) {
      // "Select X Membership" inside a modal — pre-fill form and close
      const select = document.getElementById('membership-level');
      if (select) {
        select.value = btn.dataset.select;
        select.dispatchEvent(new Event('change'));
      }
      closeModal(target);
      document.getElementById('membership-level')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      openModal(target);
    }
  });
});

// ── Close — × button inside each dialog ───────────────────────
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('dialog')?.close();
  });
});

// ── Close on backdrop click ────────────────────────────────────
document.querySelectorAll('dialog.mem-modal').forEach(dialog => {
  dialog.addEventListener('click', e => {
    const rect = dialog.getBoundingClientRect();
    const outside =
      e.clientX < rect.left   ||
      e.clientX > rect.right  ||
      e.clientY < rect.top    ||
      e.clientY > rect.bottom;
    if (outside) dialog.close();
  });
});

// ── Close on Escape (browsers handle this natively for <dialog>
//    but we ensure aria state is consistent) ─────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('dialog[open]').forEach(d => d.close());
  }
});