//This is our api key for OpenWeatherMap
let key = "b370a49d76395c80b0b3652da6a0696f";

/**
 * Returns the parsed request to OpenWeatherMap's API
 * @param string apiKey
 * @param object {latitude, longitude}
 **/
async function getForecast(key, cityName) {
  let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + key + "&units=metric");
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  return data;
}

let c = document.getElementById("content");

getForecast(key, "Toronto, ca").then(function(data) {
  c.innerHTML += '<h2>'+data.weather[0].description+'</h2>';
  c.innerHTML += '<h3>Temperature: ' + data.main.temp+' °C</h3>';
  c.innerHTML += '<h3>Pressure: ' + data.main.pressure+' kPa</h3>';
});
