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

var geoData = function (city) {

    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=9b0306363b5cc9091aabbebcc259c820`;

    fetch(geoUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    oneCall();
                });
            } else {
                alert("Error: " + response.statusText);
            }
        });
}

var oneCall = function (lat, lon) {
    var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&lang=en&appid=9b0306363b5cc9091aabbebcc259c820
    `;

    fetch(oneCallUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            // render data to page here
        })
}

cityInputEl.addEventListener("submit", formSubmitHandler);
