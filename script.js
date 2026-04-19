
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
