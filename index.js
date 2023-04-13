let container = document.querySelector(".container");
let searchBox = document.querySelector(".search-box");
let searchBtn = document.querySelector("#searchBtn");
let weatherBox = document.querySelector(".weather-box");
let error404 = document.querySelector(".not-found");
let weatherDetails = document.querySelector(".weather-details");
let apiKey = "f2059b27504a5d8f76d5e28e63b862a6";
let lat, lon;
let part = "hourly";
getLocation();
// get location me
function getLocation() {
	try {
		navigator.geolocation.getCurrentPosition(ShowPosition);
	} catch {
		return;
	}
}

// get latitude and longitude in location
function ShowPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`)
		.then(response => response.json())
		.then(json => {
			getWeather(json[0].name);
		});
}

// if in click search btn
searchBtn.addEventListener("click", calcWeather);

// if in Enter your Keyboard
document.addEventListener("keydown", function(event) {
	if (event.key == "Enter") {
		calcWeather()
	}
})

// function Calc Weather
function calcWeather() {
	let cityTarget = document.getElementById("locationName").value;
	if (cityTarget.trim() == '') {
		return;
	} else {
		getWeather(cityTarget);
	}
}

// getWeather function
function getWeather(city) {

	weatherBox.classList.remove("fadeIn");
	weatherDetails.classList.remove("fadeIn");
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
		.then(response => response.json())
		.then(json => {
			let imageWeather = document.querySelector(".weather-box img");
			let cityTitle = document.querySelector(".weather-box .cityName");
			let temperature = document.querySelector(".weather-box .temperature");
			let description = document.querySelector(".weather-box .description");
			let humidity = document.querySelector(".weather-details .humidity span");
			let wind = document.querySelector(".weather-details .wind span");
			error404.style.display = "none";
			error404.classList.remove("fadeIn");
			if (json.cod == "404") {
				console.log("error")
				container.style.height = "650px";
				weatherBox.style.display = "none";
				weatherDetails.style.display = "none";
				error404.style.display = "block";
				error404.classList.add("fadeIn");
			} else {
				switch (json.weather[0].main) {
					case 'Clear':
						imageWeather.src = 'images/clear.png';
						break;

					case 'Rain':
						imageWeather.src = 'images/rain.png';
						break;

					case 'Snow':
						imageWeather.src = 'images/snow.png';
						break;

					case 'Clouds':
						imageWeather.src = 'images/cloud.png';
						break;

					case 'Haze':
						imageWeather.src = 'images/mist.png';
						break;

					default:
						imageWeather.src = '';
				}
				cityTitle.innerHTML = city;
				temperature.innerHTML = `${parseInt(json.main.temp)}<span>*C</span>`
				description.innerHTML = json.weather[0].description;
				humidity.innerHTML = `${json.main.humidity}%`;
				wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
				container.style.height = "650px"
				weatherBox.style.display = "";
				weatherBox.classList.add("fadeIn");
				weatherDetails.style.display = "flex";
				weatherDetails.classList.add("fadeIn");
				document.getElementById("locationName").value = "";
			}
		});
}