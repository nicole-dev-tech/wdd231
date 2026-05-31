/* join.js — timestamp injection + modal logic (no inline onclick attributes) */

// ── Timestamp ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const tsField = document.getElementById('timestamp');
  if (tsField) {
    tsField.value = new Date().toLocaleString('en-ZA', {
      dateStyle: 'medium', timeStyle: 'short'
    });
  }

  // ── Modal: open via "Learn More" buttons on membership cards ──
  document.querySelectorAll('.mem-card-link[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const dialog = document.getElementById(modalId);
      if (dialog) dialog.showModal();
    });
  });

  // ── Modal: close via ✕ button ────────────────────────────────
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const dialog = btn.closest('dialog');
      if (dialog) dialog.close();
    });
  });

  // ── Modal: select membership level via CTA button ────────────
  document.querySelectorAll('.modal-cta[data-select]').forEach(btn => {
    btn.addEventListener('click', () => {
      const level  = btn.getAttribute('data-select');
      const select = document.getElementById('membership-level');
      if (select) select.value = level;
      const dialog = btn.closest('dialog');
      if (dialog) dialog.close();
    });
  });

  // ── Modal: close on click outside (backdrop click) ───────────
  document.querySelectorAll('dialog.mem-modal').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      // The dialog's padding area is the backdrop; clicking it closes the modal
      const rect = dialog.getBoundingClientRect();
      const inDialog = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top  &&
        e.clientY <= rect.bottom
      );
      if (!inDialog) dialog.close();
    });
  });
});