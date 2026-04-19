#  Weather Forecast Application

##  Project Overview

This project is a **Weather Forecast Web Application** developed using **HTML, Tailwind CSS, and JavaScript**.
It allows users to search for real-time weather information of any city and also view a 5-day forecast.

The application uses the **OpenWeather API** to fetch live weather data and presents it in a clean and modern glassmorphism UI.



##  Features

*  Search weather by city name
*  Detect and display current location weather
*  Display temperature, humidity, wind speed, pressure, and visibility
*  5-day weather forecast with icons
*  Temperature toggle (°C / °F)
*  Error handling for invalid input and API failures
*  Recent searched cities using localStorage
*  Dropdown menu for quick access to recent searches
*  Dynamic UI background based on weather conditions
*  Smooth and responsive glassmorphism design



## Technologies Used

* HTML5
* Tailwind CSS
* JavaScript (Vanilla JS)
* OpenWeather API


## Setup Instructions

1. Clone the repository:

   bash
   git clone https://github.com/your-username/weather-app.git
   

2. Navigate to the project folder:

   bash
   cd weather-app
  

3. Open the project:

   * Simply open `index.html` in your browser

4. Add your API key:
   * Curently i provide my apikey but use own 
   * Go to https://openweathermap.org/
   * Generate your API key
   * Replace it in `script.js`:

    javascript
    const apiKey = "YOUR_API_KEY";

##  How to Use

1. Enter a city name in the search bar
2. Click the search button 
3. View current weather details
4. Right side see the 5-day forecast
5. Click on recent cities from the dropdown for quick access
6. Use the toggle button to switch temperature units


##  Project Structure

weather-app/
│── index.html
│── script.js
│── style.css
│── README.md


##  Notes
* Geolocation permission is needed to fetch current location weather
* Recent searches are stored locally in the browser


##  Conclusion

This project demonstrates practical implementation of API integration, DOM manipulation, and responsive UI design using JavaScript and Tailwind CSS. It also focuses on improving user experience through features like recent searches and dynamic UI updates.

This project helped me understand API integration and UI design better.

## 👩‍💻 Author

Developed by: Archana Singh

## Github repo:
https://github.com/Archanasingh27/Weather-forcast