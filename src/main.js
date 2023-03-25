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

const getCurrentCity = async (event) => {
    event.preventDefault();
    initiateForm();
    let cityInput = document.getElementById("cityInput");
    let city = cityInput.value;
    console.log("cityInput.value", cityInput.value);
    let apiKey = "d73ccfe016529fb8f14963c6da96223c";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    await axios.get(apiUrl).then((response) => {
        showCurrentCity(response)
        showCurrentTemp(response)
        console.log(response.data)
        return response.data
    });
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", getCurrentCity);