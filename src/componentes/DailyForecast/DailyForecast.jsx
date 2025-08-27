import React, { useContext } from "react";
import "./DailyForecast.css";
import WeatherContext from "../../WeatherContext";
import { minArray, maxArray, ensureAtLeast, roundNearestInt } from "../../utils/numberUtils";

const daysEs = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

function DailyForecast() {
  const { dailyForecast: forecastData, unit } = useContext(WeatherContext);
  if (!forecastData || forecastData.length === 0) return null;

  const cincoDias = forecastData.slice(0, 5);
  const allTemps = cincoDias.flatMap((dia) => dia.map((i) => i.main.temp));
  const globalMin = minArray(allTemps);
  const globalMax = maxArray(allTemps);
  const globalRange = ensureAtLeast(globalMax - globalMin, 1);

  return (
    <div className="daily-forecast">
      {cincoDias.map((day, idx) => {
        const temps = day.map((i) => i.main.temp);
        const minTemp = minArray(temps);
        const maxTemp = maxArray(temps);
        const icon = day[0].weather?.[0]?.icon;
        const dateObj = new Date(day[0].dt * 1000);
        const dayName = daysEs[dateObj.getDay()];

        const leftPercent = ((minTemp - globalMin) / globalRange) * 100;
        const widthPercent = ((maxTemp - minTemp) / globalRange) * 100;

        return (
          <div key={idx} className="day-row">
            <div className="day-cell name">{idx === 0 ? "Hoy" : dayName}</div>
            <div className="day-cell icon"><img alt="icon" src={`https://openweathermap.org/img/wn/${icon}.png`} /></div>
            <div className="day-cell bar">
              <div className="temp-bar">
                <div className="fill" style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }} />
              </div>
            </div>
            <div className="day-cell temps">
              <span className="min">{roundNearestInt(minTemp)}{unit === "metric" ? "°C" : "°F"}</span>
              <span className="max">{roundNearestInt(maxTemp)}{unit === "metric" ? "°C" : "°F"}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DailyForecast;
