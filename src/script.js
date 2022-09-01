//part1
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let currentDate = document.querySelector("#todays-date");
currentDate.innerHTML = `${month} ${date}, ${year}`;

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `Current time: ${hour}:${minutes}`;

//part2
function showCityInfo(event) {
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${cityInput.value}`;

  function showCurrentWeather(response) {
    let tempRound = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#tempvalue");
    temperatureElement.innerHTML = `${tempRound}`;
    let humidityRound = Math.round(response.data.main.humidity);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidityRound}%`;
    let windRound = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind: ${windRound} km/h`;
    let precipitationRound = Math.round(response.data.clouds.all);
    let precipitationElement = document.querySelector("#precipitation");
    precipitationElement.innerHTML = `Precipitation: ${precipitationRound}%`;
  }

  let apiKey = "62d974cdf289555d8e3112425a1f6164";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentWeather);
}
let searchCity = document.querySelector(".btn-primary");
searchCity.addEventListener("click", showCityInfo);

//part 3
function submitCurrent(info) {
  function retrievePosition(position) {
    function showLocalInfo(response) {
      let cityName = document.querySelector("#city");
      cityName.innerHTML = `${response.data.name}`;
      let tempRound = Math.round(response.data.main.temp);
      let temperatureElement = document.querySelector("#tempvalue");
      temperatureElement.innerHTML = `${tempRound}`;
      let humidityRound = Math.round(response.data.main.humidity);
      let humidityElement = document.querySelector("#humidity");
      humidityElement.innerHTML = `Humidity: ${humidityRound}%`;
      let windRound = Math.round(response.data.wind.speed);
      let windElement = document.querySelector("#wind");
      windElement.innerHTML = `Wind: ${windRound} km/h`;
      let precipitationRound = Math.round(response.data.clouds.all);
      let precipitationElement = document.querySelector("#precipitation");
      precipitationElement.innerHTML = `Precipitation: ${precipitationRound}%`;
    }
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let apiKey = "62d974cdf289555d8e3112425a1f6164";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}`).then(showLocalInfo);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let localWeather = document.querySelector(".btn-success");
localWeather.addEventListener("click", submitCurrent);
