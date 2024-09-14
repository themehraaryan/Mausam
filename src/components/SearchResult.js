import React, { useState, useEffect } from "react";
import Spinner from './Spinning2.js'

function SearchResult({ query }) {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [info, setInfo] = useState({
    current: null,
    astronomy: null,
    forecast: null,
  });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        try {
          setLoading(true); // Start loading
          
          const currentUrl = `https://api.weatherapi.com/v1/current.json?key=e6d92c11c9384c31aba94149240109&q=${query}&aqi=yes`;
          const astronomyUrl = `https://api.weatherapi.com/v1/astronomy.json?key=e6d92c11c9384c31aba94149240109&q=${query}`;
          const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=e6d92c11c9384c31aba94149240109&q=${query}&days=10&aqi=no&alerts=no`;

          const [currentResponse, astronomyResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(astronomyUrl),
            fetch(forecastUrl),
          ]);

          const [currentData, astronomyData, forecastData] = await Promise.all([
            currentResponse.json(),
            astronomyResponse.json(),
            forecastResponse.json(),
          ]);

          setInfo({
            current: currentData,
            astronomy: astronomyData,
            forecast: forecastData,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // End loading
        }
      };

      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="loading" style={{ marginTop: navbarHeight }}>
        <Spinner />
      </div>
    );
  }

  // Check if all data is available
  if (!info.current || !info.astronomy || !info.forecast) {
    return (
      <div className="error" style={{ marginTop: navbarHeight, color: "white" }}>
        Data is not available at the moment.
      </div>
    );
  }

  function formatDateTime(dateString) {
    if (!dateString) {
      return "Invalid Date";
    }

    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const [datePart, timePart] = dateString.split(" ");

    if (!datePart) {
      return "Invalid Date";
    }

    const [year, month, day] = datePart.split("-");

    if (!year || !month || !day) {
      return "Invalid Date";
    }

    const monthNumber = parseInt(month, 10);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return "Invalid Date";
    }

    const formattedDay = parseInt(day, 10);
    // const formattedYear = parseInt(year, 10);

    const formattedMonth = months[monthNumber - 1];

    if (!timePart) {
      return `${formattedMonth} ${formattedDay}`;
    }

    const [hours, minutes] = timePart.split(":");
    const formattedHours = hours.padStart(2, "0");
    const formattedMinutes = minutes.padStart(2, "0");

    return `${formattedMonth} ${formattedDay}, ${formattedHours}:${formattedMinutes}`;
  }

  function formatDateTime2(dateString) {
    if (!dateString) {
      return "Invalid Date";
    }

    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const [datePart, timePart] = dateString.split(" ");

    if (!datePart) {
      return "Invalid Date";
    }

    const [year, month, day] = datePart.split("-");

    if (!year || !month || !day) {
      return "Invalid Date";
    }

    const monthNumber = parseInt(month, 10);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return "Invalid Date";
    }

    const formattedDay = parseInt(day, 10);
    // const formattedYear = parseInt(year, 10);

    const formattedMonth = months[monthNumber - 1];

    if (!timePart) {
      return `${formattedMonth} ${formattedDay}`;
    }

    const [hours, minutes] = timePart.split(":");
    const formattedHours = hours.padStart(2, "0");
    const formattedMinutes = minutes.padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }


  function convertBinaryToString(value) {
    return value === 1 ? 'Yes' : 'No';
  }

  function getHourFromTime(timeString) {
    // Split the time string by ':'
    const [hour] = timeString.split(':');
    
    // Convert the hour from string to integer and return
    return parseInt(hour, 10);
  }

  function getHourFromString(timeString) {
    // Check if timeString is defined and not empty
    if (timeString && typeof timeString === 'string') {
        // Split the timeString at ':'
        const [hourPart] = timeString.split(':');
        
        // Convert the hourPart to an integer and return it
        return parseInt(hourPart, 10);
    }
    // Return a default value or handle the case when timeString is invalid
    return null; // or any other appropriate default value
}


  return (
    <div className="sBody" style={{ marginTop: navbarHeight, color: "white" }}>
      <div
        className="sLocation container d-flex justify-content-center pt-3"
        style={{ color: "white" }}
      > 
      {info.current.location ? info.current.location.name : "N/A"}
      </div>

      <div className="sTandC container d-flex flex-column flex-md-row justify-content-evenly">
        <div className="sTimes d-flex flex-column">
          <div className="sLiveTimeO d-flex justify-content-center">
            <div className="sLiveTime">{info.current.location ? formatDateTime(info.current.location.localtime) : "N/A"}</div>
          </div>
          <div className="sAstroTime d-flex text-white-50 flex-column flex-md-row border border-dark-subtle rounded m-2">
            <div className="sSunrise p-3">SunRise = {info.astronomy.astronomy ? info.astronomy.astronomy.astro.sunrise : "N/A"}</div>
            <div className="sSunSet p-3"> SunSet = {info.astronomy.astronomy ? info.astronomy.astronomy.astro.sunset : "N/A"}</div>
          </div>
        </div>
        <div className="sTempratures d-flex flex-column ">
          <div className="sLiveTempO d-flex justify-content-center">
            <div className="sLiveTemp">{info.current.current ? info.current.current.temp_c + "°C" : "N/A"}</div>
          </div>
          <div className="sTempLimits d-flex flex-column text-white-50 flex-md-row border border-dark-subtle rounded m-2">
            <div className="sMinTemp p-3">Min Temp : {info.forecast.forecast ? info.forecast.forecast.forecastday[0].day.mintemp_c + "°C" : "N/A"}</div>
            <div className="sMaxTemp p-3">Max Temp : {info.forecast.forecast.forecastday ? info.forecast.forecast.forecastday[0].day.maxtemp_c + "°C" : "N/A"}</div>
          </div>
        </div>
      </div>

      <div className="sInfo1 d-flex flex-column flex-md-row container justify-content-between pt-3">
        <div className="sRainInfo border border-info p-4 m-2 rounded ">
          <div className="sRainChance">Rain Chance = {info.forecast.forecast.forecastday ? info.forecast.forecast.forecastday[0].day.daily_chance_of_rain + "%" : "N/A"} </div>
          <div className="sIsRain">will it Rain = {info.forecast.forecast.forecastday ? convertBinaryToString(info.forecast.forecast.forecastday[0].day.daily_will_it_rain) : "N/A"}</div>
          <div className="sRainAmt">Rain Amt. = {info.current.current ? info.current.current.precip_mm + " mm" : "N/A"} </div>
        </div>
        <div className="sHumidInfo p-4 m-2 border border-info rounded">
          <div className="sHumidity">Humidity = {info.current.current ? info.current.current.humidity + "%" : "N/A"}</div>
          <div className="sFeelsLike">feels like = {info.current.current ? info.current.current.feelslike_c + "°C" : "N/A"}</div>
          <div className="sCloudCvr">Cloud Cover = {info.current.current ? info.current.current.cloud + "%" : "N/A"}</div>
        </div>
        <div className="sSnowInfo p-4 m-2 border border-info rounded">
          <div className="sSnowChance">Snow Chance = {info.forecast.forecast.forecastday ? info.forecast.forecast.forecastday[0].day.daily_chance_of_snow + "%" : "N/A"}</div>
          <div className="sIsSnow">will it Snow = {info.forecast.forecast.forecastday ? convertBinaryToString(info.forecast.forecast.forecastday[0].day.daily_will_it_snow) : "N/A"}</div>
          <div className="sSnowAmt">UV = {info.current.current ? info.current.current.uv : "N/A"}</div>
        </div>
      </div>

      <div className="sHourlyF container d-flex justify-content-evenly flex-wrap p-4">
        <div className="sHT p-3">
        <div className="sHour">{info.forecast.forecast.forecastday && info.current.current ?info.forecast.forecast.forecastday[0].hour[getHourFromString((getHourFromTime(formatDateTime2(info.current.location.localtime)))+1 + ":00")].temp_c + "°C":"N/A"}</div>
          <div className="sHourTemp">{info.forecast.forecast.forecastday && info.current.current ? (getHourFromTime(formatDateTime2(info.current.location.localtime)))+1 + ":00"  : "N/A"}</div>
          
        </div>
        <div className="sHT p-3">
        <div className="sHour">{info.forecast.forecast.forecastday && info.current.current ?info.forecast.forecast.forecastday[0].hour[getHourFromString((getHourFromTime(formatDateTime2(info.current.location.localtime)))+2 + ":00")].temp_c + "°C":"N/A"}</div>
          <div className="sHourTemp">{info.forecast.forecast.forecastday && info.current.current ? (getHourFromTime(formatDateTime2(info.current.location.localtime)))+2 + ":00"  : "N/A"}</div>
         
        </div>
        <div className="sHT p-3">
        <div className="sHour">{info.forecast.forecast.forecastday && info.current.current ?info.forecast.forecast.forecastday[0].hour[getHourFromString((getHourFromTime(formatDateTime2(info.current.location.localtime)))+3 + ":00")].temp_c + "°C":"N/A"}</div>
          <div className="sHourTemp">{info.forecast.forecast.forecastday && info.current.current ? (getHourFromTime(formatDateTime2(info.current.location.localtime)))+3 + ":00"  : "N/A"}</div>
          
        </div>
        <div className="sHT p-3">
  {(() => {
    try {
      const index = getHourFromString((getHourFromTime(formatDateTime2(info.current.location.localtime))) + 4 + ":00");
      const temp = info.forecast.forecast.forecastday[0].hour[index]?.temp_c || "N/A";
      const time = (getHourFromTime(formatDateTime2(info.current.location.localtime))) + 4 + ":00";
      return (
        <>
          <div className="sHour">{temp !== "N/A" ? temp + "°C" : "N/A"}</div>
          <div className="sHourTemp">{temp !== "N/A" ? time : "N/A"}</div>
        </>
      );
    } catch (error) {
      return (
        <>
          <div className="sHour">N/A</div>
          <div className="sHourTemp">N/A</div>
        </>
      );
    }
  })()}
</div>

<div className="sHT p-3">
  {(() => {
    try {
      const index = getHourFromString((getHourFromTime(formatDateTime2(info.current.location.localtime))) + 5 + ":00");
      const temp = info.forecast.forecast.forecastday[0].hour[index]?.temp_c || "N/A";
      const time = (getHourFromTime(formatDateTime2(info.current.location.localtime))) + 5 + ":00";
      return (
        <>
          <div className="sHour">{temp !== "N/A" ? temp + "°C" : "N/A"}</div>
          <div className="sHourTemp">{temp !== "N/A" ? time : "N/A"}</div>
        </>
      );
    } catch (error) {
      return (
        <>
          <div className="sHour">N/A</div>
          <div className="sHourTemp">N/A</div>
        </>
      );
    }
  })()}
</div>

<div className="sHT p-3">
  {(() => {
    try {
      const index = getHourFromString((getHourFromTime(formatDateTime2(info.current.location.localtime))) + 6 + ":00");
      const temp = info.forecast.forecast.forecastday[0].hour[index]?.temp_c || "N/A";
      const time = (getHourFromTime(formatDateTime2(info.current.location.localtime))) + 6 + ":00";
      return (
        <>
          <div className="sHour">{temp !== "N/A" ? temp + "°C" : "N/A"}</div>
          <div className="sHourTemp">{temp !== "N/A" ? time : "N/A"}</div>
        </>
      );
    } catch (error) {
      return (
        <>
          <div className="sHour">N/A</div>
          <div className="sHourTemp">N/A</div>
        </>
      );
    }
  })()}
</div>

<div className="sHT p-3">
  {(() => {
    try {
      const index = getHourFromString((getHourFromTime(formatDateTime2(info.current.location.localtime))) + 7 + ":00");
      const temp = info.forecast.forecast.forecastday[0].hour[index]?.temp_c || "N/A";
      const time = (getHourFromTime(formatDateTime2(info.current.location.localtime))) + 7 + ":00";
      return (
        <>
          <div className="sHour">{temp !== "N/A" ? temp + "°C" : "N/A"}</div>
          <div className="sHourTemp">{temp !== "N/A" ? time : "N/A"}</div>
        </>
      );
    } catch (error) {
      return (
        <>
          <div className="sHour">N/A</div>
          <div className="sHourTemp">N/A</div>
        </>
      );
    }
  })()}
</div>

      </div>

      <div className="sAQ container d-flex flex-wrap justify-content-around border-top border-bottom border-info">
        <div className="sAQTitle m-2">
          Air Quality (μg/m<sup>3</sup>) :
        </div>
        <div className="sAQParameters d-flex flex-wrap justify-content-around ">
          <div className="sAQPara m-3">PM 2.5 = {info.current.current ? info.current.current.air_quality.pm2_5 : "N/A"}</div>
          <div className="sAQPara m-3">PM 10 = {info.current.current ? info.current.current.air_quality.pm10 : "N/A"}</div>
          <div className="sAQPara m-3">NO2 = {info.current.current ? info.current.current.air_quality.no2 : "N/A"}</div>
          <div className="sAQPara m-3">SO2 = {info.current.current ? info.current.current.air_quality.so2 : "N/A"}</div>
          <div className="sAQPara m-3">O3 = {info.current.current ? info.current.current.air_quality.o3 : "N/A"}</div>
        </div>
      </div>

      <div className="sInfo2 d-flex flex-wrap justify-content-around p-4 border-bottom container border-info mb-5">
        <div className="sWindSpeed">Wind Speed = {info.current.current ? info.current.current.wind_mph + " mph" : "N/A"}</div>
        <div className="sWindDirection">Wind Direction = {info.current.current ? info.current.current.wind_degree + "°" : "N/A"}</div>
        <div className="sPressure">Pressure = {info.current.current ? info.current.current.pressure_in + " psi" : "N/A"}</div>
      </div>


      <div className="end d-flex justify-content-center align-items-center">E N D</div>
    </div>
  );
}

export default SearchResult;


