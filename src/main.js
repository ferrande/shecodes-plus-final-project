const initiateForm = () => {
    let now = new Date();
    now.getDate();

    let weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let weekDay = weekDays[now.getDay()];
    let currentDay = document.querySelector("#currentDay");
    currentDay.innerHTML = weekDay;

    let currentHour = now.getHours();
    let hour = document.querySelector("#currentHour");
    if (parseInt(currentHour) < 10) {
        currentHour = `0${currentHour}`
    }
    hour.innerHTML = currentHour;

    let currentMinutes = now.getMinutes();
    let minutes = document.querySelector("#currentMinutes")
    if (parseInt(currentMinutes) < 10) {
        currentMinutes = `0${currentMinutes}`
    }
    minutes.innerHTML = currentMinutes;
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

const getCurrentCity = async (event) => {
    event.preventDefault();
    initiateForm();
    let cityInput = document.getElementById("cityInput");
    let city = cityInput.value;

    let apiKey = "d73ccfe016529fb8f14963c6da96223c";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    await axios.get(apiUrl).then((response) => {
        showCurrentCity(response);
        showCurrentTemp(response);
        showCurrentDescription(response);
        showCurrentHumidity(response);
        showCurrentWind(response);
    });
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", getCurrentCity);