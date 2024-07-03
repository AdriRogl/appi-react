import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function Start() {
  const [data, setData] = useState({
    celcius: 10,
    name: "New York",
    rain: 10,
    speed: 2,
    image: "/images/cloud.png",
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e403cf12563558d79508f3e09a52b3f2&units=metrics`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
          }
          return response.json();
        })
        .then((res) => {
          let imagePath = "";
          if (res.weather[0].main == "cloud") {
            imagePath = "/images/cloud.png";
          } else if (res.weather[0].main == "clear") {
            imagePath = "/images/clear.png";
          } else if (res.weather[0].main == "rain") {
            imagePath = "/images/rain.png";
          } else if (res.weather[0].main == "snow") {
            imagePath = "/images/snow.png";
          } else if (res.weather[0].main == "speed") {
            imagePath = "/images/speed.png";
          } else {
            imagePath = "/images/cloud.png";
          }
          console.log(res.data);
          setData({
            ...data,
            celcius: res.main.temp,
            name: res.name,
            rain: res.main.rain,
            speed: res.wind.speed,
            image: imagePath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.message.includes("404")) {
            setError("No es el nombre de una ciudad correcta");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Ingrese una ciudad"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img src="/images/search.png" onClick={handleClick} />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="Winfo">
          <img src={data.image} className="icon" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/images/rain.png" />
              <div className="rain">
                <p>{Math.round(data.rain)}%</p>
                <p>Rain</p>
              </div>
            </div>
            <div className="col">
              <img src="/images/speed.png" />
              <div className="speed">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
