import axios from 'axios';
import {useState, useEffect} from 'react'




function App() {
const [data, setData] = useState({});
const [location, setLocation] = useState('');


  //const url ='https://api.openweathermap.org/data/2.5/weather?lat=50&lon=50&appid=3b2867585f7e6faf0bdc0cbca484daa0'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=3b2867585f7e6faf0bdc0cbca484daa0`


 const searchLocation = (e) => {
  if(e.key === 'Enter'){
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    setLocation('')
  }
 }
//get time
// var offset = data.dt;
 //var timeOne = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
 var timezone = data.timezone
 var d = new Date()
 var localTime = d.getTime()
 var localOffset = d.getTimezoneOffset() * 60000
 var utc = localTime + localOffset
 var city = utc + (1000 * timezone)
var timeTwo = new Date(city)

var timeOne = String(timeTwo)

console.log(timeTwo)






 

//bg-gradient-to-t from-purple-600 to-white-300

  return (
    <>
    <div className="App  items-center max-w-[500px]"> 
    <div className='fixed w-full px-4 py-24 z-50   off-white'> 
    <div className='background max-w-[450px] h-[600px] mx-auto   rounded-xl shadow-lg  bg-cyan-500'>
      <div className="container  px-5">
      <div className="search border-solid border-black-300 py-2 pt-7 flex justify-center">
        <input 
        className='searchBar rounded-lg px-2 py-3 text-[1rem] text-black max-w-[100%]'
        type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        />
      </div>
      
      {data.name != undefined && 
      <div className=" text-white text-2xl  ">
        <div className="top grid grid-cols-1 justify-items-center ">
          <div className="location text-5xl px-2 mb-3  ">
            <p className='center mt-4 text-4xl mb-1'>{data.name}</p>
            
            {data.timezone ? <p className='center text-[.9rem]'>{timeOne}</p> : null}
          </div>        
          <div className="temp text-7xl my-7">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>          
        </div>
        <div className="row-cont flex justify-center ">
          <div className='wRow bg-white/50 rounded-3xl grid grid-cols-4 text-xl  my-4 py-3 px-6 max-[420px]:text-sm  mb-11'>    
          <div className="description flex justify-center">
            
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="feels flex justify-center">
            
          {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
          </div>
          <div className="humidity flex justify-center">
          {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
          </div>
          <div className="wind flex justify-center">
          {data.wind ? <p className='bold'>{data.wind.speed}MPH</p> : null}

          </div>
          </div>
          </div>
          <div className="bottom max-w-[500px] ">
            <div className="desc flex justify-between text-[1rem] py-1 px-8">
              <p>Description:</p>
            {data.weather ? <p className='bold'>{data.weather[0].description}</p> : null}
            </div>
            <div className="humidity flex justify-between text-[1rem] py-1 px-8 pb-[.1rem]">
              <p>Humidity:</p>
            {data.main ? <p className='bold'>{data.main.humidity}</p> : null}
            </div>
            <div className="vis flex justify-between text-[1rem] py-1 px-8">
              <p>Visibility:</p>
            {data.visibility}
            </div>
          </div>
      </div>
      }
      </div>
      </div>
      </div>
    </div>
    
    
    
    </>
  );
}

export default App;
