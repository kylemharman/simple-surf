import React, { useState, useEffect } from 'react'
import axios from 'axios';
// components
import ButtonAddToFavourites from '../components/ButtonAddToFavourites';
import StaticLocationMap from '../components/StaticLocationMap';
// styles
import { Container } from '../styles/GlobalStyles';


const Location = (props) => {

    const [location, setLocation] = useState({});
    const [forecast, setForecast] = useState(null) 
    const [saveToFavourites, setSaveToFavourites] = useState(false);
    
    console.log(forecast)

    const timeMap = {
        0: 0,
        1: 0,
        2: 0,
        3: 1,
        4: 1,
        5: 1,
        6: 2,
        7: 2,
        8: 2,
        9: 3,
        10: 3,
        11: 3,
        12: 4,
        13: 4,
        14: 4,
        15: 5,
        16: 5,
        17: 5,
        18: 6,
        19: 6,
        20: 6,
        21: 7,
        22: 7,
        23: 7,
    }

    const getUsersTime = () => {
        let date = new Date();
        let hour = date.getHours();  

        return timeMap[hour]
    }
    const currentTime = getUsersTime();
    
    useEffect(() => {
        getLocation();
    }, []); 

    const getLocation = async () => {
        try {
            const res = await axios.get(`/locations/${props.id}`)
            setLocation(res.data)
            getForcast(res.data.longitude,res.data.latitude);
        } catch (e) {
            console.log(e)
        }
    }

    const getForcast = (longitude, latitude) => {
        
        axios.get(`http://api.worldweatheronline.com/premium/v1/marine.ashx?key=${process.env.REACT_APP_WEATHER_API_KEY}&format=json&q=${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}&tide=yes`)
            .then(res => {
                setForecast({
                    currentForecast: res.data.data.weather[0].hourly[currentTime],
                    outlookForecast: res.data.data.weather[0].hourly,
                    tideTimes: res.data.data.weather[0].tides[0].tide_data,
                    sunrise: res.data.data.weather[0].astronomy[0].sunrise,
                    sunset: res.data.data.weather[0].astronomy[0].sunset
                })
            })
            .catch(e => console.log(e))
    }

    const handleSaveToFavourites = () => {
        // post requset to axois to save this location to the users locations

        setSaveToFavourites(!saveToFavourites)
    }
    

    return (
        <Container margin col> 
            <Container>
            <h1>{location.name}</h1> 
                <ButtonAddToFavourites saved={saveToFavourites} clicked={() => handleSaveToFavourites()}/>

        </Container>
                { forecast ?
                    <React.Fragment>
                        <Container wrap={"wrap"}>
                        <p style={{ marginRight: "20px"}}>Wave Height - {Math.floor(forecast.currentForecast.sigHeight_m * 3.28)}-{Math.ceil(forecast.currentForecast.sigHeight_m * 3.28)}ft</p> 
                        <p style={{ marginRight: "20px"}}>Wind Direction - {forecast.currentForecast.winddir16Point} @ {forecast.currentForecast.windspeedKmph}kph - Gusts {forecast.currentForecast.WindGustKmph}kph</p>
                        <p style={{ marginRight: "20px"}}>Swell Direction - {forecast.currentForecast.swellDir16Point} @ {Math.round(forecast.currentForecast.swellPeriod_secs)}secs</p>
                        
                        {forecast.tideTimes.map( (tide, index) => {
                            return <p key={index} style={{ marginRight: "20px"}}>{tide.tide_type.toLowerCase()} Tide: {tide.tideTime}</p>
                        })}

                        <p style={{ marginRight: "20px"}}>Air Temp - {forecast.currentForecast.tempC}</p>
                        <p style={{ marginRight: "20px"}}>Sea Temp - {forecast.currentForecast.waterTemp_C}</p>
                        <p style={{ marginRight: "20px"}}>Sunrise - {forecast.sunrise}</p>
                        <p style={{ marginRight: "20px"}}>Sunset - {forecast.sunset}</p>
                        </Container> 
                        
                        <Container >
                            <StaticLocationMap 
                                lat={location.latitude} 
                                lng={location.longitude} 
                                windDirection={forecast.currentForecast.winddirDegree} 
                                swellDirection={forecast.currentForecast.swellDir}
                                windDirectionCompass={forecast.currentForecast.winddir16Point}
                                swellDirectionCompass={forecast.currentForecast.swellDir16Point}
                                windDirectionSpeed={forecast.currentForecast.windspeedKmph}
                                swellPeriod={forecast.currentForecast.swellPeriod_secs}
                            />
                        </Container>

                        <h1>Todays Outlook</h1>
                        <Container>
                            {forecast.outlookForecast.map( (forecast, index) => {
                                return <Container col key={index} style={{ marginRight: "20px"}}>
                                        
                                        <p>{forecast.time}</p>
                                        
                                        <h6>{Math.floor(forecast.sigHeight_m * 3.28)}-{Math.ceil(forecast.sigHeight_m * 3.28)}ft</h6>
                                        <p style={{ margin: "0"}}>Wave Height</p>
                                        
                                        <h6>{forecast.winddir16Point} @ {forecast.windspeedKmph}kph</h6>
                                        <p style={{ margin: "0"}}>Wind</p>
                                        
                                        <h6>{forecast.swellDir16Point} @ {Math.round(forecast.swellPeriod_secs)}secs</h6>
                                        <p style={{ margin: "0"}}>Swell</p>
                                    </Container>
                            })};
                        </Container>
                        
                    </React.Fragment> 
                    : 
                    <React.Fragment>
                        <h3>Loading...</h3>
                    </React.Fragment>
                }
               

            
        </Container>
    )
}

export default Location
