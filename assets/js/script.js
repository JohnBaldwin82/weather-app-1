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

        for (let index = 0; index < data.list.length; index += 8) {
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
    })
    .catch(err => {
        console.error(err)
        forecastContainerElement.textContent = 'Please enter a New City'
    })
})


const myWeather = {
    "apiKey": "ba36b8695cd92a0a3a7aba14b53fc6e5",
    fetchmyWeather: function(newCity) {
        fetch("https://api.openmyWeathermap.org/data/2.5/myWeather?q=" + newCity + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displaymyWeather(data));
    },
    displaymyWeather: function(data) {
        forecastContainerElement.innerHTML = "";
        const { name } = data;
        const { icon , description } = data.myWeather[0]
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
    
        const today = dayjs().format('(M/DD/YYYY)');
        
        document.querySelector(".newCity").innerText = name + "" + today;
        document.querySelector(".icon").src ="https://openmyWeathermap.org/img/w/" + icon + ".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "mph";
        
        saved.push(name);

        localStorage.setItem("history", JSON.stringify(saved));
        listBuilder(name);
        searchInput.value = "";
        
    },
    search: function () {
        this.fetchmyWeather(document.querySelector(".search-bar").value);
        
    },
    
}
const weatherHistory = document.getElementById("history")
let saved = localStorage.getItem("history")
?JSON.parse(localStorage.getItem("history"))
: [];
const MyList = (text) => {
    const myHistories = document.createElement("li");
    myHistories.innerText = text;
    history.appendChild(myHistories);
    
}

document.querySelector(".search-btn").addEventListener("click", function() {
    
    $("forecastContainerElement").hide
    myWeather.search();
   
});