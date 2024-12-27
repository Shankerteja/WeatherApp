import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import './App.css'
import { FaSearch } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
const key=import.meta.env.VITE_API_KEY

const App = () => {

  const [weatherDetails,setWeatherDetails]=useState([])
  const [city,setCity]=useState("")

  const getWeatherDetails=async ()=>{

 
    const cityName=city ? city : "nagarkurnool"

    try {
      const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${key}`)
      const data=await response.json()
      console.log(data)
      setWeatherDetails({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon:data.weather[0].icon,
        situation:data.weather[0].description.toUpperCase(),
        time :data.timezone
      
      })
    } catch (error) {
      console.log(error)
      toast.error('City Not Found!!');
      
    }

  }

  useEffect(()=>{
    getWeatherDetails()
  },[])
  const handleSubmit=(e)=>{
    e.preventDefault()
    getWeatherDetails()
  }

  const getCity=(event)=>{
    setCity(event.target.value)

  }

  const currentUTC = new Date().getTime(); 
  const localUTCOffset = new Date().getTimezoneOffset() * 60000; 
  const utcTime = currentUTC + localUTCOffset;
  const localTime = new Date(utcTime + weatherDetails.time * 1000);
  const CurrentTime=localTime.toLocaleString()
  return (
    <div className='app-container'>
        <Toaster />
   <h1 className='heading'>Weather App</h1>
   <div className='weather-card'>
    <form className='search-container' onSubmit={handleSubmit}>
      <input type='search' placeholder='Search Your City eg:Hyderabad' onChange={getCity} id='text' value={city}/>
      <button type='submit' id='button'><FaSearch /></button>
    </form>
   
   {weatherDetails.length==0 ? <InfinitySpin
  visible={true}
  width="200"
  color="brown"
  ariaLabel="infinity-spin-loading"
  /> :
  <>
   <img src={`https://openweathermap.org/img/wn/${weatherDetails.icon}@2x.png`} className='weather-icon' alt='icon'/>
   
   <h1 className='temperature'>
   {weatherDetails.temperature}&#8451;
   </h1>
   <span className='situation'>{weatherDetails.situation}</span>
       <h1 className='city-name'>{weatherDetails.location}</h1>
       <h3 className='time'>
        Current Time :{CurrentTime}
       </h3>
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
