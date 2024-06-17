import React from 'react';
import './WeatherForecast.css';
function WeatherForecast({ data }) {
  if (!data.city || !data.list) {
    return <div>Loading...</div>;
  }

  const { city, list } = data;
  const { name, coord, country } = city;
  const { lat, lon } = coord;

  // Function to convert Kelvin to Celsius
  const convertToCelsius = (temp) => (temp - 273.15).toFixed(2);

  // Function to filter weather data for a specific time each day
  const filterWeatherDataByTime = (list, targetHour) => {
    const filteredData = [];
    const dates = new Set();

    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const hour = date.getUTCHours();

      if (hour === targetHour && !dates.has(date.toDateString())) {
        dates.add(date.toDateString());
        filteredData.push(item);
      }
    });

    return filteredData;
  };

  // Get weather data for 12:00 PM (noon) each day
  const filteredData = filterWeatherDataByTime(list, 12);

  return (
    <div className="weather-forecast">
      <div className="forecast-list">
        {filteredData.map((forecast, index) => {
          const { dt_txt, main, weather, wind, pop } = forecast;
          const { temp } = main;
          const { description } = weather[0];
          const { speed } = wind;

          return (
            <div key={index} className="forecast-item">
              
              <img src={`/images/${description}.png`} alt={description} />
              <p className='temp'>{convertToCelsius(temp)}°C-<span>{description}</span></p>
              <h2>{new Date(dt_txt).toLocaleDateString()}</h2>
              <p className='wind'>Wind Speed: {speed} m/s</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherForecast;
