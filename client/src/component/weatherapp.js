import React, { useEffect, useState } from "react";
import "./css/styles.css";
import Navbar from "./navbar";
import { getWeatherIcon } from "../utilities/getWeathericon";
import paritallyCloudy from "../images/partiallycloudy.png";


function WeatherApp() {
  const [search, setSearch] = useState(null);
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    humidity: null,
    pressure: null,
    description: null,
    icon: paritallyCloudy,
    sunrisetime: null,
    sunsettime: null,
    speed: null,
    degree: null,
    city: null,
    currenttime: null,
    desc: null,
  });

  useEffect(() => {
    if (!search) {
      setWeatherData({
        temperature: null,
        mintemp: null,
        maxtemp: null,
        humidity: null,
        pressure: null,
        description: null,
        icon: paritallyCloudy,
        sunrisetime: null,
        sunsettime: null,
        speed: null,
        degree: null,
        city: null,
        desc: null,
      })
      return;
    }
    const fetchApi = async () => {
    try{
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=5742cc42b5c06616dc61ea777dd3b089`;
      const resp = await fetch(url);
      if(!resp.ok) {
        console.log('No weather data found for city:', search);
        // return ;
        setWeatherData({
          temperature: null,
          mintemp: null,
          maxtemp: null,
          humidity: null,
          pressure: null,
          description: null,
          icon: paritallyCloudy,
          sunrisetime: null,
          sunsettime: null,
          speed: null,
          degree: null,
          city: null,
          desc: null,
        });
        return
      }
      const respJson = await resp.json();

      if (respJson.main && respJson.weather) {
        const sunrise = respJson.sys.sunrise;
        const sunset = respJson.sys.sunset;
        const date1 = new Date(sunrise * 1000);
        const date2 = new Date(sunset * 1000);
        const sunrise_time = date1.toLocaleTimeString();
        const sunset_time = date2.toLocaleTimeString();
        const timestamp = respJson.dt;
        const timezoneOffsetInSeconds = respJson.timezone; 
        const localDateTime = new Date((timestamp + timezoneOffsetInSeconds) * 1000);
        const adjustedDateTime = new Date(localDateTime.getTime() + (localDateTime.getTimezoneOffset() * 60 * 1000));
        const hours = adjustedDateTime.getHours();
        const desc = respJson.weather[0].main;
        const curr_time = adjustedDateTime.toLocaleTimeString();
        console.log(respJson.main.temp);
        setWeatherData({
          temperature: respJson.main.temp,
          humidity: respJson.main.humidity,
          pressure: respJson.main.pressure,
          description: respJson.weather[0].main,
          icon: getWeatherIcon(respJson.weather[0].id, hours),
          sunrisetime: sunrise_time,
          sunsettime: sunset_time,
          speed: respJson.wind.speed,
          degree: respJson.wind.deg,
          city: respJson.name,
          mintemp: respJson.main.temp_min,
          maxtemp: respJson.main.temp_max,
          desc: desc,
          currenttime: curr_time,
        });
      }
    } catch(error) {
      console.error('Error fetching weather data:', error);
    }
    };

    fetchApi();
  }, [search]);

  return (
    <>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${weatherData.icon})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: "rgba(0, 0, 0, 0.61)",
        backgroundBlendMode: "overlay",
        zIndex: -1,
      }}
    ></div>
      <Navbar />
      <div className="weatherCardContainer" style={{textAlign: 'center'}}>
        <div className="weatherCard" style={{backgroundImage: `url(${weatherData.icon})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
          <div className="input">
            <input
              type="search"
              className="inputField"
              style={{
                width: '270px',
                borderRadius: '20px',
                padding: '8px 12px',
                border: '2px solid #ccc',
                fontSize: '16px',
                marginTop: '20px',
              }}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          {!weatherData.city ? (
            <p></p>
          ) : (
            <div className="info">
              <h2 className="loc">{search}</h2>
              <h1 className="loc">{weatherData.desc}</h1>
              <h2 className="temp">🌡️ {weatherData.temperature} °C </h2> 
              <h3 className="othertemp">
                Min : {weatherData.mintemp} °C<span className="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Max : {weatherData.maxtemp} °C
              </h3>
              <h4>Current time : {weatherData.currenttime}</h4>
              <h4 style={{color: 'orange'}}> 🌅 Sunrise : {weatherData.sunrisetime}<span className="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>🌇 Sunset : {weatherData.sunsettime}</h4>
              <h4> 🌫️ Wind Speed : {weatherData.speed}<span className="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>🧭 Wind Degree : {weatherData.degree} </h4>
              <h4> Humidity : {weatherData.humidity}<span className="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Pressure : {weatherData.pressure}</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherApp;
