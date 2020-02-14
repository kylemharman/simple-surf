import React from 'react'
// styles
import { ForcastListContainer, ForcastHourlyDiv, ForcastListWaveIcon, ForcastListWindIcon, ForcastListSwellIcon, ForcastListP1, ForcastListP2 } from '../styles/ForecastListStyled';

// assets
import swellArrow from '../assets/swell-arrow.svg';
import windArrow from '../assets/wind-arrow.svg';
import waveIcon from '../assets/wave-icon.svg';
import starIcon from '../assets/star.svg';

const ForecastList = (props) => {

    const convertTime = {
        0: "12am",
        300: "3am",
        600: "6am",
        900: "9am",
        1200: "12pm",
        1500: "3pm",
        1800: "6pm",
        2100: "9pm",
    }

    const locationRating = (index) => {
        const windScore = props.location.wind_rating[props.forecast[index].winddir16Point]
        const swellScore = props.location.swell_rating[props.forecast[index].swellDir16Point]
        
        return Math.floor((windScore + swellScore) / 2) 
    }
    
    const ListForecast = props.forecast.map( (forecast, index) => {
        return <ForcastHourlyDiv 
                    style={ (forecast.sigHeight_m * 3.28) * 1.5 <= 3 ? { border: `2px solid #0ABF04`} : null }
                    time={props.time} 
                    key={index} 
                    className={`time${index}`}
                >
                <h3>{convertTime[forecast.time]}</h3>
                    <div>
                        <ForcastListWaveIcon alt="wave icon" src={waveIcon} />
                        <ForcastListP1>{`${Math.floor(forecast.sigHeight_m * 3.28)}-${Math.ceil((forecast.sigHeight_m * 3.28) * 1.5 )}ft`}</ForcastListP1>
                    </div>
                    <div>
                        <ForcastListSwellIcon alt="swell icon" src={swellArrow} rotateSwell={forecast.swellDir}/>
                        <ForcastListP1> {forecast.swellDir16Point} </ForcastListP1>
                        <ForcastListP2> {`${Math.round(forecast.swellHeight_ft)}ft at ${Math.round(forecast.swellPeriod_secs)}s`} </ForcastListP2>
                    </div>
                    <div>
                        <ForcastListWindIcon alt="wind icon" src={windArrow} rotateWind={forecast.winddirDegree} />
                        <ForcastListP1> {forecast.winddir16Point} </ForcastListP1>
                        <ForcastListP2>{`${forecast.windspeedKmph} km/h`}</ForcastListP2>
                    </div>
                    <div>
                        <div style={{flexDirection: "row", margin: "0px"}}>
                            <ForcastListWaveIcon alt="star icon" src={starIcon} />
                        </div>
                        <p >{`${locationRating(index)}/5`}</p> 
                    </div>
                </ForcastHourlyDiv>
    })

    return (
        <ForcastListContainer>
            {ListForecast}
        </ForcastListContainer>
    )
}

export default ForecastList;


