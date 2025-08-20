import React from "react";
import "./CurrentWeather.css"; // CSS separado

function CurrentWeather({ weatherData, unit }) {
  if (!weatherData) return null;

  return (
    <div className="current-weather">
      <h2>{weatherData.name || "Ciudad"}</h2>
      <p className="description">{weatherData.weather[0].description}</p>
      <p className="temp">
        🌡️ {weatherData.main.temp} {unit === "metric" ? "°C" : "°F"}
      </p>
      <p>💧 Humedad: {weatherData.main.humidity}%</p>
      <p>
        💨 Viento: {weatherData.wind.speed} {unit === "metric" ? "m/s" : "mph"}
      </p>
    </div>
  );
}

export default CurrentWeather;
