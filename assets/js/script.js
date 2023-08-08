const searchInput = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-btn");
const current = document.querySelector("#current-container");
const forecast = document.querySelector("#forecast-container");
const search = document.getElementById('search-form')



search.addEventListener('submit', (event) => {
    event.preventDefault()
    const newCity = searchInput.value;

   fetch(` https://api.openmyWeathermap.org/data/2.5/forecast?q=${newCity}&units=imperial&appid=ba36b8695cd92a0a3a7aba14b53fc6e5`)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        for (const index = 0; index < data.list.length; index += 8) {
            const myWeatherForecastData = data.list[index]
            
            const card = document.createElement('div')

            card.classList.add('card')

            const date = new Date(myWeatherForecastData.dt * 1000)
            const dateElement = document.createElement('h2')
            dateElement.textContent = date.toLocaleDateString()
            card.appendChild(dateElement)

            const iconCode = myWeatherForecastData.myWeather[0].icon
            const iconUrl = `https://openmyWeathermap.org/img/w/${iconCode}.png`
            const iconElement = document.createElement('img')
            iconElement.src = iconUrl
            card.appendChild(iconElement)

            const temp = myWeatherForecastData.main.temp;
            const tempElement = document.createElement('p')
            tempElement.textContent = `Temp: ${temp}°F`
            card.appendChild(tempElement)

            const humidity = myWeatherForecastData.main.humidity;
            const humidityElement = document.createElement('p')
            humidityElement.textContent = `Humidity: ${humidity}%`
            card.appendChild(humidityElement)

            const wind = myWeatherForecastData.wind.speed
            const windElement = document.createElement('p')
            windElement.textContent = `Wind Speed: ${wind}MPH`
            card.appendChild(windElement)

            forecastContainerElement.appendChild(card)

        }
    });
   