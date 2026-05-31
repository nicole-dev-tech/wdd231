/* join.js — timestamp injection + modal logic */

// ── Timestamp ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const tsField = document.getElementById('timestamp');
  if (tsField) {
    tsField.value = new Date().toLocaleString('en-ZA', {
      dateStyle: 'medium', timeStyle: 'short'
    });
  }
});

// ── Modal helpers (called via inline onclick) ────────────────
function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  // Move focus into modal for accessibility
  const closeBtn = overlay.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeOnOverlay(event, id) {
  if (event.target === event.currentTarget) closeModal(id);
}

// Close any open modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(el => {
      el.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});
