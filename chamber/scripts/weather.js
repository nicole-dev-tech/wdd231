/* weather.js — fetches live weather for Cape Town via Open-Meteo (no API key needed) */

const CAPE_TOWN_LAT  = -33.9249;
const CAPE_TOWN_LON  =  18.4241;

const WMO_ICONS = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '❄️',
  80: '🌦️', 81: '🌧️', 82: '⛈️',
  95: '⛈️', 96: '⛈️', 99: '⛈️'
};

const WMO_DESC = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Freezing fog',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Dense drizzle',
  61: 'Slight rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
  80: 'Showers', 81: 'Rain showers', 82: 'Violent showers',
  95: 'Thunderstorm', 96: 'Thunderstorm w/ hail', 99: 'Severe thunderstorm'
};

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

async function loadWeather() {
  const currentEl  = document.getElementById('current-weather');
  const forecastEl = document.getElementById('forecast');
  if (!currentEl) return;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${CAPE_TOWN_LAT}&longitude=${CAPE_TOWN_LON}` +
    `&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m` +
    `&daily=weathercode,temperature_2m_max,temperature_2m_min` +
    `&timezone=Africa%2FJohannesburg&forecast_days=4`;

  try {
    const res  = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const { temperature_2m: temp, weathercode: code,
            windspeed_10m: wind, relative_humidity_2m: humidity } = data.current;

    const icon = WMO_ICONS[code] ?? '🌡️';
    const desc = WMO_DESC[code]  ?? 'Unknown';

    currentEl.innerHTML = `
      <div class="weather-now">
        <span class="weather-icon" aria-hidden="true">${icon}</span>
        <div>
          <div class="weather-temp">${Math.round(temp)}°C</div>
          <div class="weather-desc">${desc}</div>
          <div class="weather-meta">Wind ${Math.round(wind)} km/h · Humidity ${humidity}%</div>
        </div>
      </div>`;

    if (forecastEl && data.daily) {
      const { time, weathercode: codes, temperature_2m_max: maxT, temperature_2m_min: minT } = data.daily;

      // Skip today (index 0), show next 3
      const cards = [1, 2, 3].map(i => {
        const dayName = DAYS[new Date(time[i]).getDay()];
        return `
          <div class="forecast-card">
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-icon" aria-hidden="true">${WMO_ICONS[codes[i]] ?? '🌡️'}</div>
            <div class="forecast-temp">${Math.round(maxT[i])}° / ${Math.round(minT[i])}°</div>
          </div>`;
      }).join('');

      forecastEl.innerHTML = `
        <p class="forecast-title">3-Day Forecast</p>
        <div class="forecast-grid">${cards}</div>`;
    }

  } catch (err) {
    console.warn('Weather fetch failed:', err);
    currentEl.innerHTML = `
      <p class="weather-meta">Cape Town, South Africa</p>
      <p class="weather-error">Weather data unavailable. Check back soon.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadWeather);
