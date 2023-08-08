var searchInput = document.querySelector(".search-bar");
var searchButton = document.querySelector(".search-btn");
var myCurrentElement = document.querySelector("#current-container");
var myForecastElement = document.querySelector("#forecast-container");
var searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  var city = searchInput.value;

  fetch(
    ` https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=ba36b8695cd92a0a3a7aba14b53fc6e5`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      for (let index = 0; index < data.list.length; index += 8) {
        const myForecastData = data.list[index];

        const card = document.createElement("div");

        card.classList.add("card");

        const myDate = new Date(myForecastData.dt * 1000);
        const myDateElement = document.createElement("h2");
        myDateElement.textContent = myDate.toLocaleDateString();
        card.appendChild(myDateElement);

        const iconCode = myForecastData.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        const iconElement = document.createElement("img");
        iconElement.src = iconUrl;
        card.appendChild(iconElement);

        const myTemp = myForecastData.main.temp;
        const myTempElement = document.createElement("p");
        myTempElement.textContent = `Temp: ${myTemp}°F`;
        card.appendChild(myTempElement);

        const myHumidity = myForecastData.main.humidity;
        const myHumidityElement = document.createElement("p");
        myHumidityElement.textContent = `Humidity: ${myHumidity}%`;
        card.appendChild(myHumidityElement);

        const myWind = myForecastData.wind.speed;
        const myWindElement = document.createElement("p");
        myWindElement.textContent = `Wind speed: ${myWind}MPH`;
        card.appendChild(myWindElement);

        myForecastElement.appendChild(card);
      }
    })
    .catch((err) => {
      console.error(err);
      myForecastElement.textContent = "Please enter a city";
    });
});

const myWeather = {
  apiKey: "ba36b8695cd92a0a3a7aba14b53fc6e5",
  weatherFetch: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.weatherDisplay(data));
  },
  weatherDisplay: function (data) {
    myForecastElement.innerHTML = "";
    const { name } = data;
    const { icon, description } = data.myWeather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    const currentDay = dayjs().format("(MMMM D, YYYY)");

    document.querySelector(".city").innerText = name + "" + currentDay;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/w/" + icon + ".png";
    document.querySelector(".myDescription").innerText = description;
    document.querySelector(".myTemp").innerText = temp + "°F";
    document.querySelector(".myHumidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".myWind").innerText = "Wind Speed: " + speed + "mph";

    saved.push(name);

    localStorage.setItem("history", JSON.stringify(saved));
    listBuilder(name);
    searchInput.value = "";
  },
  search: function () {
    this.weatherFetch(document.querySelector(".search-bar").value);
  },
};
const history = document.getElementById("history");
const saved = localStorage.getItem("history")
  ? JSON.parse(localStorage.getItem("history"))
  : [];
const listBuilder = (text) => {
  const histories = document.createElement("li");
  histories.innerText = text;
  history.appendChild(histories);
};

document.querySelector(".search-btn").addEventListener("click", function () {
  $("myForecastElement").hide;
  myWeather.search();
});
