var cityInputEl = document.querySelector("#cityInput");
var cityNameEl = document.querySelector("#cityName");
var searchButton = document.querySelector("#searchButton")
var searchHistory = document.querySelector("#searchHistory")
var forcast = document.querySelector("#forecast")
var fiveDay = document.querySelector("#fiveDay")
var searchedCitys = JSON.parse(localStorage.getItem("history")) || [];
var dayColor = "color:#0dcaf0";
var weekColor = "background-color:#0dcaf0; color:023e8a;";
var displayStyle = "display:flex";

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();
    if (cityName) {
        geoData(cityName);
        console.log(cityName)
        searchedCitys.push(cityName)
        localStorage.setItem("history", JSON.stringify(searchedCitys))
    } else {
        console.log(cityName)
        alert("Please enter a valid location");
    }
};

var buttonClickHandler = function (event) {
    event.preventDefault();
    var place = event.target.getAttribute("location");
    if (place) {
        geoData(place);
        console.log(place)
        cityNameEl.value = place
    }
}

var geoData = function (city) {

    var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=9b0306363b5cc9091aabbebcc259c820`;

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
};

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
    };
    
    var renderButtons = function () {
        searchedCitys.forEach(function (city) {
            var cityButtons = `</br>
            <button location="${city}" class="btn btn-secondary col-12" type="submit">${city}</button>
            </br>`;
            searchHistory.innerHTML += cityButtons
        });
    };
    renderButtons()
    
    var uviColor = ""
    
    var renderToday = function (weatherData) {
    var today = `<div class="m-3 p-1 border border-3 border-info" style="${dayColor}">
    <h3>${cityNameEl.value + " " + moment.unix(weatherData.current.dt).format("MM/DD/YYYY")}</h3>
    <p>${"Temp: " + weatherData.current.temp + "??F"}</p>
    <p>${"Wind Speed: " + weatherData.current.wind_speed + " MPH"}</p>
    <p>${"Humidity: " + weatherData.current.humidity + "%"}</p>
    <p class="bg-${uviColor}">${"UV Index: " + weatherData.current.uvi}</p>
    </div>`
    forcast.innerHTML = today
    if (weatherData.current.uvi >= 2) {
       uviColor = "success"
    } else if (weatherData.current.uvi >= 3 && weatherData.current.uvi <= 5) {
        uviColor = "warning"
    } else if (weatherData.current.uvi >= 6 && weatherData.current.uvi <= 7) {
        uviColor = "#fd7e14"
    } else if (weatherData.current.uvi <= 12) {
        uviColor = "#danger"
    }
    
    console.log(cityNameEl.value + " " + moment.unix(weatherData.current.dt).format("MM/DD/YYYY"))
    console.log(weatherData.current.temp)
    console.log(weatherData.current.humidity)
    console.log(weatherData.current.uvi)
    console.log(weatherData.current.wind_speed)
    cityNameEl.value = "";
};


var renderWeek = function (weatherData) {
    var week = `<h3 color-info>5-Day Forecast:</h3>
    <div style="${displayStyle}">
        <div class="m-2 p-1 border border-3 border-secondary" style="${weekColor}">
        <h4>${moment.unix(weatherData.daily[1].dt).format("MM/DD/YYYY")}</h4>
        <p>${"Temp: " + weatherData.daily[1].temp.day + "??F"}</p>
        <p>${"Wind Speed: " + weatherData.daily[1].wind_speed + " MPH"}</p>
        <p>${"Humidity: " + weatherData.daily[1].humidity + "%"}</p>
        <p>${"UV Index: " + weatherData.daily[1].uvi}</p>
        </div>
        <div class="m-2 p-1 border border-3 border-secondary" style="${weekColor}">
        <h4>${moment.unix(weatherData.daily[2].dt).format("MM/DD/YYYY")}</h4>
        <p>${"Temp: " + weatherData.daily[2].temp.day + "??F"}</p>
        <p>${"Wind Speed: " + weatherData.daily[2].wind_speed + " MPH"}</p>
        <p>${"Humidity: " + weatherData.daily[2].humidity + "%"}</p>
        <p>${"UV Index: " + weatherData.daily[2].uvi}</p>
        </div>
        <div class="m-2 p-1 border border-3 border-secondary" style="${weekColor}">
        <h4>${moment.unix(weatherData.daily[3].dt).format("MM/DD/YYYY")}</h4>
        <p>${"Temp: " + weatherData.daily[3].temp.day + "??F"}</p>
        <p>${"Wind Speed: " + weatherData.daily[3].wind_speed + " MPH"}</p>
        <p>${"Humidity: " + weatherData.daily[3].humidity + "%"}</p>
        <p>${"UV Index: " + weatherData.daily[3].uvi}</p>
        </div>
        <div class="m-2 p-1 border border-3 border-secondary" style="${weekColor}">
        <h4>${moment.unix(weatherData.daily[4].dt).format("MM/DD/YYYY")}</h4>
        <p>${"Temp: " + weatherData.daily[4].temp.day + "??F"}</p>
        <p>${"Wind Speed: " + weatherData.daily[4].wind_speed + " MPH"}</p>
        <p>${"Humidity: " + weatherData.daily[4].humidity + "%"}</p>
        <p>${"UV Index: " + weatherData.daily[4].uvi}</p>
        </div>
        <div class="m-2 p-1 border border-3 border-secondary" style="${weekColor}">
        <h4>${moment.unix(weatherData.daily[5].dt).format("MM/DD/YYYY")}</h4>
        <p>${"Temp: " + weatherData.daily[5].temp.day + "??F"}</p>
        <p>${"Wind Speed: " + weatherData.daily[5].wind_speed + " MPH"}</p>
        <p>${"Humidity: " + weatherData.daily[5].humidity + "%"}</p>
        <p>${"UV Index: " + weatherData.daily[5].uvi}</p>
        </div>
    </div>`
    fiveDay.innerHTML = week

    console.log(moment.unix(weatherData.daily[1].dt).format("MM/DD/YYYY"))
    console.log(weatherData.daily[1].temp.day)
};

cityInputEl.addEventListener("submit", formSubmitHandler);
searchHistory.addEventListener("click", buttonClickHandler);