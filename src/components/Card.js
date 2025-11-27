import React from "react";
import dubai from "./covers/dubai.jpg";
import paris from "./covers/paris.jpg";
import london from "./covers/london.jpg";
import newdelhi from "./covers/new delhi.jpg";
import newyork from "./covers/new york.jpg";
import sydney from "./covers/sydney.jpg";
import shanghai from "./covers/shanghai.jpg";
import moscow from "./covers/moscow.jpg";
import tokyo from "./covers/tokyo.jpg";

const Card = (props) => {
  const {
    name,
    localTime,
    temp_c,
    localDate1,
    temp_c1,
    localDate2,
    temp_c2,
    aqi_f,
    humidity,
    rain,
    feelsLike_c,
    sunRise,
    sunSet,
  } = props;

  // Map city names to image imports
  const cityImages = {
    "New Delhi": newdelhi,
    "New York": newyork,
    "London": london,
    "Dubai": dubai,
    "Sydney": sydney,
    "Tokyo": tokyo,
    "Paris": paris,
    "Shanghai": shanghai,
    "Moscow": moscow,
  };

  // Select image based on city name
  const cityImage = cityImages[name] || "";

  return (
    <div className="card-container">
      <div className="card text-bg-dark">
        <img src={cityImage} className="card-img" alt={name} />
        <div className="card-img-overlay">
          <div className="head-sec d-flex justify-content-between">
            <div className="tandl">
              <h3 className="card-title">{name}</h3>
              <h4 style={{ letterSpacing: "0.9px" }}>{localTime}</h4>
            </div>
            <h3 className="card-title temp">{temp_c}° C</h3>
          </div>

          <div className="hourlyTemp card-text d-flex justify-content-around container">
            <div className="hourlyTempC">
              <p>{temp_c1}° C</p>
              <p>{localDate1}</p>
            </div>
            <div className="hourlyTempC">
              <p>{temp_c2}° C</p>
              <p>{localDate2}</p>
            </div>
          </div>

          <div className="secText d-flex justify-content-between container">
            <div className="aqi">
              <p>Chances of Rain = {rain}%</p>
            </div>
            <div className="humidity">
              <p>Humidity = {humidity}%</p>
            </div>
          </div>

          <div className="tertText d-flex justify-content-between container">
            <div className="rain">
              <p>PM 2.5 = {aqi_f}</p>
            </div>
            <div className="feelsLike">
              <p>FeelsLike = {feelsLike_c}° C</p>
            </div>
          </div>

          <div className="quarText d-flex justify-content-between container">
            <div className="sunRise">
              <p>Sun Rise = {sunRise}</p>
            </div>
            <div className="sunSet">
              <p>Sun Set = {sunSet}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
