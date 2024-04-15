// WeatherPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherPage = ({ match }) => {
  const [weatherData, setWeatherData] = useState(null);
  const cityName = match.params.cityName;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=YOUR_API_KEY`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Weather for {cityName}</h2>
      <p>Temperature: {weatherData.main.temp}</p>
      <p>Description: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}</p>
      <p>Wind Speed: {weatherData.wind.speed}</p>
      <p>Pressure: {weatherData.main.pressure}</p>
    </div>
  );
};

export default WeatherPage;
