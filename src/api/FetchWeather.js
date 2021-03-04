import axios from "axios";
import React from "react";
import axios from "axios";

const URL = "https//api.openweathermap.org/data/2.5.weather";
const API_KEY = "c88e098acc63bb243b41f9254185d83b";

const fetchWeather = async (query) => {
  const response = await axios.get(URL);
};
