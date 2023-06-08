// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=7276cb9519b07d4aa7b1e70b7fe8a1a4
import React from "react";
import { useEffect, useState } from "react";
import "./style.css";
import WeatherCard from "./WeatherCard"

function Temp() {
 const [searchValue, setSearchValue] = useState("Delhi")
 const [tempInfo, setTempInfo] = useState({})

 const getWeatherInfo = async() =>{
  try{
    let url= `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7276cb9519b07d4aa7b1e70b7fe8a1a4`

    let res = await fetch(url)
    let data = await res.json()
    
    const {temp, humidity, pressure} = data.main;
    const{main:weathermood} = data.weather[0];
    const{sunset,sunrise,country} = data.sys;
    const{name} = data;
    const{speed} = data.wind;
    
    const myNewWeatherInfo ={
      temp, humidity, pressure, weathermood, speed, name, sunset, sunrise, country

    }
    setTempInfo(myNewWeatherInfo)

  }catch(error){
    console.log(error)
  }
 }

 useEffect(() => {
  getWeatherInfo();
 },[])

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            id="search"
            className="serachTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}

          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            search
          </button>
        </div>
      </div>

      <WeatherCard tempInfo={tempInfo} />
      
    </>
  );
}

export default Temp;
