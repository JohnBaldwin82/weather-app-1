const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton")
var error = document.querySelector(".error");



const getData = async (e) => {
	e.preventDefault();

	var cityName = searchBox.value;
	var keyApi = '95fef12a7e5ba86e8bd447ce17b2744c';
	var content = document.getElementById('display-box');



	if(cityName == ""){
		error.innerText = " Enter city Name ";
	}
	else{
		try{
			const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keyApi}`;
			const fetchData = await fetch(url);
			const jsonData = await fetchData.json();

			content.innerHTML = `
				<div class="displayWeather">
					<h1>${jsonData.name},${jsonData.sys.country} </h1>
					<span class="lead" id="date"></span>
					<div class="temperature">
						<h1>${jsonData.main.temp}&deg; C</h1>
						<img src="${jsonData.current.condition.icon}" width="50" height="50">
					</div>
				</div>
				<div class="bottom">
					<div class="row">
						<div class="col-md-6 col-12 ">
							<h4>Humidity : ${jsonData.main.humidity}</h4>
								<h4>Wind Kph : ${jsonData.wind}</h4>																	
						</div>
						<div class="col-md-6 col-12 text-left">		
										
						</div>
					</div>
				</div>
			`;

			error.innerText = "";


		}catch{
			error.innerText = " ** Please Enter Valid City Name ";
			content.innerHTML = "";
		}
	}
}

searchButton.addEventListener("onClick",getData);