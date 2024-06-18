import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherForecast from './Components/WeatherForecast';
import MobileWeather from './Components/MobileWeather';
import WeatherInput from './Components/weatherInput';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('Hyderabad');
  const [temperature, setTemperature] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    getWeatherData(location);
  }, []);

  async function getWeatherData(location) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API-KEY}`);
        
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
      setLocation(data.city.name);
      setDescription(data.list[0].weather[0].description);

      // Extract today's weather details
      const today = new Date().getDate();
      const todayWeather = data.list.find(item => new Date(item.dt * 1000).getDate() === today);

      const temperatureInCelsius = todayWeather.main.temp - 273.15;
      setTemperature(temperatureInCelsius.toFixed(2));

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  return (
    <div className="App">
      <div className='title'>Weather Forecast for {location}</div>
      <WeatherInput getWeatherData={getWeatherData}/>
      <MobileWeather location={location} temperature={temperature} description={description}/>
      <WeatherForecast data={data}/>
    </div>
  );
}

export default App;
