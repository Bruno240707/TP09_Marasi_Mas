import React, { useContext } from "react";
import "./HourlyForecast.css";
import WeatherContext from "../../WeatherContext";

function HourlyForecast() {
  const { hourlyForecast: forecastData, unit } = useContext(WeatherContext);
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="hourly-forecast">
      {forecastData.map((hour, idx) => {
        const time = hour.dt_txt.split(" ")[1].slice(0, 5);
        const icon = hour.weather?.[0]?.icon;
        return (
          <div key={idx} className="hour-card">
            <div className="time">{time}</div>
            <img className="h-icon" alt="icon" src={`https://openweathermap.org/img/wn/${icon}.png`} />
            <div className="temp">{Math.round(hour.main.temp)}{unit === "metric" ? "°C" : "°F"}</div>
          </div>
        );
      })}
    </div>
  );
}

export default HourlyForecast;
