const apiKey = "caccdfa6538c6278bff0bd734e4dfc29";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();
    console.log(data);
    document.querySelector('.in-card').style.display = 'block';
    document.querySelector(".city").innerHTML = data.name;
    const temperatureCelsius = Math.round(data.main.temp - 273.15);
    document.querySelector(".temp").innerHTML = `${temperatureCelsius}°C`;
    document.querySelector(".feels").innerHTML=`Feels like ${Math.round(data.main.feels_like - 273.15)} °C`;
    document.querySelector(".humidity").innerText = `${data.main.humidity} %`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
document.querySelector('.in-card').style.display = 'none';
