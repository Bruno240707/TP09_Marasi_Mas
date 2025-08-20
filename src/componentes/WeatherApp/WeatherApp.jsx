import React, { useState, useEffect } from "react";
import api from "../../services/api";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import DailyForecast from "../DailyForecast/DailyForecast";
import "./WeatherApp.css";

function WeatherApp() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Buenos Aires"); // ciudad por defecto
  const [searchQuery, setSearchQuery] = useState("");
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!selectedCity) return;

        const res = await api.get("forecast", {
          params: { q: selectedCity, units: unit }
        });

        // ✅ usamos el nombre real de la ciudad de la API
        setCurrentWeather({ ...res.data.list[0], name: res.data.city.name });

        // pronóstico horario (próximas 8 horas)
        setHourlyForecast(res.data.list.slice(0, 8));

        // pronóstico diario
        const daily = {};
        res.data.list.forEach(item => {
          const date = item.dt_txt.split(" ")[0];
          if (!daily[date]) daily[date] = [];
          daily[date].push(item);
        });
        setDailyForecast(Object.values(daily));

      } catch (error) {
        console.error("Error al traer los datos del clima:", error);
      }
    };

    fetchWeatherData();
  }, [selectedCity, unit]);

  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") setSelectedCity(searchQuery);
  };

  const handleTemperatureUnitChange = (unit) => setUnit(unit);

  return (
    <div className="weather-app">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Buscar ciudad..."
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className="unit-toggle">
        <button onClick={() => handleTemperatureUnitChange("metric")}>°C</button>
        <button onClick={() => handleTemperatureUnitChange("imperial")}>°F</button>
      </div>

      <CurrentWeather weatherData={currentWeather} unit={unit} />

      <HourlyForecast forecastData={hourlyForecast} unit={unit} />

      <DailyForecast forecastData={dailyForecast} unit={unit} />
    </div>
  );
}

export default WeatherApp;
