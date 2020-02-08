import React from 'react'
import ReactTooltip from 'react-tooltip'
// styles
import { MapContainer, MapImage, CompassImage, WindArrowPNG, SwellArrowPNG } from '../styles/StaticLocationMapStyled'
import Compass from '../assets/compass.png';
import windArrow from '../assets/wind-arrow.png'
import swellArrow from '../assets/swell-arrow.png'

const StaticLocationMap = (props) => {

    console.log(props)
    return (
        <MapContainer >
            <CompassImage 
                alt="compass"
                src={Compass}
            />
            <MapImage 
                alt="map image" 
                src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${encodeURIComponent(props.lat)},${encodeURIComponent(props.lng)},12,10/300x300@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`} 
            />
            <WindArrowPNG 
                alt="wind direction arrow"
                src={windArrow}
                windDirection={props.windDirection}
                data-tip={`Wind - ${props.windDirectionCompass} @ ${props.windDirectionSpeed}kph`}
            />
            <SwellArrowPNG 
                alt="swell direction arrow"
                src={swellArrow}
                swellDirection={props.swellDirection}
                data-tip={`Swell - ${props.swellDirectionCompass} @ ${props.swellPeriod}secs`}
            />
            <ReactTooltip effect="solid"/>
        </MapContainer>  
    )
}

export default StaticLocationMap
