import { getCurrentWeather, getForecastWeather } from "./api";
import { renderLoadingScreen } from "./loading";
import { rootElement } from "./main";
import { formatTemp } from "./utils";

export async function loadDetailView(Ort) {
  renderLoadingScreen("Lade Wetter für " + Ort + "...");
  // daten fetchen
  const weatherData = await getForecastWeather(Ort);
  renderDetailView(weatherData);
}

function renderDetailView(weatherData) {
  const { location, current, forecast } = weatherData;
  const currentDay = forecast.forecastday[0];

  rootElement.innerHTML = getHeaderHtml(
    location.name,
    formatTemp(current.temp_c),
    current.condition.text,
    formatTemp(currentDay.day.maxtemp_c),
    formatTemp(currentDay.day.mintemp_c),
  );
}

function getHeaderHtml(location, currentTemp, contition, maxTemp, minTemp) {
  return `
        <div class="current-weather">
        <h2 class="current-weather__location">${location}</h2>
        <h1 class="current-weather__current-temperature">${currentTemp}°</h1>
        <p class="current-weather__condition">${contition}</p>
        <div class="current-weather__day-temperatures">
          <span class="current-weather__max-temperatur">H: ${maxTemp}°</span>
          <span class="current-weather__min-temperatur">T: ${minTemp}°</span>
        </div>
      </div>`;
}
