var cityInputEl = document.querySelector("#cityInput");
var cityNameEl = document.querySelector("#cityName");
var searchButton = document.querySelector("#searchButton")
var searchHistory = document.querySelector("#searchHistory")
var forcast = document.querySelector("#forecast")
var fiveDay = document.querySelector("#fiveDay")
var searchedCitys = JSON.parse(localStorage.getItem("history")) || [];

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();
    if (cityName) {
        geoData(cityName);
        console.log(cityName)
        searchedCitys.push(cityName)
        localStorage.setItem("history", JSON.stringify(searchedCitys))
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
                    oneCall(data[0].lat, data[0].lon);
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
        .then(function (data) {
            console.log(data);
            renderToday(data)
        });
}

var renderToday = function (weatherData) {
    var current = `<div>
    <h3>${cityNameEl.value + " " + moment.unix(weatherData.current.dt).format("MM/DD/YYYY")}</h3>
    <p>${"Temp: " + weatherData.current.temp}</p>
    <p>${"Wind Speed: " + weatherData.current.wind_speed}</p>
    <p>${"Humidity: " + weatherData.current.humidity}</p>
    <p>${"UV Index: " + weatherData.current.uvi}</p>
    </div>`
    forcast.innerHTML = current

    console.log(cityNameEl.value + " " + moment.unix(weatherData.current.dt).format("MM/DD/YYYY"))
    console.log(weatherData.current.temp)
    console.log(weatherData.current.humidity)
    console.log(weatherData.current.uvi)
    console.log(weatherData.current.wind_speed)
    cityNameEl.value = "";
}

cityInputEl.addEventListener("submit", formSubmitHandler);


// var renderWeek = function () {

// }