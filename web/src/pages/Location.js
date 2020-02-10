import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReactTooltip from 'react-tooltip'
// components
import ButtonAddToFavourites from '../components/ButtonAddToFavourites';
import StaticLocationMap from '../components/StaticLocationMap';
import ForecastInfo from '../components/ForecastInfo';
import ForecastList from '../components/ForecastList';
import Select from 'react-select';
// styles
import { Container } from '../styles/GlobalStyles';
// assets
import waveIcon from '../assets/wave-icon.svg';
import windIconGrey from '../assets/wind-arrow.svg';
import swellIconGrey from '../assets/swell-arrow.svg';


const Location = (props) => {

    const [forecast, setForecast] = useState(null) 
    const [dailyForecast, setDailyForecast] = useState(null) 
    const [location, setLocation] = useState({});
    const [saveToFavourites, setSaveToFavourites] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Today")

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

    const convertDate = (dateToConvert) => {
        
        if (!dateToConvert) return;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const d = new Date(dateToConvert);
        const dayName = days[d.getDay()];
        const date = dateToConvert.split("-").reverse().slice(0,2).join('/')
     
        return `${dayName}, ${date}`
        
    }

    if (forecast) {
        convertDate()
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
        
        axios.get(`http://api.worldweatheronline.com/premium/v1/marine.ashx?key=${process.env.REACT_APP_WEATHER_API_KEY}&format=json&q=${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}&tide=yes`) // get 24 Hour Report &tp=1
            .then(res => {
                setDailyForecast(res.data.data.weather[0].hourly)
                setForecast(res.data.data.weather)
            })
            .catch(e => console.log(e))
    }

    
    const handleSaveToFavourites = () => {
        // post requset to axois to save this location to the users locations

        setSaveToFavourites(!saveToFavourites)
    }

    const handleForecastSelected = (selectedOption) => {
        setDailyForecast(selectedOption.value)
        setSelectedOption(selectedOption)
    }
    
    return (
        <Container margin col> 
            
                <Container>
                <h1>{location.name}</h1> 
                    <ButtonAddToFavourites value={selectedOption} saved={saveToFavourites} clicked={() => handleSaveToFavourites()}/>
                </Container>

                { forecast ?
                    

                    <React.Fragment>
                        
                        <h3>Current Conditions</h3>
                        <Container wrap={"wrap"}>
                            <ForecastInfo
                                header=""
                                alt="wave icon" 
                                src={waveIcon}
                                dataTip={"Wave height"}
                                title={`${Math.floor(forecast[0].hourly[currentTime].sigHeight_m * 3.28)}-${Math.ceil(forecast[0].hourly[currentTime].sigHeight_m * 3.28)}ft`}
                                body={`.`}  
                            />
                            <ForecastInfo 
                                header=""
                                alt="swell icon" 
                                src={swellIconGrey}
                                rotate={forecast[0].hourly[currentTime].swellDir}
                                dataTip={"Swell direction and period"}
                                title={forecast[0].hourly[currentTime].swellDir16Point}
                                body={`${Math.round(forecast[0].hourly[currentTime].swellHeight_ft)}ft at ${Math.round(forecast[0].hourly[currentTime].swellPeriod_secs)}s`}
                            />
                            <ForecastInfo 
                                header=""   
                                alt="wind icon" 
                                src={windIconGrey}
                                rotate={forecast[0].hourly[currentTime].winddirDegree}
                                dataTip={"Wind direction and speed"}
                                title={forecast[0].hourly[currentTime].winddir16Point}
                                body={`${forecast[0].hourly[currentTime].windspeedKmph} km/h`}  
                            />
                        </Container>

                        <Container>
                            <StaticLocationMap 
                                lat={location.latitude} 
                                lng={location.longitude} 
                                windDirection={forecast[0].hourly[currentTime].winddirDegree} 
                                swellDirection={forecast[0].hourly[currentTime].swellDir}
                                windDirectionCompass={forecast[0].hourly[currentTime].winddir16Point}
                                swellDirectionCompass={forecast[0].hourly[currentTime].swellDir16Point}
                                windDirectionSpeed={forecast[0].hourly[currentTime].windspeedKmph}
                                swellPeriod={forecast[0].hourly[currentTime].swellPeriod_secs}
                            />
                        </Container>

                        <Container>
                            <Container col style={{ marginRight: "20px"}}>
                                {forecast[0].tides[0].tide_data.map( (tide, index) => {
                                    return <p key={index} style={{ margin: "5px"}}>{tide.tide_type.charAt(0).toUpperCase() + tide.tide_type.slice(1).toLowerCase()} Tide: {tide.tideTime}</p>
                                })}
                            </Container>
                            <Container col>
                                <p style={{ margin: "5px"}}>Air Temp - {forecast[0].hourly[currentTime].tempC}&#176;</p>
                                <p style={{ margin: "5px"}}>Sea Temp - {forecast[0].hourly[currentTime].waterTemp_C}&#176;</p>
                                <p style={{ margin: "5px"}}>Sunrise - {forecast[0].astronomy[0].sunrise}</p>
                                <p style={{ margin: "5px"}}>Sunset - {forecast[0].astronomy[0].sunset}</p>
                            </Container>
                        </Container>

                    
                        <h3>Select Forecast</h3> 
                      
                        <div style={{marginBottom: "20px", width:"270px"}}>
                            <Select
                                
                                value={selectedOption} 
                                placeholder={selectedOption}
                                onChange={(selectedOption) => handleForecastSelected(selectedOption)} 
                                options={[
                                    { value: forecast[0].hourly, label: 'Today' },
                                    { value: forecast[1].hourly, label: 'Tomorrow' },
                                    { value: forecast[2].hourly, label: convertDate(forecast[2].date) },
                                    { value: forecast[3].hourly, label: convertDate(forecast[3].date) },
                                    { value: forecast[4].hourly, label: convertDate(forecast[4].date) },
                                    { value: forecast[5].hourly, label: convertDate(forecast[5].date) },
                                    { value: forecast[6].hourly, label: convertDate(forecast[6].date) },
                                ]}
                            />
                        </div>
                        

                        <Container >
                            <ForecastList forecast={dailyForecast} time={currentTime} />
                        </Container>

                        <ReactTooltip effect="solid"/>
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
