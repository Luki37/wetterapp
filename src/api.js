const API_BASE_URL = "http://api.weatherapi.com/v1";
const API_KEY = "f8cec1ed88c94750866161512263009";

export async function getCurrentWeather(location) {
  const response = await fetch(
    `${API_BASE_URL}/current.json?key=${API_KEY}&q=${location}&lang=de`,
  );

  const weatherData = await response.json();

  return weatherData;
}

export async function getForecastWeather(location, days = 3) {
  const response = await fetch(
    `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&lang=de&days=${days}`,
  );

  const ForecastWeatherData = await response.json();

  return ForecastWeatherData;
}
