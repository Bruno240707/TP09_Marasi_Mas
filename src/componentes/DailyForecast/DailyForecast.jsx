import React from "react";
import "./DailyForecast.css";

function DailyForecast({ forecastData, unit }) {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="daily-forecast">
      {forecastData.map((day, idx) => {
        const temps = day.map(i => i.main.temp);
        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);
        const description = day[0].weather[0].description;
        const date = day[0].dt_txt.split(" ")[0];

        return (
          <div key={idx} className="day-card">
            <p className="date">{date}</p>
            <p className="description">{description}</p>
            <p className="temp">
              Min: {minTemp} {unit === "metric" ? "°C" : "°F"}
            </p>
            <p className="temp">
              Max: {maxTemp} {unit === "metric" ? "°C" : "°F"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DailyForecast;
