// WeatherApp

import React, { useState, useEffect } from "react";
import api from "../../services/api";

function WeatherApp() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [unit, setUnit] = useState("metric")

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!selectedCity) return;
  
        const res = await api.get("forecast", {
          params: { q: selectedCity, units: unit }
        });
  
        setCurrentWeather(res.data.list[0]);
  
        setHourlyForecast(res.data.list.slice(0, 8));
  
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

  const handleCitySearch = (city) => {
    setSelectedCity(city)
  };

  const handleTemperatureUnitChange = (unit) => {
    setUnit(unit)
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
        setSelectedCity(searchQuery);
    }
  };

  return (
    <div className="weather-app">{/* Render weather app components */}</div>
  );
}

export default WeatherApp;