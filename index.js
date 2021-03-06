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

//Update our site with the search information
function getQuery() {
  let input = document.getElementById("searchQuery").value;
  let c = document.getElementById("content");
  //clear html
  c.innerHTML = '<h1>'+input+'</h1>';

  getForecast(key, input).then(function(data) {
    c.innerHTML += '<h4>' + data.weather[0].description + '</h4>';
    c.innerHTML += '<p>Temperature: ' + data.main.temp + ' °C<br>Pressure: ' + data.main.pressure + ' kPa</p>';
  });
}

//When we click enter, get the search query
document.getElementById("searchQuery").addEventListener("keydown", function(event) {
  if(event.which === 13) getQuery();
});
