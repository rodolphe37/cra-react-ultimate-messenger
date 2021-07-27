// MODULES IMPORTS
import React, { useState } from "react";
import { useRecoilState } from "recoil";
// CSS IMPORTS
import "./Weather.css";
// HOOKS & SERVICES IMPORTS
import fetchWeather from "../../services/fetchWeather";
// STATEMANAGMENT IMPORTS
import weatherAtom from "../../stateManager/atoms/weatherAtom";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useRecoilState(weatherAtom);

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
    }
    setTimeout(() => {
      setWeather({});
    }, 27500);
  };

  const TradDescriptionsWeather = () => {
    if (weather.weather[0].description === "few clouds")
      return "Quelques Nuages";

    if (weather.weather[0].description === "mist") return "Brouillard";

    if (weather.weather[0].description === "clear sky") return "Ciel clair";

    if (weather.weather[0].description === "scattered clouds")
      return "Nuages dispersés";

    if (weather.weather[0].description === "overcast clouds")
      return "Ciel Couvert";

    if (weather.weather[0].description === "light rain") return "Légère pluie";

    if (weather.weather[0].description === "moderate rain")
      return "Pluie modérée";

    if (weather.weather[0].description === "broken clouds") return "Nuageux";
    else return weather.weather[0].description;
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Cherchez ici ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />

      {weather.main ? (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <br />
          <div className="city-feels-like-temp">
            <b>Température ressentie</b>
            <br />
            {Math.round(weather.main.feels_like)}
            <sup>&deg;C</sup>
          </div>
          <br />
          <div className="city-feels-humidity">
            <b>Humidité</b>
            <br />
            {weather.main.humidity}
            <sup>%</sup>
          </div>
          <br />
          {/*<div className="city-pressure">
            <b>Pression atmosphérique</b>
            <br />
            {weather.main.pressure}
            <sup>hPa</sup>
          </div>
          <br />
          <div className="weather-speed-wind">
            <b>Vitesse du vent</b>
            <br />
            <span>{weather.wind.speed}</span>
            <sup> Km/h</sup>
          </div>
      <br />*/}
          <div className="min-max">
            <div className="temp-min">
              <b>Temp min</b>
              <br />
              {weather.main.temp_min}
              <sup>&deg;C</sup>
            </div>
            <div className="temp-max">
              <b>Temp max</b>
              <br />
              {weather.main.temp_max}
              <sup>&deg;C</sup>
            </div>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{TradDescriptionsWeather()}</p>
          </div>
        </div>
      ) : (
        search &&
        !weather && <p>Aucune ville de se nom dans la base de données.</p>
      )}
    </div>
  );
};

export default Weather;
