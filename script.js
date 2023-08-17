const tempField = document.querySelector(".temperature");
const locationField = document.querySelector(".location");
const dateandTimeField = document.querySelector(".time");
const conditionField = document.querySelector(".weather-description");
const searchField = document.querySelector(".search-area");
const form = document.querySelector('form');
const fahrenheitBtn = document.querySelector(".fahrenheit-btn");
const celsiusBtn = document.querySelector(".celsius-btn");

fahrenheitBtn.addEventListener("click", () => {
    updateTemperatureUnits("F");
});

celsiusBtn.addEventListener("click", () => {
    updateTemperatureUnits("C");
});

function updateTemperatureUnits(unit) {
    const tempC = parseFloat(tempField.dataset.tempC);
    const tempF = parseFloat(tempField.dataset.tempF);
    
    if (unit === "C") {
        tempField.innerHTML = `${tempC.toFixed(2)}°C`;
    } else if (unit === "F") {
        tempField.innerHTML = `${tempF.toFixed(2)}°F`;
    }
}

function getWeatherIconClass(iconCode) {
    switch (true) {
        case iconCode.includes("01"):
            return "fas fa-sun weather-icon weather-sunny";
        case iconCode.includes("02"):
            return "fas fa-cloud weather-icon weather-cloudy";
        case iconCode.includes("03"):
        case iconCode.includes("04"):
            return "fas fa-cloud weather-icon weather-cloudy";
        case iconCode.includes("09"):
        case iconCode.includes("10"):
            return "fas fa-cloud-rain weather-icon weather-rainy";
        case iconCode.includes("11"):
            return "fas fa-bolt weather-icon weather-stormy";
        default:
            return "fas fa-question-circle weather-icon";
    }
}

function getBackgroundColor(iconCode) {
    switch (true) {
        case iconCode.includes("01"):
            return "weather-sunny";
        case iconCode.includes("02"):
        case iconCode.includes("03"):
        case iconCode.includes("04"):
            return "weather-cloudy";
        case iconCode.includes("09"):
        case iconCode.includes("10"):
            return "weather-rainy";
        case iconCode.includes("11"):
            return "weather-stormy";
        default:
            return "weather-sunny";
    }
}

form.addEventListener('submit', searchForLocation);

let target = '';

const getResults = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=de70283a75ff48e5a68162855231708&q=${targetLocation}&aqi=no`;

    const response = await fetch(url);
    const data = await response.json();

    let locationName = data.location.name;
    let time = data.location.localtime;
    let condition = data.current.condition.text;
    let tempC = data.current.temp_c;
    let tempF = data.current.temp_f;
    let iconCode = data.current.condition.icon;

    updateDetails(tempC, tempF, locationName, time, condition, iconCode);
}

function updateDetails(tempC, tempF, locationName, time, condition, iconCode) {
    tempField.innerHTML = `${tempC.toFixed(2)}°C`;
    tempField.dataset.tempC = tempC;
    tempField.dataset.tempF = tempF;
    
    locationField.innerHTML = locationName;
    dateandTimeField.innerHTML = time;
    conditionField.innerHTML = condition;

    const weatherIconClass = getWeatherIconClass(iconCode);
    document.querySelector(".weather-icon").className = weatherIconClass;
    
    const bgColorClass = getBackgroundColor(iconCode);
    document.body.classList = "";
    document.body.classList.add(bgColorClass);
}

function searchForLocation(e) {
    e.preventDefault();

    target = searchField.value;

    getResults(target);
}

getResults(target);
