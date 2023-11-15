import React, { useState } from "react";
import axios from "axios";
import brokenclouds from './assets/icons/brokenclouds.png'
import clearday from './assets/icons/clearday.png'
import clearnight from './assets/icons/clearnight.png'
import clouds from './assets/icons/clouds.png'
import fewcloudsday from './assets/icons/fewcloudsday.png'
import fewcloudsnight from './assets/icons/fewcloudsnight.png'
import mist from './assets/icons/mist.png'
import rainday from './assets/icons/rainday.png'
import rainnight from './assets/icons/rainnight.png'
import showerrain from './assets/icons/showerrain.png'
import snow from './assets/icons/snow.png'
import thunderstorm from './assets/icons/thunderstorm.png'

const weatherIcons = {
  'clear sky': { day: clearday, night: clearnight },
  'few clouds': { day: fewcloudsday, night: fewcloudsnight },
  'scattered clouds': { day: clouds, night: clouds },
  'broken clouds': { day: brokenclouds, night: brokenclouds },
  'mist': { day: mist, night: mist },
  'light rain': { day: rainday, night: rainnight },
  'shower rain': { day: showerrain, night: showerrain },
  'snow': { day: snow, night: snow },
  'thunderstorm': { day: thunderstorm, night: thunderstorm },
};


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a6c12f7946894f3aaa4b7f611908f739`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input value={location} onChange={event => setLocation(event.target.value)} onKeyDown={searchLocation} placeholder='Enter location' type="text"></input>
      </div>
      <div className="container">
        <div className="top">
          <div className="icon">
            {data.weather && data.weather[0].icon && weatherIcons[data.weather[0].description] && (
              <img
                src={weatherIcons[data.weather[0].icon.slice(-1) === 'd' ? 'clear sky' : data.weather[0].description].day}
                alt={data.weather[0].description}
              />

            )}

          </div>
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} km/h</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
