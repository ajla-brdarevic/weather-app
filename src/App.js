import React, { useState } from "react";
import axios from "axios";

//Thunderstorm
import thunderstorm from './assets/icons/11d.png'
//Drizzle
import drizzle from './assets/icons/09d.png'
//Rain
import rainday from './assets/icons/10d.png'
import rainnight from './assets/icons/09d.png'
//Snow
import snowday from './assets/icons/13d.png'
import snownight from './assets/icons/13n.png'
//Atmosphere
import mistday from './assets/icons/50d.png'
import mistnight from './assets/icons/50n.png'
//clear
import clearday from './assets/icons/01d.png'
import clearnight from './assets/icons/01n.png'
//clouds
import fewcloudsday from './assets/icons/02d.png'
import fewcloudsnight from './assets/icons/02n.png'
import scatteredcloudsday from './assets/icons/03d.png'
import scatteredcloudsnight from './assets/icons/03n.png'
import brocenovercastday from './assets/icons/04d.png'
import brocenovercastnight from './assets/icons/04d.png'


const weatherIcons = {
  //Thunderstorm
  'thunderstorm with light rain': { day: thunderstorm, night: thunderstorm },
  'thunderstorm with rain': { day: thunderstorm, night: thunderstorm },
  'thunderstorm with heavy rain': { day: thunderstorm, night: thunderstorm },
  'light thunderstorm': { day: thunderstorm, night: thunderstorm },
  'thunderstorm': { day: thunderstorm, night: thunderstorm },
  'heavy thunderstorm': { day: thunderstorm, night: thunderstorm },
  'ragged thunderstorm': { day: thunderstorm, night: thunderstorm },
  'thunderstorm with light drizzle': { day: thunderstorm, night: thunderstorm },
  'thunderstorm with drizzle': { day: thunderstorm, night: thunderstorm },
  'thunderstorm with heavy drizzle': { day: thunderstorm, night: thunderstorm },
  //Drizzle
  'light intensity drizzle': { day: drizzle, night: drizzle },
  'drizzle': { day: drizzle, night: drizzle },
  'heavy intensity drizzle': { day: drizzle, night: drizzle },
  'light intensity drizzle rain': { day: drizzle, night: drizzle },
  'drizzle rain': { day: drizzle, night: drizzle },
  'heavy intensity drizzle rain': { day: drizzle, night: drizzle },
  'shower rain and drizzle': { day: drizzle, night: drizzle },
  'heavy shower rain and drizzle': { day: drizzle, night: drizzle },
  'shower drizzle': { day: drizzle, night: drizzle },
  //Rain
  'light rain': { day: rainday, night: rainday },
  'moderate rain': { day: rainday, night: rainday },
  'heavy intensity rain': { day: rainday, night: rainday },
  'very heavy rain': { day: rainday, night: rainday },
  'extreme rain': { day: rainday, night: rainday },
  'freezing rain': { day: snowday, night: snownight },
  'light intensity shower rain': { day: rainnight, night: rainnight },
  'shower rain': { day: rainnight, night: rainnight },
  'heavy intensity shower rain': { day: rainnight, night: rainnight },
  'ragged shower rain': { day: rainnight, night: rainnight },
  //Snow
  'snow': { day: snowday, night: snownight },
  'light snow': { day: snowday, night: snownight },
  'heavy snow': { day: snowday, night: snownight },
  'sleet': { day: snowday, night: snownight },
  'light shower sleet': { day: snowday, night: snownight },
  'shower sleet': { day: snowday, night: snownight },
  'light rain and snow': { day: snowday, night: snownight },
  'rain and snow': { day: snowday, night: snownight },
  'light shower snow': { day: snowday, night: snownight },
  'shower snow': { day: snowday, night: snownight },
  'heavy shower snow': { day: snowday, night: snownight },
  //Atmosphere
  'mist': { day: mistday, night: mistnight },
  'smoke': { day: mistday, night: mistnight },
  'haze': { day: mistday, night: mistnight },
  'sand/dust whirls': { day: mistday, night: mistnight },
  'fog': { day: mistday, night: mistnight },
  'sand': { day: mistday, night: mistnight },
  'dust': { day: mistday, night: mistnight },
  'volcanic ash': { day: mistday, night: mistnight },
  'squalls': { day: mistday, night: mistnight },
  'tornado': { day: mistday, night: mistnight },
  //clear
  'clear sky': { day: clearday, night: clearnight },
  //clouds
  'few clouds': { day: fewcloudsday, night: fewcloudsnight },
  'scattered clouds': { day: scatteredcloudsday, night: scatteredcloudsnight },
  'broken clouds': { day: brocenovercastday, night: brocenovercastnight },
  'overcast clouds': { day: brocenovercastday, night: brocenovercastnight },
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
            {data.weather && (
              <img
                src={
                  data.weather[0].icon.endsWith('d')
                    ? weatherIcons[data.weather[0].description]?.day
                    : weatherIcons[data.weather[0].description]?.night
                }
                alt={
                  data.weather[0].icon.endsWith('d')
                    ? `${data.weather[0].description} Day`
                    : `${data.weather[0].description} Night`
                }
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
