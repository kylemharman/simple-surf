import React from 'react'
// styles
import { ForcastListContainer, ForcastHourlyDiv, ForcastListWaveIcon, ForcastListWindIcon, ForcastListSwellIcon, ForcastListP1, ForcastListP2 } from '../styles/ForecastListStyled';
// assets
import swellArrow from '../assets/swell-arrow.svg';
import windArrow from '../assets/wind-arrow.svg';
import waveIcon from '../assets/wave-icon.svg';

const ForecastList = (props) => {

    const convertTime = {
        0: "12am",
        300: "3am",
        600: "6am",
        900: "9am",
        1200: "12pm",
        1500: "3pm",
        1800: "5pm",
        2100: "9pm",
    }
    
    console.log(props.forecast)

    const ListForecast = props.forecast.map( (forecast, index) => {
        return <ForcastHourlyDiv time={props.time} key={index}>
                <h3>{convertTime[forecast.time]}</h3>
                    <div>
                        <ForcastListWaveIcon alt="wave icon" src={waveIcon} />
                        <ForcastListP1>{`${Math.floor(forecast.sigHeight_m * 3.28)}-${Math.ceil(forecast.sigHeight_m * 3.28)}ft`}</ForcastListP1>
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
                </ForcastHourlyDiv>
    })

    return (
        <ForcastListContainer>
            {ListForecast}
        </ForcastListContainer>
    )
}

export default ForecastList;


