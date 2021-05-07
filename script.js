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

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentPlace = response.data.name;
  let title = document.querySelector("h1");

  title.innerHTML = `${currentPlace}`;
  let temperatureHere = document.querySelector("#temperature-now");
  temperatureHere.innerHTML = `${temperature}`;

  console.log(response.data);

  let description = document.querySelector("#temperature-description");

  description.innerHTML = response.data.weather[0].description;
  let namedCity = document.querySelector("#city");
  namedCity.innerHTML = response.data.name;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", handleClick);

function handleClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

search("Dallas");
