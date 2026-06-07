// scripts/discover.js — Discover page: places cards + visit-message logic

// ── Visitor message ────────────────────────────────────────────
function showVisitMessage() {
  const msgEl = document.getElementById('visit-message');
  if (!msgEl) return;

  const KEY       = 'ctcc_last_visit';
  const now       = Date.now();
  const lastVisit = localStorage.getItem(KEY);

  let message;
  if (!lastVisit) {
    message = '👋 Welcome! This is your first visit to the Discover page. We hope you enjoy exploring Cape Town!';
  } else {
    const diffMs   = now - Number(lastVisit);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      message = '👋 Welcome back! You last visited today. Great to see you again!';
    } else if (diffDays === 1) {
      message = '👋 Welcome back! You were here 1 day ago.';
    } else {
      message = `👋 Welcome back! You were here ${diffDays} days ago.`;
    }
  }

  localStorage.setItem(KEY, String(now));
  msgEl.textContent = message;
}

// ── Places data (inline — avoids ES module import issues) ──────
const places = [
  {
    name: 'Table Mountain',
    address: 'Table Mountain National Park, Cape Town',
    description: 'A world-famous landmark offering breathtaking panoramic views of the city and ocean.',
    image: 'images/table-mountain.jpeg'
  },
  {
    name: 'Robben Island',
    address: 'Table Bay, Cape Town',
    description: 'Historic island where Nelson Mandela was imprisoned — now a UNESCO World Heritage Site.',
    image: 'images/robben-island.jpg'
  },
  {
    name: 'Camps Bay Beach',
    address: 'Victoria Rd, Camps Bay',
    description: 'A popular beach with white sand, crystal water, and stunning mountain sunsets.',
    image: 'images/camps-bay.jpg'
  },
  {
    name: 'Kirstenbosch Gardens',
    address: 'Rhodes Dr, Newlands',
    description: 'Beautiful botanical garden showcasing South African indigenous plants.',
    image: 'images/kirstenbosch.jpg'
  },
  {
    name: 'Bo-Kaap',
    address: 'Wale St, Cape Town',
    description: 'Colourful cultural neighbourhood with rich Cape Malay heritage and history.',
    image: 'images/bo-kaap.jpg'
  },
  {
    name: 'Cape Point',
    address: 'Cape Peninsula',
    description: 'Dramatic cliffs and sweeping ocean views at the southern tip of the Cape Peninsula.',
    image: 'images/cape-point.jpg'
  },
  {
    name: 'Signal Hill',
    address: 'Signal Hill Rd, Cape Town',
    description: "Cape Town's most celebrated sunset viewpoint with panoramic city and ocean vistas.",
    image: 'images/signal-hill.jpg'
  },
  {
    name: 'Two Oceans Aquarium',
    address: 'Dock Rd, V&A Waterfront',
    description: 'Award-winning aquarium displaying marine life from the Atlantic and Indian oceans.',
    image: 'images/aquarium.jpg'
  }
];

// ── Render cards ───────────────────────────────────────────────
function renderPlaces() {
  const container = document.getElementById('discover-container');
  if (!container) return;

  container.innerHTML = places.map((p, i) => `
    <article class="card card${i + 1}" aria-label="${p.name}">
      <img
        src="${p.image}"
        alt="${p.name}"
        width="400" height="250"
        loading="${i < 2 ? 'eager' : 'lazy'}"
        onerror="this.src='images/placeholder.png'"
      >
      <div class="card-body">
        <h2>${p.name}</h2>
        <p class="card-address">${p.address}</p>
        <p class="card-desc">${p.description}</p>
      </div>
    </article>`).join('');
}

// ── Init ───────────────────────────────────────────────────────
showVisitMessage();
renderPlaces();