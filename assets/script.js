var searchColumnEl = document.querySelector("#search-column");
var citiesListContainerBtnEl = document.querySelector(".list-group-item");
var dailyWeatherContainerEl = document.querySelector("#weather-container"); 


// Find the city form
var seachEventHandlerEl = document.querySelector("#city-search-form");
var searchByCityEl = document.querySelector("#city-search");


function fetchSecondCall(searchByCity, latNum, lonNum, currentDateTime, currentDayIcon, currTempF, currentHumidity, currentMPS, mphWindSpeed) {

    // Input API URL
    var openWeatherApiFiveDayUrl =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + latNum + "&lon=" + lonNum + "&appid=32a27c42260b02de3ba5e1466def4861&units=imperial"
    
    fetch(
        openWeatherApiFiveDayUrl
    )
    .then(function (response) {
      return response.json();
    })
    .then(function (secondCallData) {
        // Current Day
        // UV info
        var uvIndex = secondCallData.current.uvi;

        var unix_timestamp = currentDateTime;
        var date = new Date(unix_timestamp * 1000);
        // date
        var fullDayDaily = "(" + (date.getMonth() + 1) + "/" + date.getDate() + "/"  + date.getFullYear() + ")";
                
        // Populate current day data
        populateCurrentDayHtml(searchByCity, fullDayDaily, currentDayIcon, currTempF, currentHumidity, currentMPS, mphWindSpeed, uvIndex);

        // Populate 5 day forcast
        populate5DayForecast(secondCallData);
    });
};
