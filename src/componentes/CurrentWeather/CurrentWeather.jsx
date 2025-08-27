import React, { useContext } from "react";
import "./CurrentWeather.css";
import WeatherContext from "../../WeatherContext";
import { roundNearestInt } from "../../utils/numberUtils";

function CurrentWeather() {
  const { currentWeather: weatherData, unit } = useContext(WeatherContext);
  if (!weatherData) return null;

  const icon = weatherData.weather?.[0]?.icon;
  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "";

  const now = new Date(weatherData.dt * 1000);
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  return (
    <div className="current-weather">
      <div className="cw-header">
        <div className="cw-temp">
          <div className="cw-temp-main">
            {roundNearestInt(weatherData.main.temp)}
            <span className="cw-unit">{unit === "metric" ? "°C" : "°F"}</span>
          </div>
          <div className="cw-city-time">
            <div className="cw-city">{weatherData.name || "Ciudad"}</div>
            <div className="cw-time">{hours}:{minutes}</div>
          </div>
        </div>
        <div className="cw-icon">
          {iconUrl && <img src={iconUrl} alt={weatherData.weather?.[0]?.main || ""} />}
          <div className="cw-desc">{weatherData.weather?.[0]?.main}</div>
        </div>
      </div>
      <div className="cw-metrics">
        <div className="metric">
          <span className="label">Feel like</span>
          <span className="value">{roundNearestInt(weatherData.main.feels_like)}{unit === "metric" ? "°C" : "°F"}</span>
        </div>
        <div className="metric">
          <span className="label">Wind</span>
          <span className="value">{roundNearestInt(weatherData.wind.speed)} {unit === "metric" ? "m/s" : "mph"}</span>
        </div>
        <div className="metric">
          <span className="label">Min/Max</span>
          <span className="value">{roundNearestInt(weatherData.main.temp_min)} / {roundNearestInt(weatherData.main.temp_max)}{unit === "metric" ? "°C" : "°F"}</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
