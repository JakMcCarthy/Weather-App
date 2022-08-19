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

// Function to populate current day forecast
function populateCurrentDayHtml(searchByCity, fullDayDaily, currentDayIcon, currTempF, currentHumidity, currentMPS, mphWindSpeed, uvIndex) {
    var dailyForecastContainerEl = document.createElement("div");
    dailyForecastContainerEl.setAttribute("id", "daily-forecast-container");
    dailyForecastContainerEl.classList = "borderDiv";

    var currentDayTitle = document.createElement("h3");
    currentDayTitle.textContent = ( searchByCity.charAt(0).toUpperCase() + searchByCity.slice(1) + " " + fullDayDaily);

    var currentIconEl = document.createElement("span")
    var currentIconSymbol = "http://openweathermap.org/img/wn/" + currentDayIcon + "@2x.png";
    currentIconEl.innerHTML = "<img src=" + currentIconSymbol + "></img>";
    currentDayTitle.append(currentIconEl);

    // today's weather - create elements to hold info
    var currentTempEl = document.createElement("p");
    var currentHumidityEl = document.createElement("p");
    var currentWinSpEl = document.createElement("p");
    var currentUvIEl = document.createElement("p");
    currentUvIEl.classList.add("UV-el");

    // add text
    currentTempEl.textContent = "Temperature: " + (currTempF.toFixed(1)) + " °F";
    currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
    currentWinSpEl.textContent = "Wind Speed: " + currentMPS + " MPH";
    currentUvIEl.textContent = "UV Index: " + uvIndex;

    // change uv color 
    if (uvIndex < 3) {
        currentUvIEl.classList.add("low");
    }
    else if ((uvIndex > 6) && (uvIndex < 9)) {
        currentUvIEl.classList.add("high");
    }
    else if (uvIndex >= 9) {
        currentUvIEl.classList.add("really-bad");
    }
    else {
        currentUvIEl.classList.add("med");
    }
    
    

    $("#daily-forecast-container").remove();

    // add to document
    dailyWeatherContainerEl.appendChild(dailyForecastContainerEl);
    dailyForecastContainerEl.appendChild(currentDayTitle);
    dailyForecastContainerEl.appendChild(currentTempEl);
    dailyForecastContainerEl.appendChild(currentHumidityEl);
    dailyForecastContainerEl.appendChild(currentWinSpEl);
    dailyForecastContainerEl.appendChild(currentUvIEl);
};
