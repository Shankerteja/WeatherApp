import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import './App.css'
import { FaSearch } from "react-icons/fa";
const key=import.meta.env.VITE_API_KEY

const App = () => {

  const [weatherDetails,setWeatherDetails]=useState([])
  const [city,setCity]=useState("")

  const getWeatherDetails=async ()=>{

 
    const cityName=city ? city : "London"

    try {
      const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${key}`)
      const data=await response.json()
      console.log(data)
      setWeatherDetails({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon:data.weather[0].icon
      })
    } catch (error) {
      console.log(error)
      
    }

  }

  useEffect(()=>{
    getWeatherDetails()
  },[])


  const getCity=(event)=>{
    setCity(event.target.value)

  }
  return (
    <div className='app-container'>
   <h1 className='heading'>Weather App</h1>
   <div className='weather-card'>
    <div className='search-container'>
      <input type='text' placeholder='Search Your City eg:New York' onChange={getCity}/>
      <button onClick={getWeatherDetails} ><FaSearch /></button>
    </div>
   
   {!weatherDetails ? <InfinitySpin
  visible={true}
  width="200"
  color="#4fa94d"
  ariaLabel="infinity-spin-loading"
  /> :
  <>
   <img src={`https://openweathermap.org/img/wn/${weatherDetails.icon}@2x.png`} className='weather-icon' alt='icon'/>
   
   <h1 className='temperature'>
   {weatherDetails.temperature}&#8451;
   </h1>
       <h1 className='city-name'>{weatherDetails.location}</h1>
       <div className='other-details-container'>
   <div className='himidity-container'>
     <h4>Humidity</h4>
     <span>
{weatherDetails.humidity}%
</span>
   </div>
   <div>
     <h4>
       Speed
     </h4>
     <span className='speed'>
       {
       weatherDetails.windSpeed
       }Km/h
     </span>
   </div>
  </div>
  </>
}
  
  </div>
  
    </div>
  )
}

export default App
