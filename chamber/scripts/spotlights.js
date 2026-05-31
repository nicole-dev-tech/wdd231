/* spotlights.js — picks 2–3 Gold/Silver members randomly for the homepage */

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildSpotlightCard(member) {
  const isGold   = member.membership === 3;
  const badge    = isGold ? 'Gold' : 'Silver';
  const badgeCls = isGold ? 'badge-gold' : 'badge-silver';

  const fallback = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e8eef2'/%3E%3Ctext x='50%25' y='54%25' font-size='36' text-anchor='middle' dominant-baseline='middle' fill='%238FA3B1'%3E%F0%9F%8F%A2%3C/text%3E%3C/svg%3E`;

  return `
    <article class="spotlight-card">
      <div class="spotlight-img-wrap">
        <img src="images/${member.image}" alt="${member.name} logo"
          onerror="this.src='${fallback}'" loading="lazy" width="100" height="100">
      </div>
      <div class="spotlight-body">
        <span class="spotlight-badge ${badgeCls}">${badge} Member</span>
        <h3 class="spotlight-name">${member.name}</h3>
        <p class="spotlight-description">${member.address}</p>
        <ul class="spotlight-details">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5
                       19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72
                       12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91
                       a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45
                       12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>${member.phone}</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <a href="mailto:${member.email}">${member.email}</a>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website.replace('https://www.','')}</a>
          </li>
        </ul>
      </div>
    </article>`;
}

async function loadSpotlights() {
  const container = document.getElementById('spotlight-container');
  if (!container) return;

  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Support both array format and { members: [...] } format
    const members = Array.isArray(data) ? data : data.members;

    // Filter Gold (3) and Silver (2) members
    const eligible = members.filter(m => m.membership >= 2);
    const selected = shuffle(eligible).slice(0, 3);

    if (selected.length === 0) {
      container.innerHTML = '<p class="spotlights-error">No spotlights available at this time.</p>';
      return;
    }

    container.innerHTML = selected.map(buildSpotlightCard).join('');

  } catch (err) {
    console.error('Spotlights load failed:', err);
    container.innerHTML = '<p class="spotlights-error">Unable to load spotlights at this time.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadSpotlights);