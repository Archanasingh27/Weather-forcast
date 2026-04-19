
const apiKey = "c4fccabd443e0ed633b2c253c2f0d7ad";

// ELEMENTS

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorBox = document.getElementById("errorBox");

const dropdownContainer = document.getElementById("dropdownContainer");
const recentCitiesList = document.getElementById("recentCities");

const forecastContainer = document.getElementById("forecastList");
const toggleBtn = document.getElementById("toggleTemp");
const recentBtn = document.getElementById("recentBtn");


let currentTemp = null;
let isCelsius = true;


//  SEARCH FUNCTIONALTY

searchBtn.addEventListener("click", handleSearch);

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

function handleSearch() {
  const city = cityInput.value.trim();

  if (!city) {
    showError("⚠️ Please enter a city");
    return;
  }

  getWeather(city);
  getForecast(city);
  saveCity(city);


  cityInput.value = "";

loadCities();
recentBtn.classList.remove("hidden");
  
}


// fetch weather api

async function getWeather(city) {
  try {
    hideError();

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (data.cod !== 200) {
      showError("City not found");
      return;
    }

    displayWeather(data);

  } catch {
    showError("Network error");
  }
}




