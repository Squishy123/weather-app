//This is our api key for Dark Sky
let key = "b1183e501b548d0852a69352f127c8d6";

/**
 * Returns the parsed request to Dark Sky's API
 * @param string apiKey
 * @param object {latitude, longitude}
 **/
async function getForecast(apiKey, location) {
  let response = await fetch("https://api.darksky.net/forecast/" + apiKey + "/" + location.latitude + "," + location.longitude);
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  return data;
}

getForecast(key, {latitude: 42, longitude: 42}).then(function(data) {
  console.log(data);
});
