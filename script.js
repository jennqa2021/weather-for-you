//part date and time
let form = document.querySelector("#city-form");
form.addEventListener("submit", city);

let now = new Date();
let time = document.querySelector("#date");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayIndex = days[now.getDay()];

time.innerHTML = `${dayIndex} ${hour}:${minutes}`;

///part next

function city(event) {
  event.preventDefault();

  let selectCity = document.querySelector("#search-city-input");
  search(selectCity.value);
}

function search(city) {
  let apiKey = "d89748fc4cee1bf5df210fac0fce9c47";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
// Location button

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "d89748fc4cee1bf5df210fac0fce9c47";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function getForecast(coordinates) {
  let apiKey = "d89748fc4cee1bf5df210fac0fce9c47";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentPlace = response.data.name;
  let title = document.querySelector("h1");
  let temperatureHere = document.querySelector("#temperature-now");
  let description = document.querySelector("#temperature-description");
  let namedCity = document.querySelector("#city");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  let humidity = document.querySelector("#humidity");
  celcuisTemp = response.data.main.temp;
  temperatureHere.innerHTML = `${temperature}`;
  console.log(response.data);
  title.innerHTML = `${currentPlace}`;
  description.innerHTML = response.data.weather[0].description;
  namedCity.innerHTML = response.data.name;
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  humidity.innerHTML = Math.round(response.data.main.humidity);

  getForecast(response.data.coord);
}

function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let fday = date.getDay();
  let fdays = ["Sunday", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return fdays[fday];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<span class="row gy-5">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-sm">
      <span class="heading">${formatForecast(forecastDay.dt)}</span>
         <img class="emoji"
         src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png"
         width="42"
         <div>
              <span class="forecast-max"><strong>${Math.round(
                forecastDay.temp.max
              )}°</strong></span>
              <span class="forecast-min">/ ${Math.round(
                forecastDay.temp.min
              )}°</span></div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</span>`;
  forecastElement.innerHTML = forecastHTML;

  icon.innerHTML = `<i class="fas ${
    icons[response.data.weather[0].icon]
  }" id="current-weather-icon"></i>`;
}

let celcuisTemp = null;

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", handleClick);

function handleClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function displayFahTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celcuisTemp * 9) / 5 + 32;
  let temperature = document.querySelector("#temperature-now");
  celLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahTemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", displayCelTemp);

function displayCelTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature-now");
  celLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celcuisTemp);
}

search("Dallas");

//// Added icons and function for forecast

let icons = {
  "01d": "fa-sun", // Clear sky day,
  "01n": "fa-moon", // Clear sky night
  "02d": "fa-cloud-sun", // Few clouds day
  "02n": "fa-cloud-moon", // Few clouds night
  "03d": "fa-cloud", // Scattered clouds day
  "03n": "fa-cloud", // Scattered clouds night
  "04d": "fa-cloud", // Broken clouds day
  "04n": "fa-cloud", // Broken clouds night
  "09d": "fa-cloud-showers-heavy", // Shower rain day
  "09n": "fa-cloud-showers-heavy", // Shower rain night
  "10d": "fa-cloud-rain", // Rain day
  "10n": "fa-cloud-rain", // Rain night
  "11d": "fa-bolt", // Thunderstorm day
  "11n": "fa-bolt", // Thunderstorm night
  "13d": "fa-snowflake", // Snow day
  "13n": "fa-snowflake", // Snow sky night
  "50d": "fa-smog", // Mist day
  "50n": "fa-smog", // Mist night
};
