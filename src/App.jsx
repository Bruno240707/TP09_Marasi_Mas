import React, { useEffect, useState } from "react";
import WeatherApp from "./componentes/WeatherApp/WeatherApp.jsx";
import WeatherContext from "./WeatherContext.js";
import api from "./services/api";

const QUICK_CITIES = [
  { label: "New York", query: "New York,US" },
  { label: "Copenhagen", query: "Copenhagen,DK" },
  { label: "Ho Chi Minh City", query: "Ho Chi Minh City,VN" }
];

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Buenos Aires");
  const [searchQuery, setSearchQuery] = useState("");
  const [unit, setUnit] = useState("metric");
  const [otherCitiesWeather, setOtherCitiesWeather] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!selectedCity) return;

        const res = await api.get("forecast", {
          params: { q: selectedCity, units: unit }
        });

        setCurrentWeather({ ...res.data.list[0], name: res.data.city.name });
        setHourlyForecast(res.data.list.slice(0, 8));

        const daily = {};
        res.data.list.forEach((item) => {
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

  useEffect(() => {
    let isMounted = true;
    const fetchOtherCities = async () => {
      try {
        const requests = QUICK_CITIES.map((c) =>
          api.get("weather", { params: { q: c.query, units: unit } })
        );
        const responses = await Promise.all(requests);
        if (!isMounted) return;
        const mapped = responses.map((r, idx) => ({
          label: QUICK_CITIES[idx].label,
          temp: Math.round(r.data.main.temp),
          description: r.data.weather[0].main,
          icon: r.data.weather[0].icon,
          query: QUICK_CITIES[idx].query
        }));
        setOtherCitiesWeather(mapped);
      } catch (err) {
        console.error("Error al traer otras ciudades:", err);
      }
    };
    fetchOtherCities();
    return () => {
      isMounted = false;
    };
  }, [unit]);

  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);
  const handleSearch = () => {
    if (searchQuery.trim() !== "") setSelectedCity(searchQuery);
  };
  const handleTemperatureUnitChange = (unitType) => setUnit(unitType);

  const contextValue = {
    currentWeather,
    hourlyForecast,
    dailyForecast,
    otherCitiesWeather,
    selectedCity,
    setSelectedCity,
    searchQuery,
    setSearchQuery,
    handleSearchQueryChange,
    handleSearch,
    unit,
    setUnit,
    handleTemperatureUnitChange
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      <WeatherApp />
    </WeatherContext.Provider>
  );
}

export default App;
