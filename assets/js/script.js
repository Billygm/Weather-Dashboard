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
    // setHistory(cityName)
    if (cityName) {
        geoData(cityName);
        console.log(cityName)
        searchedCitys.push(cityName)
        localStorage.setItem("history", JSON.stringify(searchedCitys))
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
    forcast.innerHTML = cityName + moment.unix(weatherData.current.dt).format("MM/DD/YYYY")
    console.log(moment.unix(weatherData.current.dt).format("MM/DD/YYYY"))
    console.log(weatherData.current.temp)
    console.log(weatherData.current.humidity)
    console.log(weatherData.current.uvi)
}

cityInputEl.addEventListener("submit", formSubmitHandler);


// var renderWeek = function () {

// }

// var setHistory = function(city) {
//     if(searchHistory === "") {
//         var historyArray = searchHistory.split(" ")
//     }
//     historyArray.push(city)
//     console.log(historyArray)
//     var historyString = historyArray.join(" ")
//     localStorage.setItem("history", historyString)

// }

// var retrieveHistroy = function() {
//     if (!localStorage.getItem("history")){
//         searchHistory = ""
//     } else {
//         searchHistory = localStorage.getItem("history")
//     }
//     console.log(searchHistory)
// }

// retrieveHistroy()