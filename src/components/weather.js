import React, { useState } from "react";
import './css/style.css';
import { FcSearch, } from "react-icons/fc";
import { MdLocationOn } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const Weather = () => {
   const [city, setCity] =useState('');
   const [weather, setWeather] = useState();
   const [error, setError] = useState("");

    const API_KEY =  "2c71b04f872420f441653b2327b1a943";
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`; 
  

   function handleOnchnage(event){
    setCity(event.target.value);

   }

   async function fetchData() {
    try {
      let response = await fetch(url);
      let output = await response.json();
     if(response.ok) {
      setWeather(output);
      console.log(output);
      setError("");
      
    }else {
      setError("No data found please enter a valid city name.");
    }
    }
    catch (error) {

    }
   }
   
      
  return (
    <div className='container'>
    <div className='main-body'>
    <input type="text" value={city} onChange={handleOnchnage} placeholder="Enter any city name" />
    <button onClick={() => fetchData()}>
    <FcSearch />
    </button>

    </div>
    {
            error && <p className='error-message'>{error}</p>
        }
        {
            weather && weather.weather &&
            <div className='content'>

             <div className='weather-image'>
                  <img  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}  alt="" ></img>
                  <h3 className='desc'>{weather.weather[0].description}</h3>
            </div>
             <div className='weather-temp'>
               <h2>{weather.main.temp}<span>&deg;C</span></h2>
            </div>
            <div className='weather-city'>
                    <div className='location'>
                <MdLocationOn></MdLocationOn>
              </div>
              <p>{weather.name},<span>{weather.sys.country}</span></p>
            </div>
             <div className='weather-stats'>
             <div className='wind'>
             <div className="wind-icon">
              <FaWind></FaWind>
             </div>
             <div className='wind-speed'>{weather.wind.speed}<span>Km/hr/</span></div>
             </div>
             <div className='humidity'>
                        <div className='humidity-icon'>
              <WiHumidity></WiHumidity>
            </div>
            <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
            <h3 className='humidity-heading'>Humidity</h3>

            </div>

            </div>
           
      </div>
    }
     
    </div>
  );
};

export default Weather;
