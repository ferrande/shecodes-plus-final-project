const initiateForm = () => {
    let now = new Date();
    let hours = now.getHours();
    if (parseInt(hours) < 10) {
        hours = `0${hours}`
    }
    let minutes = now.getMinutes();
    if (parseInt(minutes) < 10) {
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
        showCurrentDay(response);
        showCurrentIcon(response);
    });
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", getCurrentCity);