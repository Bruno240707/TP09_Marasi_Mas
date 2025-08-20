import React from "react";
import "./HourlyForecast.css";

function HourlyForecast({ forecastData, unit }) {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="hourly-forecast">
      {forecastData.map((hour, idx) => (
        <div key={idx} className="hour-card">
          <p className="time">{hour.dt_txt.split(" ")[1].slice(0, 5)}</p>
          <p className="description">{hour.weather[0].description}</p>
          <p className="temp">
            🌡️ {hour.main.temp} {unit === "metric" ? "°C" : "°F"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default HourlyForecast;
