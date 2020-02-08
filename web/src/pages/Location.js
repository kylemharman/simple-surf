import React, { useState, useEffect } from 'react'
import axios from 'axios';
// components
import ButtonAddToFavourites from '../components/ButtonAddToFavourites';
import StaticLocationMap from '../components/StaticLocationMap';
// styles
import { Container } from '../styles/GlobalStyles';


const Location = (props) => {

    const [location, setLocation] = useState({});
    const [currentForecast, setCurrentForecast] = useState(null)
    const [sunrise, setSunrise] = useState(null)
    const [sunset, setSunset] = useState(null)
    const [tideTimes, setTideTimes] = useState(null)    
    const [saveToFavourites, setSaveToFavourites] = useState(false);
    
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
            console.log('res from location: ', res.data)
            setLocation(res.data)
            getForcast(res.data.longitude,res.data.latitude);
        } catch (e) {
            console.log(e)
        }
    }

    const getForcast = (longitude, latitude) => {
        
        axios.get(`http://api.worldweatheronline.com/premium/v1/marine.ashx?key=${process.env.REACT_APP_WEATHER_API_KEY}&format=json&q=${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}&tide=yes`)
            .then(res => {
                console.log('res from forecast: ', res.data)
                setTideTimes(res.data.data.weather[0].tides[0].tide_data)
                setCurrentForecast(res.data.data.weather[0].hourly[currentTime])
                setSunrise(res.data.data.weather[0].astronomy[0].sunrise)
                setSunset(res.data.data.weather[0].astronomy[0].sunset)
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
                { currentForecast ?
                    <React.Fragment>
                        <Container wrap={"wrap"}>
                        <p style={{ marginRight: "20px"}}>Wave Height - {Math.floor(currentForecast.sigHeight_m * 3.28)}-{Math.ceil(currentForecast.sigHeight_m * 3.28)}ft</p> 
                        <p style={{ marginRight: "20px"}}>Wind Direction - {currentForecast.winddir16Point} @ {currentForecast.windspeedKmph}kph - Gusts {currentForecast.WindGustKmph}kph</p>
                        <p style={{ marginRight: "20px"}}>Swell Direction - {currentForecast.swellDir16Point} @ {Math.round(currentForecast.swellPeriod_secs)}secs</p>
                        
                        {tideTimes.map( (tide, index) => {
                            return <p key={index} style={{ marginRight: "20px"}}>{tide.tide_type.toLowerCase()} Tide: {tide.tideTime}</p>
                        })}

                        <p style={{ marginRight: "20px"}}>Air Temp - {currentForecast.tempC}</p>
                        <p style={{ marginRight: "20px"}}>Sea Temp - {currentForecast.waterTemp_C}</p>
                        <p style={{ marginRight: "20px"}}>Sunrise - {sunrise}</p>
                        <p style={{ marginRight: "20px"}}>Sunset - {sunset}</p>
                        </Container> 
                        
                        <Container >
                            <StaticLocationMap 
                                lat={location.latitude} 
                                lng={location.longitude} 
                                windDirection={currentForecast.winddirDegree} 
                                swellDirection={currentForecast.swellDir}
                                windDirectionCompass={currentForecast.winddir16Point}
                                swellDirectionCompass={currentForecast.swellDir16Point}
                                windDirectionSpeed={currentForecast.windspeedKmph}
                                swellPeriod={currentForecast.swellPeriod_secs}
                            />
                        </Container>

                        <Container>
                            <h1></h1>
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
