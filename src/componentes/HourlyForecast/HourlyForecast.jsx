import React, { useContext } from "react";
import "./HourlyForecast.css";
import WeatherContext from "../../WeatherContext";
import { roundNearestInt } from "../../utils/numberUtils";

function HourlyForecast() {
  const { hourlyForecast: forecastData, unit } = useContext(WeatherContext);
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="hourly-forecast">
      {forecastData.map((hour, idx) => {
        const rawTime = hour.dt_txt.split(" ")[1].slice(0, 5);
        const [hStr, mStr] = rawTime.split(":");
        const hNum = parseInt(hStr, 10);
        const period = hNum >= 12 ? "PM" : "AM";
        const displayHour = hNum % 12 === 0 ? 12 : hNum % 12;
        const time = `${displayHour.toString().padStart(2, "0")}:${mStr} ${period}`;
        const icon = hour.weather?.[0]?.icon;
        return (
          <div key={idx} className="hour-card">
            <div className="time">{time}</div>
            <img className="h-icon" alt="icon" src={`https://openweathermap.org/img/wn/${icon}.png`} />
            <div className="temp">{roundNearestInt(hour.main.temp)}{unit === "metric" ? "°C" : "°F"}</div>
          </div>
        );
      })}
    </div>
  );
}

export default HourlyForecast;
