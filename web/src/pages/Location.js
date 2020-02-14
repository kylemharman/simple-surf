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
import windIcon from '../assets/wind-arrow.svg';
import swellIcon from '../assets/swell-arrow.svg';
import starIcon from '../assets/star.svg';


const Location = (props) => {

    const [forecast, setForecast] = useState(null) 
    const [dailyForcast, setDailyForcast] = useState(null) 
    const [location, setLocation] = useState({});
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
            getForcast(res.data.coordinates[0],res.data.coordinates[1]);
        } catch (e) {
            console.log(e)
        }
    }

    const getForcast = (latitude, longitude) => {
        
        axios.get(`https://api.worldweatheronline.com/premium/v1/marine.ashx?key=${process.env.REACT_APP_WEATHER_API_KEY}&format=json&q=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&tide=yes`) // get 24 Hour Report &tp=1
            .then(res => {
                setDailyForcast(res.data.data.weather[0].hourly)
                setForecast(res.data.data.weather)
            })
            .catch(e => console.log(e))
    }

    const locationRating = () => {
        const windScore = location.wind_rating[forecast[0].hourly[currentTime].winddir16Point]
        const swellScore = location.swell_rating[forecast[0].hourly[currentTime].swellDir16Point]

        return Math.floor((windScore + swellScore) / 2)
    }

    const tooltipRating = {
        1: "1/5 Bad",
        2: "2/5 OK",
        3: "3/5 Good",
        4: "4/5 Excellent",
        5: "5/5 Perfect"
    }


    const handleForecastSelected = (selectedOption) => {
        setDailyForcast(selectedOption.value)
        setSelectedOption(selectedOption)
    }
    
    return (
        <Container margin col> 
            
                <Container center>
                <h1 style={{marginRight: "30px"}}>{location.name}</h1> 
                    <ButtonAddToFavourites 
                        favourite={ props.user.favorites.some(userFav => userFav.locationID === location._id) } 
                        clicked={() => props.addToFavorites(location)} 
                    />
                </Container>

                { forecast ?
                    <React.Fragment>

                        <h3>Current Conditions</h3>
                        <Container>
                            <div>
                                <Container wrap={"wrap"}>
                                    <ForecastInfo
                                        alt="wave icon" 
                                        src={waveIcon}
                                        dataTip={"Wave height"}
                                        title={`${Math.floor(forecast[0].hourly[currentTime].sigHeight_m * 3.28)}-${Math.ceil((forecast[0].hourly[currentTime].sigHeight_m * 3.28) * 1.5 )}ft`}
                                        body={`.`}  
                                    />
                                    <ForecastInfo 
                                        alt="swell icon" 
                                        src={swellIcon}
                                        rotate={forecast[0].hourly[currentTime].swellDir}
                                        dataTip={"Swell direction and period"}
                                        title={forecast[0].hourly[currentTime].swellDir16Point}
                                        body={`${Math.round(forecast[0].hourly[currentTime].swellHeight_ft)}ft at ${Math.round(forecast[0].hourly[currentTime].swellPeriod_secs)}s`}
                                    />
                                    <ForecastInfo 
                                        alt="wind icon" 
                                        src={windIcon}
                                        rotate={forecast[0].hourly[currentTime].winddirDegree}
                                        dataTip={"Wind direction and speed"}
                                        title={forecast[0].hourly[currentTime].winddir16Point}
                                        body={`${forecast[0].hourly[currentTime].windspeedKmph} km/h`}  
                                    />
                                    <ForecastInfo 
                                        alt="star icon" 
                                        src={starIcon}
                                        dataTip={tooltipRating[locationRating()]}
                                        title={`${locationRating()}/5`}
                                        body={`.`}  
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

                            </div>
                            <div style={{marginLeft: "80px"}}>
                                <StaticLocationMap 
                                    lat={location.coordinates[0]} 
                                    lng={location.coordinates[1]} 
                                    windDirection={forecast[0].hourly[currentTime].winddirDegree} 
                                    swellDirection={forecast[0].hourly[currentTime].swellDir}
                                    windDirectionCompass={forecast[0].hourly[currentTime].winddir16Point}
                                    swellDirectionCompass={forecast[0].hourly[currentTime].swellDir16Point}
                                    windDirectionSpeed={forecast[0].hourly[currentTime].windspeedKmph}
                                    swellPeriod={forecast[0].hourly[currentTime].swellPeriod_secs}
                                />
                            </div> 

                        </Container>

                        <h3>Select Forecast</h3> 
                      
                        <div style={{marginBottom: "20px", width:"270px"}}>
                            <Select
                                value={selectedOption} 
                                placeholder={selectedOption}
                                onChange={(selectedOption) => handleForecastSelected(selectedOption)} 
                                options={ 
                                    forecast.map( (dailyforecast, index) => {
                                        if ( dailyforecast.hourly[index] ) {
                                            if ( index === 0 ) return { value: dailyforecast.hourly, label: "Today" }
                                            if ( index === 1 ) return { value: dailyforecast.hourly, label: "Tomorrow" }
                                            else return { value: dailyforecast.hourly, label: convertDate(dailyforecast.date) }
                                        }
                                    })
                                }
                            />
                        </div>

                        <Container col>
                            <p style={{ color: "#0ABF04", fontWeight: "700px" }}>Best time to surf for beginners.</p>
                            <ForecastList forecast={dailyForcast} time={currentTime} location={location} />
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
