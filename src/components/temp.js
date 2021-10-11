import React, {useState, useEffect  } from 'react'
import "./style.css"

const Temp = () => {
    const [searchValue, setSearchValue] = useState("Indore")
    const [tempInfo, setTempInfo] = useState({})
    const [weatherState, setWeatherState] = useState('')

    const getWeatherInfo = async  ()=>{
try {
let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=48bff085b9bbd8ed42690e825fe51dcc`;
const res = await fetch(url);
const data= await res.json()

const{temp, humidity, pressure} = data.main;
const {main: weatherMood} = data.weather[0];
const {name} = data;
const {speed}= data.wind;
const {country,sunset}= data.sys;

const myNewWeatherInfo = {
temp,
humidity,
pressure,
weatherMood,
name,
speed,
country,
sunset,

}
setTempInfo(myNewWeatherInfo);


} catch (error) {

console.log(error);
}



    }

    useEffect(() => {
       getWeatherInfo();
    }, [])

    useEffect(() => {
       switch (tempInfo.weatherMood) {
           case "Haze":
               setWeatherState ('wi-fog')
               
               break;

               case "Clouds":
                setWeatherState ('wi-day-cloudy')
                
                break;
                case "Clear":
                    setWeatherState ('wi-day-sunny')
                    
                    break;
       
           default: setWeatherState ('wi-day-sunny')
               break;
       }
    }, [tempInfo.weatherMood])

    let sec = tempInfo.sunset;
    let date = new Date(sec*1000);
    let timeStr = `${date.getHours()}: ${date.getMinutes()}`
    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search"
                        placeholder="Search..."
                        id="search"
                        autoFocus
                        className="searchTerm" 
                         value={searchValue}
                         onChange={(event)=>setSearchValue(event.target.value)} />
                    <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
                </div>
            </div>
            <article className="widget">
                <div className="weatherIcon">

                    <i className={`wi ${weatherState}`}></i>
                </div>
                <div className="weatherInfo">
                    <div className="temperature">
                        <span>25.5&deg;</span>

                    </div>
                    <div className="description">

                        <div className="weatherCondition">
                            {tempInfo.weatherMood}
                        </div>
                        <div className="place">
                            {tempInfo.name}, {tempInfo.country}
                        </div>
                    </div>
                </div>

                <div className="date">{new Date().toLocaleString()}</div>

                <div className="extra-temp">

                    <div className="temp-info-minmax">

                        <div className="two-sided-section">
                            <p><i className={`wi ${weatherState}`}></i></p>
                            <p className="extra-info-leftside">
                                {timeStr} <br />
                                Sunset
                            </p>
                        </div>

                        <div className="two-sided-section">
                            <p><i className={`wi ${weatherState}`}></i></p>
                            <p className="extra-info-leftside">
                                {tempInfo.humidity} <br />
                               Humidity
                            </p>

                        </div>
                    </div>
                      <div className="weather-extra-info">

                      <div className="two-sided-section">
                            <p><i className={`wi ${weatherState}`}></i></p>
                            <p className="extra-info-leftside">
                               {tempInfo.pressure} <br />
                                Pressure
                            </p>

                        </div>
                        <div className="two-sided-section">
                            <p><i className={`wi ${weatherState}`}></i></p>
                            <p className="extra-info-leftside">
                                {tempInfo.speed}<br />
                                Speed
                            </p>

                        </div>
                      </div>

                </div>
            </article>
        </>
    )
}

export default Temp;
