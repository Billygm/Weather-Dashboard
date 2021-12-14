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
            renderWeek(data)
        });
}

// var renderButtons = function(event) {

//     searchedCitys.forEach(function (city) {
//         var cityButton = document.createElement("button");
//         cityButton.innerText = city;
//         searchHistory.appendChild(document.createElement("br"));
//         searchHistory.appendChild(cityButton)
//     });
// }
// renderButtons()

var renderToday = function (weatherData) {
    var today = `<div>
    <h3>${cityNameEl.value + " " + moment.unix(weatherData.current.dt).format("MM/DD/YYYY")}</h3>
    <p>${"Temp: " + weatherData.current.temp + "°F"}</p>
    <p>${"Wind Speed: " + weatherData.current.wind_speed + " MPH"}</p>
    <p>${"Humidity: " + weatherData.current.humidity + "%"}</p>
    <p>${"UV Index: " + weatherData.current.uvi}</p>
    </div>`
    forcast.innerHTML = today

    console.log(cityNameEl.value + " " + moment.unix(weatherData.current.dt).format("MM/DD/YYYY"))
    console.log(weatherData.current.temp)
    console.log(weatherData.current.humidity)
    console.log(weatherData.current.uvi)
    console.log(weatherData.current.wind_speed)
    cityNameEl.value = "";
}

var renderWeek = function (weatherData) {
    var week = `<h3>5-Day Forecast:</h3>
        <div>
        <h4>${moment.unix(weatherData.daily[1].dt).format("MM/DD/YYYY")}</h4>
        <p>${"Temp: " + weatherData.daily[1].temp.day + "°F"}</p>
        <p>${"Wind Speed: " + weatherData.daily[1].wind_speed + " MPH"}</p>
        <p>${"Humidity: " + weatherData.daily[1].humidity + "%"}</p>
        <p>${"UV Index: " + weatherData.daily[1].uvi}</p>
        </div>
        <div>
        <h4>${moment.unix(weatherData.daily[2].dt).format("MM/DD/YYYY")}</h4>
        <p>${"Temp: " + weatherData.daily[2].temp.day + "°F"}</p>
        <p>${"Wind Speed: " + weatherData.daily[2].wind_speed + " MPH"}</p>
        <p>${"Humidity: " + weatherData.daily[2].humidity + "%"}</p>
        <p>${"UV Index: " + weatherData.daily[2].uvi}</p>
        </div>
        <div>
        <h4>${moment.unix(weatherData.daily[3].dt).format("MM/DD/YYYY")}</h4>
        <p>${"Temp: " + weatherData.daily[3].temp.day + "°F"}</p>
        <p>${"Wind Speed: " + weatherData.daily[3].wind_speed + " MPH"}</p>
        <p>${"Humidity: " + weatherData.daily[3].humidity + "%"}</p>
        <p>${"UV Index: " + weatherData.daily[3].uvi}</p>
        </div>
        <div>
        <h4>${moment.unix(weatherData.daily[4].dt).format("MM/DD/YYYY")}</h4>
        <p>${"Temp: " + weatherData.daily[4].temp.day + "°F"}</p>
        <p>${"Wind Speed: " + weatherData.daily[4].wind_speed + " MPH"}</p>
        <p>${"Humidity: " + weatherData.daily[4].humidity + "%"}</p>
        <p>${"UV Index: " + weatherData.daily[4].uvi}</p>
        </div>
        <div>
        <h4>${moment.unix(weatherData.daily[5].dt).format("MM/DD/YYYY")}</h4>
        <p>${"Temp: " + weatherData.daily[5].temp.day + "°F"}</p>
        <p>${"Wind Speed: " + weatherData.daily[5].wind_speed + " MPH"}</p>
        <p>${"Humidity: " + weatherData.daily[5].humidity + "%"}</p>
        <p>${"UV Index: " + weatherData.daily[5].uvi}</p>
        </div>`
    fiveDay.innerHTML = week

    console.log(moment.unix(weatherData.daily[1].dt).format("MM/DD/YYYY"))
    console.log(weatherData.daily[1].temp.day)
}

cityInputEl.addEventListener("submit", formSubmitHandler);