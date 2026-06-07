// scripts/spotlights.js — Renders 2-3 random Gold/Silver member spotlight cards

const MEMBERSHIP_LABELS = { 1: 'Bronze', 2: 'Silver', 3: 'Gold' };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildCard(member) {
  const level  = MEMBERSHIP_LABELS[member.membership] || 'Member';
  const badge  = member.membership === 3 ? 'badge-gold' : 'badge-silver';
  const imgSrc = `images/${member.image}`;

  return `
    <article class="spotlight-card" role="listitem">
      <div class="spotlight-img-wrap">
        <img
          src="${imgSrc}"
          alt="${member.name} logo"
          width="100" height="100"
          loading="lazy"
          onerror="this.src='images/placeholder.png'"
        >
      </div>
      <div class="spotlight-body">
        <span class="spotlight-badge ${badge}">${level} Member</span>
        <h3 class="spotlight-name">${member.name}</h3>
        <ul class="spotlight-details">
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${member.address}
          </li>
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <a href="tel:${member.phone.replace(/\s/g,'')}">${member.phone}</a>
          </li>
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
            </svg>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">
              ${member.website.replace(/^https?:\/\//, '')}
            </a>
          </li>
        </ul>
      </div>
    </article>`;
}

async function loadSpotlights() {
  const container = document.getElementById('spotlight-container');
  if (!container) return;

  try {
    const res  = await fetch('data/members.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { members } = await res.json();

    // Filter Gold (3) and Silver (2), then pick 2-3 at random
    const eligible = members.filter(m => m.membership >= 2);
    const count    = Math.min(3, Math.max(2, eligible.length));
    const picked   = shuffle(eligible).slice(0, count);

    container.innerHTML = picked.map(buildCard).join('');
  } catch (err) {
    console.error('Spotlights load failed:', err);
    container.innerHTML = '<p class="spotlights-error">Member spotlights temporarily unavailable.</p>';
  }
}

loadSpotlights();