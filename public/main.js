const weatherDisplay = document.querySelector('.weather')
const weatherForm = document.querySelector('#weather-form')
const cityInput = document.querySelector('#city-input')

// Fetch weather data from API
const fetchWeather = async (city) => {
  const url = `/api?city=${city}`
  
  const res = await fetch(url)
  const data = await res.json()

  if (data.cod === '404') {
    alert('City not found')
    return
  }

  const displayData = {
    city: data.name,
    tempFahrenheit: kelvinToFahrenheit(data.main.temp),
    tempCelsius: kelvinToCelsius(data.main.temp),
    description:data.weather[0].description,
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  }

  addWeatherToDOM(displayData)
}

// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <div class="show-temp">
      <h2>${data.tempFahrenheit} &deg;F</h2>
      <h2>${data.tempCelsius} &deg;C</h2>
    </div>
    <h2>${data.description}</h2>
    <img src=${data.icon} alt="weather icon">
  `
  cityInput.value = ''
}

// Convert Kelvin to Fahrenheit
const kelvinToFahrenheit = (temp) => {
  return Math.ceil(((temp - 273.15) * 9) / 5 + 32)
}

// Convert Kelvin to Celsius
const kelvinToCelsius = (temp) => {
  return Math.ceil(temp - 273.15);
}

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (cityInput.value === '') {
    alert('Please enter a city')
  } else {
    // alert(cityInput.value);
    fetchWeather(cityInput.value)
  }
})

// Initial fetch
fetchWeather('erbil')
