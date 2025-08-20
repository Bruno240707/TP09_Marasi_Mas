import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  params: {
    appid: "81fc2e48cb4f44790f6d87496b374f2a",
    units: "metric",
    lang: "es"
  }
});

export default api;