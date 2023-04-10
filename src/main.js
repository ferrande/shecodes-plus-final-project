const initiateForm = () => {
    let now = new Date();
    let hours = now.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let day = days[now.getDay()];
    return `${day} ${hours}:${minutes}`;
}

const showCurrentCity = (response) => {
    const currentCity = document.querySelector("#currentCity");
    currentCity.innerHTML = response.data.name;
}

const showCurrentTemp = (response) => {
    const currentTemp = document.querySelector("#weatherNumber");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
}

const showCurrentDescription = (response) => {
    const currentDescription = document.querySelector("#currentWeatherDescription");
    currentDescription.innerHTML = response.data.weather[0].description;
}

const showCurrentWind = (response) => {
    const currentWind = document.querySelector("#wind");
    currentWind.innerHTML = Math.round(response.data.wind.speed);
}

const showCurrentHumidity = (response) => {
    const currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML = response.data.main.humidity;
}

const showCurrentDay = (response) => {
    const dateElement = document.querySelector("#currentDate")
    dateElement.innerHTML = initiateForm(response.data.dt * 1000);
}

const showCurrentIcon = (response) => {
    let icon = document.querySelector("#icon")
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    icon.setAttribute("alt", response.data.weather[0].description);
}

const formatDay = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    return days[day];
}

const showForecast = async (response) => {
    console.log(response)
    let forecastResponse = await getForecast(response.data.coord).data.daily;
    console.log(forecastResponse)
    let forecast = document.querySelector("#forecast");

    let fiveDayForecast = `<div class="row">`;
    forecastResponse.forEach(function (forecastDay, index) {
        if (index < 5) {
            fiveDayForecast +=
                `
            <p class="five-day-forecast col">
            ${formatDay(forecastDay.dt)}<br /><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" /><br /><span class="lowest-temperature">${Math.round(forecastDay.temp.min)}º</span>
            <span class="highest-temperature">${Math.round(forecastDay.temp.max)}º</span>
          </p>`;
        }
    });

    fiveDayForecast = fiveDayForecast + `</div>`;
    forecast.innerHTML = fiveDayForecast;
}

const getForecast = async (coordinates) => {
    console.log(coordinates);
    const apiKey = "be60748992fab0f5da8162563fb21245";
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showForecast);
};

const getCurrentCity = async (event) => {
    event.preventDefault();
    initiateForm();
    let cityInput = document.getElementById("cityInput");
    let city = cityInput.value;
    const apiKey = "d73ccfe016529fb8f14963c6da96223c";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    await axios.get(apiUrl).then((response) => {
        showCurrentCity(response);
        showCurrentTemp(response);
        showCurrentDescription(response);
        showCurrentHumidity(response);
        showCurrentWind(response);
        showCurrentDay(response);
        showCurrentIcon(response);
        showForecast(response);

        let celsiusSymbol = document.querySelector("span#celsius");
        let fahrenheitSymbol = document.querySelector("span#fahrenheit")
        let celsius = document.querySelector("#celsius");
        let fahrenheit = document.querySelector("#fahrenheit");
        let temp = document.querySelector("#weatherNumber");

        function changeToCelsius() {
            temp.innerHTML = Math.round(response.data.main.temp);
            celsius.classList.add("metric-active")
            fahrenheit.classList.remove("metric-active")
        }
        celsiusSymbol.addEventListener("click", changeToCelsius);

        function changeToFahrenheit() {
            temp.innerHTML = Math.round((`${response.data.main.temp}` * 9) / 5 + 32);
            celsius.classList.remove("metric-active")
            fahrenheit.classList.add("metric-active")
        }
        fahrenheitSymbol.addEventListener("click", changeToFahrenheit);
    });

    getForecast(response.data.coord);
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", getCurrentCity);


