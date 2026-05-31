/* directory.js — loads members.json, renders grid & list views */

const LEVEL_LABELS = ['NP', 'Bronze', 'Silver', 'Gold'];

function memberImageHTML(member, size = 80) {
  const fallback = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'%3E%3Crect width='${size}' height='${size}' fill='%23e8eef2'/%3E%3Ctext x='50%25' y='54%25' font-size='${Math.round(size*0.35)}' text-anchor='middle' dominant-baseline='middle' fill='%238FA3B1'%3E%F0%9F%8F%A2%3C/text%3E%3C/svg%3E`;
  return `<img src="images/${member.image}" alt="${member.name} logo"
    onerror="this.src='${fallback}'" loading="lazy" width="${size}" height="${size}">`;
}

function renderGrid(members) {
  const container = document.getElementById('members-grid');
  if (!container) return;

  container.innerHTML = members.map(m => `
    <article class="member-card" role="listitem">
      ${memberImageHTML(m, 80)}
      <h3>${m.name}</h3>
      <p class="mem-address">${m.address}</p>
      <p class="mem-phone">${m.phone}</p>
      <span class="mem-level">${LEVEL_LABELS[m.membership] ?? 'Member'}</span>
      <a class="mem-link" href="${m.website}" target="_blank" rel="noopener noreferrer">
        Visit Website ↗
      </a>
    </article>
  `).join('');
}

function renderList(members) {
  const container = document.getElementById('members-list');
  if (!container) return;

  container.innerHTML = members.map(m => `
    <div class="member-row" role="listitem">
      ${memberImageHTML(m, 48)}
      <div class="member-row-info">
        <h3>${m.name}</h3>
        <p class="mem-address">${m.address}</p>
        <p class="mem-phone">${m.phone}</p>
      </div>
      <div>
        <span class="mem-level">${LEVEL_LABELS[m.membership] ?? 'Member'}</span><br>
        <a class="mem-link" href="${m.website}" target="_blank" rel="noopener noreferrer">Website ↗</a>
      </div>
    </div>
  `).join('');
}

function setupToggle() {
  const gridBtn  = document.getElementById('gridBtn');
  const listBtn  = document.getElementById('listBtn');
  const gridView = document.getElementById('members-grid');
  const listView = document.getElementById('members-list');
  if (!gridBtn || !listBtn) return;

  gridBtn.addEventListener('click', () => {
    gridView.style.display = '';
    listView.style.display = 'none';
    gridBtn.classList.add('active');    listBtn.classList.remove('active');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
  });

  listBtn.addEventListener('click', () => {
    gridView.style.display = 'none';
    listView.style.display = '';
    listBtn.classList.add('active');    gridBtn.classList.remove('active');
    listBtn.setAttribute('aria-pressed', 'true');
    gridBtn.setAttribute('aria-pressed', 'false');
  });
}

async function loadDirectory() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Support both array format and { members: [...] } format
    const members = Array.isArray(data) ? data : data.members;

    renderGrid(members);
    renderList(members);
    setupToggle();

  } catch (err) {
    console.error('Directory load failed:', err);
    const grid = document.getElementById('members-grid');
    if (grid) grid.innerHTML = '<p style="padding:1.25rem;color:#5A7080;">Unable to load member directory. Please try again later.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadDirectory);
