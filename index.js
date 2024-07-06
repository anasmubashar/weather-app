import ApiKey from './data.js';
const date = new Date()
const hours = date.getHours().toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const year = date.getFullYear()
const currentDate = `${day}/${month}/${year}`

let weather = null;
let city = null;
document.getElementById('city_submit').addEventListener('click', async () => {
    city = document.getElementById('city').value
    weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`)
    .then(response => response.json())
    .then(data => {
    console.log(data)
    const { main, name, sys, weather } = data
    const temp = Math.round(main.temp - 273.15)
    const weatherDescription = weather[0].description
    const country = sys.country
    const city = name
    const weatherData = {
        temp,
        weatherDescription,
        country,
        city
    }
    return weatherData
})
document.getElementById("weather_data").innerHTML = `
<div class="bg-white bg-opacity-50 p-6 rounded-md">
<h2 class="font-mono text-sm">${currentDate}</h2>
<h1 class="font-mono text-sm">${hours}:${minutes}</h1>
<h3 class="font-semibold text-lg font-mono">${weather.city}, ${weather.country}</h3>
<h4 class="font-semibold text-sm font-mono">${weather.temp}°C</h4>
<h5 class="font-semibold font-mono">${weather.weatherDescription}</h5>
</div>`;
})


// document.getElementById("weather_data").appendChild(document.createElement('h1').appendChild(document.createTextNode(`${hours}:${minutes}`)));


