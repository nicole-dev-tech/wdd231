const apiKey = "YOUR_API_KEY";
const city = "Cape Town"; // replace with your chamber location
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
  const response = await fetch(url);
  const data = await response.json();
  document.getElementById("current-weather").innerHTML = `
    <p>${data.main.temp}°C – ${data.weather[0].description}</p>
  `;
}

async function getForecast() {
  const response = await fetch(forecastUrl);
  const data = await response.json();
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const day = data.list[i * 8]; // every 24h
    forecastDiv.innerHTML += `<p>${new Date(day.dt_txt).toDateString()}: ${day.main.temp}°C</p>`;
  }
}

getWeather();
getForecast();