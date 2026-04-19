
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


//  DISPLAY WEATHER

function displayWeather(data) {
  currentTemp = data.main.temp;

  document.getElementById("cityName").innerText = data.name;

  document.getElementById("temp").innerText =
    `${currentTemp.toFixed(1)}°C`;

  document.getElementById("condition").innerText =
    data.weather[0].description;

  document.getElementById("high").innerText = data.main.temp_max;
  document.getElementById("low").innerText = data.main.temp_min;
  document.getElementById("feels").innerText = data.main.feels_like;

  document.getElementById("wind").innerText = `${data.wind.speed} km/h`;
  document.getElementById("humidity").innerText = `${data.main.humidity}%`;
  document.getElementById("pressure").innerText = `${data.main.pressure} hPa`;
  document.getElementById("visibility").innerText = `${data.visibility / 1000} km`;

  // EXTREME TEMP ALERT
  if (data.main.temp > 40) {
    showError(" Extreme heat alert! Stay hydrated");
  }

  // ICON
  const icon = data.weather[0].icon;
  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${icon}@4x.png`;


    //  DYNAMIC BACKGROUND
  const condition = data.weather[0].main.toLowerCase();

  if (condition.includes("rain")) {
    document.body.style.background =
      "linear-gradient(180deg, #4e54c8, #8f94fb)";
  } else if (condition.includes("clear")) {
    document.body.style.background =
      "linear-gradient(180deg, #f7971e, #ffd200)";
  } else if (condition.includes("cloud")) {
    document.body.style.background =
      "linear-gradient(180deg, #757f9a, #d7dde8)";
  }
  
}

// 5-days forecast functionality

async function getForecast(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (!data.list) {
      showError("Forecast not available");
      return;
    }

    displayForecast(data.list);

  } catch {
    showError("⚠️ Forecast error");
  }
}

function displayForecast(list) {
  forecastContainer.innerHTML = "";

  for (let i = 0; i < list.length; i += 8) {
    const item = list[i];

    const icon = item.weather[0].icon;

    const div = document.createElement("div");
    div.className = "flex justify-between items-center glass p-3";

    div.innerHTML = `
      <div>
        <p class="text-sm">
          ${new Date(item.dt_txt).toDateString().slice(0, 10)}
        </p>
        <p class="text-xs opacity-70">
          ${item.weather[0].main}
        </p>
      </div>

      <img 
        src="https://openweathermap.org/img/wn/${icon}@2x.png"
        class="w-10 h-10"
      />

      <p class="text-lg font-semibold">
        ${item.main.temp.toFixed(1)}°
      </p>
    `;

    forecastContainer.appendChild(div);
  }
}


//toggle temp button

toggleBtn.addEventListener("click", () => {
  if (currentTemp === null) return;

  isCelsius = !isCelsius;

  let temp = isCelsius
    ? currentTemp
    : (currentTemp * 9 / 5) + 32;

  document.getElementById("temp").innerText =
    `${temp.toFixed(1)}°${isCelsius ? "C" : "F"}`;

  toggleBtn.innerText = isCelsius
    ? "Switch to °F"
    : "Switch to °C";
});

// Error handle 
function showError(msg) {
  errorBox.innerText = msg;
  errorBox.classList.remove("hidden");
}

function hideError() {
  errorBox.classList.add("hidden");
}



// dropdown functionality
function saveCity(city) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  if (!cities.includes(city)) {
    cities.unshift(city);
    localStorage.setItem("cities", JSON.stringify(cities.slice(0, 5)));
  }

  loadCities();
}

function loadCities() {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  if (!recentCitiesList) return;
   
  if (cities.length === 0) {
    dropdownContainer.classList.add("hidden");
    recentBtn.classList.add("hidden");   
    return;
  }

  recentBtn.classList.remove("hidden"); 

  recentCitiesList.innerHTML = "";

  cities.forEach(city => {
    const li = document.createElement("li");

    li.className = "p-2 hover:bg-white/20 cursor-pointer";
    li.innerText = city;

    li.addEventListener("click", () => {
      cityInput.value = city;
      getWeather(city);
      getForecast(city);
      dropdownContainer.classList.add("hidden");
    });

    recentCitiesList.appendChild(li);
  });
}

recentBtn.addEventListener("click", () => {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  if (cities.length === 0) return;
    loadCities();
  dropdownContainer.classList.toggle("hidden");
});

//show
cityInput.addEventListener("focus", loadCities);

//hide
document.addEventListener("click", (e) => {
  if (
  !e.target.closest("#cityInput") &&
  !e.target.closest("#dropdownContainer") &&
  !e.target.closest("#recentBtn")
) {
  dropdownContainer.classList.add("hidden");
  }
});



// geolocation

navigator.geolocation.getCurrentPosition(async (pos) => {
  const { latitude, longitude } = pos.coords;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  );

  const data = await res.json();

  displayWeather(data);
  getForecast(data.name);
});

// INIT
loadCities();