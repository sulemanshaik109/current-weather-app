import React from 'react';

const WeatherDisplay = ({ weatherData, darkMode }) => {
    if (!weatherData) {
        return null;
    }

    const date = new Date(weatherData.dt);

    return (
        <div className={`weather-card ${darkMode ? "dark-weather-card" : ""}`}>
          <h2 className="location-name">{weatherData.name}</h2>
          <div className="date-and-time">
            <p className="text">{date.toLocaleTimeString()}</p>
          </div>
          <div className="temperature-and-condition">
            <p className="temperature">{Math.ceil(weatherData.main.temp)} °C</p>
            <div className='weather-condition'>
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weather icon" />
            <p className="condition">{weatherData.weather[0].main}</p>
          </div>
          </div>
          <p className="description">
            <strong>Description: </strong>
            {weatherData.weather[0].description}
          </p>
          <ul className="additional-features">
            <li className="info-container">
              <p className="detail-text">
                <strong>Humidity</strong>
              </p>
              <p className="detail-text">{weatherData.main.humidity}%</p>
            </li>
            <li className="info-container">
              <p className="detail-text">
                <strong>Wind</strong>
              </p>
              <p className="detail-text">{weatherData.wind.speed} km/h</p>
            </li>
            <li className="info-container">
              <p className="detail-text">
                <strong>Pressure</strong>
              </p>
              <p className="detail-text">{weatherData.main.pressure} mb</p>
            </li>
            <li className="info-container">
              <p className="detail-text">
                <strong>Visibility</strong>
              </p>
              <p className="detail-text">{weatherData.visibility / 1000} km</p>
            </li>
          </ul>
        </div>
    );
};

export default WeatherDisplay;