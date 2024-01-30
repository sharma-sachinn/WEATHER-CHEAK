const search_btn = document.getElementById('searchbtn');
const inputbox = document.querySelector('.input-box');
const weather_img = document.querySelector('.weather-image');
const temperature = document.querySelector('.temp');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

async function checkWeather(city) {
  const api_key = "f978f0925e85af25415a51ea59c52955";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  try {
    const response = await fetch(url);
    const weather_data = await response.json();

    console.log(weather_data);

    const temperatureCelsius = weather_data.main.temp - 273.15;

    const windSpeedKmH = weather_data.wind.speed * 3.6;

    temperature.innerHTML = `${temperatureCelsius.toFixed(2)}<sup>°C</sup>`;
    description.textContent = weather_data.weather[0].description;
    humidity.textContent = `${weather_data.main.humidity}%`;
    wind_speed.textContent = `${windSpeedKmH.toFixed(2)} km/h`;

    updateWeatherImage(weather_data.weather[0].main);

  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function updateWeatherImage(weatherCondition) {
  const weatherImages = {
    'Clear': 'ASSETS/SUNNY.png',
    'Clouds': 'ASSETS/cloudy.png',
    'Rain': 'ASSETS/RAIN.png',
    'Snow': 'ASSETS/SNOW.png',
    'Wind': 'ASSETS/WIND.png',
    'Smoke': 'ASSETS/SMOKE.png',
    'Thunderstorm': 'ASSETS/THUNDERSTORM.png',
    'Fog': 'ASSETS/FOG.png',
    'Mist': 'ASSETS/MIST.png',
  };

  weather_img.src = weatherImages[weatherCondition] || 'ASSETS/DEFAULT.png';
}

search_btn.addEventListener('click', () => {
  checkWeather(inputbox.value);
});
  