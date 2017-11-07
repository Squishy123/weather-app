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

var map;
var input;
var searchBox;
var markers = [];

function updateMap(){

      //google maps logic
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        }));

  //frankly I really don't understand this. Just know that this code shifts the map to the location
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
}


//When we click enter, get the search query
/*
document.getElementById("searchQuery").addEventListener("keydown", function(event) {
  if(event.which === 13) getQuery();
});*/

function initMap() {
  map = new google.maps.Map(document.getElementById('googleMap'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  input = document.getElementById('searchQuery');
  searchBox = new google.maps.places.SearchBox(input);

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    //find the weather for the location
    getQuery();
    updateMap();
  });
}
