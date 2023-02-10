import './App.css';
import { TextField,Avatar, Card, CardContent, Grid } from '@mui/material';
// import { border, borderRadius } from '@mui/system';
import { useEffect, useState } from 'react';
import { API_KEY } from './apikey';
import axios from 'axios';

function App() {
  const [data,setData] = useState(null)
  const [searchCity,setSearchCity] = useState("phagwara")

  let baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
  
  useEffect(()=> {
    const getWeather = () => {
      axios.get(baseURL)
          .then((res)=>{
            setData(res.data)
            // console.log("Open Weather",res);
          })
          .catch((e)=>{
            console.log(e.message)
          })
    }
    getWeather()
  },[baseURL])


  function handleChange(event){
    setSearchCity(event.target.value)
  }

  return (
    <div className='wrapper'>
      <Card
        sx={{
          width:600,
          color:"#ffffff",
          border:2,
          borderColor:"whiteSmoke",
          borderRadius:4,
          backgroundColor:"#808080"
        }}  
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item sm={5} md ={5}>
                <TextField
                  id="filled-search"
                  placeholder='Enter the city name'
                  type="search"
                  variant="filled"
                  style={{borderRadius:20,marginTop:20,backgroundColor:"whiteSmoke"}}
                  onChange={handleChange}
                /> 
              </Grid>  
              <Grid item sm={7} md ={7}>
                  <h1 style={{color:"#FDEE01"}}>
                    {data && data.name}, {data && data.sys && data.sys.country}
                  </h1>
              </Grid>   
              <Grid item sm={5} md ={5}>
                <Avatar
                  alt='Weather'
                  sx={{
                    width:150,
                    height:150,
                    border:3,
                    borderColor:"#FDEE01"
                  }}
                  src={`http://openweathermap.org/img/wn/${data && data.weather.length !== 0 && data.weather[0].icon}@2x.png`}
                />
              </Grid> 
              <Grid item sm={7} md ={7}>
                <h1>Temperature :{data && data.main.temp} C</h1>
              </Grid>
              <Grid item sm={4} md={4}>
                  <p> Minimum: {data && data.main.temp_min} C</p>
              </Grid>
              <Grid item sm={4} md={4}>
                  <p> Maximum: {data && data.main.temp_max} C</p>
              </Grid>
              <Grid item sm={4} md={4}>
                  <p> Pressure: {data && data.main.pressure} </p>
              </Grid>
              <Grid item sm={4} md={4}>
                  <p> Humidity: {data && data.main.humidity} </p>
              </Grid>
              <Grid item sm={4} md={4}>
                  <p> Wind Speed: {data && data.wind.speed}</p>
              </Grid>
              <Grid item sm={4} md={4}>
                  <p> Wind degree: {data && data.wind.deg}</p>
              </Grid>
            </Grid>   
        </CardContent>
        </Card>
    </div>
  );
}

export default App;