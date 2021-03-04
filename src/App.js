import React, { useState } from "react";

import "./App.css";
import Clock from "react-digital-clock";
import moment from "moment";
import { Component } from "react";

const api = {
  key: "c88e098acc63bb243b41f9254185d83b",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // const search = (evnt) => {
  //   if (evnt.key === "Enter") {
  //     const data = await fetchWeather(query)
  //     setWeather(data);
  //     setQuery('');
  //   }
  // };

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 20
            ? "app-warm"
            : "app-cold"
          : "app-warm"
      }
    >
      <div>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          {/* <button className="search-button">SEARCH</button> */}
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="bottom-section">
            <div className="weather-card">
              <div className="t-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date-time">
                  <div className="date">{dateBuilder(new Date())}</div>
                  <div className="time">
                    <Clock />
                  </div>
                </div>
                <div className="weather-icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                  />
                </div>
                <div className="temp">
                  {Math.round(weather.main.temp)}&deg;C
                </div>
                <div className="other-temp">
                  <div className="min-temp">
                    {Math.round(weather.main.temp_min)}&deg;C
                  </div>
                  <div className="max-temp">
                    {Math.round(weather.main.temp_max)}&deg;C
                  </div>
                </div>
                <div className="forecast">{weather.weather[0].main}</div>
                <div className="bottom-block">
                  <div className="humidity">
                    Humidity: {weather.main.humidity}%
                  </div>
                  <div className="wind-speed">
                    Wind Speed: {weather.wind.speed} m/s
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
