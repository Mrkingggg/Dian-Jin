import { ICON_MAP } from "./iconmap"
import "./style.css"
import { getWeather } from "./weather"
navigator.geolocation.getCurrentPosition(successPosition, positionErr)

function successPosition({coords}){
    getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather)
    .catch(e => {
        console.error(e),
        alert("Error getting weather")
    })
}

function positionErr(){
    alert("cannot get your current location")
}




function renderWeather({current,daily, hourly}){
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    document.body.classList.remove("blurred")
}
function setValue(selector, value, {prefix = document} = {}){
    prefix.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode){
    return `/icons/${ICON_MAP.get(iconCode)}.svg`
} //js-weather-app/public
const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current){
    currentIcon.src = getIconUrl(current.iconCode),
    document.querySelector("[data-current-temp]").textContent = 
    current.currentTemp,
    document.querySelector("[data-current-high]").textContent = 
    current.highTemp,
    setValue("current-fl-high",current.flHighTemp),
    setValue("current-wind",current.wind),
    setValue("current-low",current.lowTemp),
    setValue("current-fl-low",current.flLowTemp),
    setValue("current-precip",current.precip)
}

const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")
const DAY_FORMATTER = new Intl.DateTimeFormat(undefined,{weekday : "long"})
function renderDailyWeather(daily){
    dailySection.innerHTML = ""
    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        const dailyIcon = element.querySelector("[data-icon]")
        dailyIcon.src = getIconUrl(day.iconCode)

        setValue("temp",day.maxTemp,{prefix: element})
        setValue("date",DAY_FORMATTER.format(day.timestamp) , {prefix: element})
        dailySection.append(element)
    })
}

    
const hourlySection = document.querySelector("[data-hour-section]")
const hourCardTemp = document.getElementById("hour-row")
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {hour: "numeric"})
function renderHourlyWeather(hourly){
    hourlySection.innerHTML = ""
    hourly.forEach(hour => {
        const element = hourCardTemp.content.cloneNode(true)
        const hourIcon = element.querySelector("[data-icon]")
        hourIcon.src = getIconUrl(hour.iconCode)
        setValue("temp",hour.temp,{prefix: element})
        setValue("wind",hour.windSpeed,{prefix: element})
        setValue("fl-temp",hour.feelsLike,{prefix: element})
        setValue("precip",hour.precip,{prefix: element})
        setValue("time", HOUR_FORMATTER.format(hour.timestamp), {prefix: element})
        setValue("day", DAY_FORMATTER.format(hour.timestamp), {prefix: element})
        hourlySection.append(element)
    })
}