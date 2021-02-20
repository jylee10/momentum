const weather = document.querySelector(".js-weather");

const API_KEY = "cd98cbedcd1cb799f9cd4919610ba35c";

const COORDS = "coords";  // string 상수(const) 변수

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      const temperature = (json.main.temp).toFixed(1);
      const place = json.name;
      const country = json.sys.country;
      const weatherState = json.weather[0].main;
      weather.innerText = `${temperature}º ${weatherState} \n @ ${place} \n in ${country}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null || loadedCoords === 'undefined') {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();