import axios from "axios";



export function getWeather(lat, lon, timezone){
    return axios.get("https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime",
    {
        params:{
            longitude:lon,
            latitude:lat,
            timezone:timezone,
        
        },
    }
    )
    .then(({ data}) => {
        return{
            current:parseCurrentWeather(data),
            daily:parseDailyWeather(data) ,
        hourly:parseHourlyWeather(data)
        }
        
    })
}


function parseCurrentWeather({current_weather, daily}){

    const{temperature: currentTemp,
            windspeed: wind,
            weathercode : iconCode
            } = current_weather
    const{
        temperature_2m_max:[maxTemp],
        temperature_2m_min:[minTemp],
        apparent_temperature_max:[maxflTemp],
        apparent_temperature_min:[minflTemp],
        precipitation_sum:[prec]

    } = daily

    return{
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        flHighTemp: Math.round(maxflTemp),
        wind : Math.round(wind),
        lowTemp: Math.round(minTemp),
        flLowTemp: Math.round(minflTemp),
        precip: Math.round(prec*100)/100,
        iconCode,
        
    }
}

function parseDailyWeather({daily}){
    return daily.time.map((time,index) => {
        return {
            timestamp : time*1000, //miliseconds
            iconCode: daily.weathercode[index],
            maxTemp : Math.round(daily.apparent_temperature_max[index])
        }
    })
}

function parseHourlyWeather({hourly, current_weather}){
    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode : hourly.weathercode[index],
            temp: Math.round(hourly.temperature_2m[index]),
            feelsLike: Math.round(hourly.apparent_temperature[index]),
            windSpeed: Math.round(hourly.windspeed_10m[index]),
            precip: Math.round(hourly.precipitation[index] * 100)/100,
        }
    }
    ).filter(({ timestamp}) => timestamp >current_weather.time*1000 && timestamp<=js_stamp)
}
