import React, { useContext } from "react";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import DailyForecast from "../DailyForecast/DailyForecast";
import "./WeatherApp.css";
import WeatherContext from "../../WeatherContext";

function WeatherApp() {
  const {
    unit,
    handleTemperatureUnitChange,
    searchQuery,
    handleSearchQueryChange,
    handleSearch,
    otherCitiesWeather,
    setSelectedCity
  } = useContext(WeatherContext);

  return (
    <div className="weather-app">
      <div className="topbar">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search city..."
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
        <div className="unit-toggle">
          <button
            className={unit === "metric" ? "active" : ""}
            onClick={() => handleTemperatureUnitChange("metric")}
          >
            °C
          </button>
          <button
            className={unit === "imperial" ? "active" : ""}
            onClick={() => handleTemperatureUnitChange("imperial")}
          >
            °F
          </button>
        </div>
      </div>

      <div className="content-grid">
        <div className="left-column">
          <CurrentWeather />

          <div className="other-cities">
            <h3>Other large cities</h3>
            <div className="other-cities-list">
              {otherCitiesWeather.map((c) => (
                <button
                  key={c.query}
                  className="city-card"
                  onClick={() => setSelectedCity(c.query)}
                >
                  <div className="city-info">
                    <span className="city-name">{c.label}</span>
                    <span className="city-desc">{c.description}</span>
                  </div>
                  <div className="city-temp">
                    <img alt="icon" src={`https://openweathermap.org/img/wn/${c.icon}.png`} />
                    <span>{c.temp}{unit === "metric" ? "°C" : "°F"}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="hourly-section">
            <HourlyForecast />
          </div>
          <div className="daily-section">
            <h3>5-day forecast</h3>
            <DailyForecast />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
