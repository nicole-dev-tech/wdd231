// scripts/directory.js — Loads members and renders grid + list views

const LEVEL_LABELS = { 1: 'Bronze', 2: 'Silver', 3: 'Gold' };

function levelLabel(n) { return LEVEL_LABELS[n] || 'Member'; }

// ── Grid card ──────────────────────────────────────────────────
function gridCard(m) {
  return `
    <article class="member-card" role="listitem">
      <img src="images/${m.image}" alt="${m.name} logo" width="80" height="80" loading="lazy"
           onerror="this.src='images/placeholder.png'">
      <h3>${m.name}</h3>
      <p class="mem-address">${m.address}</p>
      <p class="mem-phone">${m.phone}</p>
      <p class="mem-level">${levelLabel(m.membership)}</p>
      <a class="mem-link" href="${m.website}" target="_blank" rel="noopener noreferrer">
        Visit Website ↗
      </a>
    </article>`;
}

// ── List row ───────────────────────────────────────────────────
function listRow(m) {
  return `
    <div class="member-row" role="listitem">
      <img src="images/${m.image}" alt="${m.name} logo" width="48" height="48" loading="lazy"
           onerror="this.src='images/placeholder.png'">
      <div class="member-row-info">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p class="mem-phone">${m.phone}</p>
      </div>
      <div>
        <p class="mem-level">${levelLabel(m.membership)}</p>
        <a class="mem-link" href="${m.website}" target="_blank" rel="noopener noreferrer">Website ↗</a>
      </div>
    </div>`;
}

// ── Toggle buttons ─────────────────────────────────────────────
function initToggle() {
  const gridBtn  = document.getElementById('gridBtn');
  const listBtn  = document.getElementById('listBtn');
  const gridView = document.getElementById('members-grid');
  const listView = document.getElementById('members-list');

  function showGrid() {
    gridView.classList.remove('hidden');
    listView.classList.add('hidden');
    gridBtn.classList.add('active');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.classList.remove('active');
    listBtn.setAttribute('aria-pressed', 'false');
  }

  function showList() {
    listView.classList.remove('hidden');
    gridView.classList.add('hidden');
    listBtn.classList.add('active');
    listBtn.setAttribute('aria-pressed', 'true');
    gridBtn.classList.remove('active');
    gridBtn.setAttribute('aria-pressed', 'false');
  }

  gridBtn?.addEventListener('click', showGrid);
  listBtn?.addEventListener('click', showList);
}

// ── Main ───────────────────────────────────────────────────────
async function loadDirectory() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { members } = await res.json();

    const gridEl = document.getElementById('members-grid');
    const listEl = document.getElementById('members-list');

    if (gridEl) gridEl.innerHTML = members.map(gridCard).join('');
    if (listEl) listEl.innerHTML = members.map(listRow).join('');

    initToggle();
  } catch (err) {
    console.error('Directory load failed:', err);
    const gridEl = document.getElementById('members-grid');
    if (gridEl) gridEl.innerHTML = '<p style="padding:1rem;color:#5A7080">Unable to load member directory. Please try again later.</p>';
  }
}

loadDirectory();