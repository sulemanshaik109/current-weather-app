import React, { useState } from 'react';
import axios from 'axios';
import {TailSpin} from "react-loader-spinner";
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import "./styles.css"

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeather = async (city) => {
      setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
            setWeatherData(response.data);
            setLoading(false);
            setError("");
        } catch (error) {
            console.log(error.message)
            setError(error.response.data.error);
            setLoading(false);
        }
    };

    const handleMode = () => {
      setDarkMode(!darkMode);
      document.documentElement.classList.toggle("dark-mode");
    };

    return (
        <div className='weather-app'>
            <h1 className='title'>Weather</h1>
            <div className="header">
              <SearchBar onSearch={fetchWeather} darkMode={darkMode} />
              <button type="button" className="theme-btn" onClick={handleMode}>
                {darkMode ? (
                  <MdOutlineLightMode size="30" color="#ffffff" />
                ) : (
                  <MdDarkMode size="30" />
                )}
              </button>
            </div>
            {loading ? (
              <div className='loader-container'>
                <TailSpin color="#0b69ff" height="50" width="50" />
              </div>
            ) : error !== "" ? (
              <div>
                <h2>Errors</h2>
                <p>{error}</p>
              </div>
            ) : (
              <WeatherDisplay weatherData={weatherData} darkMode={darkMode}/>
            )}
        </div>
    );
};

export default App;
