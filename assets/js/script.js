var cityInputEl = document.querySelector("#cityInput");
var cityNameEl = document.querySelector("#cityName");

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityNameEl.value.trim();
  
    if (cityName) {
      geoData(cityName);
  
      cityNameEl.value = "";
    } else {
      alert("Please enter a valid location");
    }
  };

var geoData = function(city) {

    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=9b0306363b5cc9091aabbebcc259c820`;

    fetch(geoUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
            // return response.json();
        });
}

cityInputEl.addEventListener("submit", formSubmitHandler);
