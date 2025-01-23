import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { getWeatherIcon } from "../utilities/getWeathericon";

function CardDisplay() {
  const [cityname, setCityname] = useState("");
  const [cities, setCities] = useState([]);
  const [cityWeatherData, setCityWeatherData] = useState({});

  const fetchCitiesData = async () => {
    try {
      const response = await fetch(
        `/api/cities?email=${localStorage.getItem("user")}`
      );
      const data = await response.json();
      const cityNames = data.map((city) => city.cityname);

      const weatherData = await Promise.all(
        cityNames.map(async (cityname) => {
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=5742cc42b5c06616dc61ea777dd3b089`;
          const resp = await fetch(url);

          if (!resp.ok) {
            console.error(`No weather data found for city: ${cityname}`);
            return null;
          }

          const respJson = await resp.json();
          const {
            main: { temp, humidity, pressure, temp_min, temp_max },
            name,
            weather,
            dt,
            timezone,
          } = respJson;

          const localDateTime = new Date((dt + timezone) * 1000);
          const dstOffset = localDateTime.getTimezoneOffset() * 60 * 1000;
          const adjustedDateTime = new Date(
            localDateTime.getTime() + dstOffset
          );
          const hours = adjustedDateTime.getHours();

          return {
            cityname,
            temperature: temp,
            humidity,
            pressure,
            minTemp: temp_min,
            maxTemp: temp_max,
            name,
            weather: weather[0].main,
            icon: getWeatherIcon(weather[0].id, hours),
          };
        })
      );
      const validWeatherData = weatherData.filter((data) => data !== null);
      const weatherDataMap = validWeatherData.reduce((acc, cityData) => {
        acc[cityData.cityname] = cityData;
        return acc;
      }, {});
      setCityWeatherData(weatherDataMap);
      setCities(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = localStorage.getItem("user");
    if (!email) {
      console.log("No user found");
      return;
    }

    fetch("/api/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, cityname }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCityname("");
        fetchCitiesData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteCity = (cityname) => {
    console.log(`Deleting city: ${cityname}`);
    fetch(`/api/cities/${cityname}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchCitiesData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchCitiesData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="addcity">
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter City Name"
              value={cityname}
              onChange={(e) => setCityname(e.target.value)}
            />
            <button type="submit">Add City</button>
          </form>
          {/* <p>{message}</p> */}
        </div>
      </div>
      <div className="cardelse">
        <div className="weathercard">
          {Array.isArray(cities) && cities.length > 0 ? (
            cities.map((city) => {
              const weather = cityWeatherData[city.cityname];
              return (
                weather && (
                  <div
                    className="card"
                    style={{ backgroundImage: `url(${weather.icon})` }}
                    key={city._id}
                  >
                    <div
                      className="card-body"
                      style={{ color: "rgb(168, 168, 168)" }}
                    >
                      <h2 className="card-title">
                        {weather.name}
                        <a
                          className="deletionlink"
                          href="#"
                          onClick={() => handleDeleteCity(city.cityname)}
                        >
                          -
                        </a>
                      </h2>
                      <h2 className="card-title">{weather.temperature}°C</h2>
                      <h3 className="card-title">{weather.weather}</h3>
                      <div className="bar-wrapper">
                        <h5>{weather.minTemp}°C</h5>
                        <div
                          className="bar"
                          style={{ "--value": `${weather.maxTemp}%` }}
                        ></div>
                        <h5 style={{ marginLeft: "10px" }}>
                          {weather.maxTemp}°C
                        </h5>
                      </div>
                      <div className="bar-wrapper">
                        <h5>{weather.humidity}% Humidity</h5>
                        <div
                          className="bar"
                          style={{ "--value": `${weather.humidity}%` }}
                        ></div>
                      </div>
                      <div className="bar-wrapper">
                        <h5>{weather.pressure} Pressure</h5>
                        <div
                          className="bar"
                          style={{ "--value": `${weather.pressure}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )
              );
            })
          ) : (
            <p>No cities found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default CardDisplay;
