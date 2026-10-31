import { getCurrentWeather, getForecastWeather } from "./api";
import { renderLoadingScreen } from "./loading";
import { rootElement } from "./main";
import {
  formatHourlyTime,
  formatTemp,
  get24HoursForecastFromNow,
} from "./utils";

export async function loadDetailView(Ort) {
  renderLoadingScreen("Lade Wetter für " + Ort + "...");
  // daten fetchen
  const weatherData = await getForecastWeather(Ort);
  renderDetailView(weatherData);
}

function renderDetailView(weatherData) {
  const { location, current, forecast } = weatherData;
  const currentDay = forecast.forecastday[0];

  rootElement.innerHTML =
    getHeaderHtml(
      location.name,
      formatTemp(current.temp_c),
      current.condition.text,
      formatTemp(currentDay.day.maxtemp_c),
      formatTemp(currentDay.day.mintemp_c),
    ) +
    getTodayForecastHtml(
      currentDay.day.condition.text,
      currentDay.day.maxwind_kph,
      forecast.forecastday,
      current.last_updated_epoch,
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

function getTodayForecastHtml(
  condition,
  maxWind,
  forecasdays,
  lastUpdatedEpoch,
) {
  const hourlyForecastElements = get24HoursForecastFromNow(
    forecasdays,
    lastUpdatedEpoch,
  ).map(
    (hour, i) => `<div class="hourly-forecast">
            <div class="hourly-forecast__time">${i === 0 ? "Jetzt" : formatHourlyTime(hour.time) + " Uhr"}</div>
            <img
              src="https:${hour.condition.icon}"
              alt=""
              class="hourly-forecast__icon"
            />
            <div class="hourly-forecast__temp">${formatTemp(hour.temp_c)}°</div>
          </div>
    `,
  );

  const hourlyForecastHtml = hourlyForecastElements.join("");

  return `
        <div class="today-forecast">
        <div class="today-forecast__conditions">
          Heute ${condition}. Wind bis zu ${maxWind} km/h.
        </div>
        <div class="today-forecast__hours">
          ${hourlyForecastHtml}
        </div>
      </div>`;
}
