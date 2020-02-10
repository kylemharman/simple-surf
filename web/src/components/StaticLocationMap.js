import React from 'react'
// styles
import { MapContainer, MapImage, CompassImage, WindArrowPNG, SwellArrowPNG } from '../styles/StaticLocationMapStyled'
import Compass from '../assets/compass.svg';
import windArrow from '../assets/wind-arrow.svg'
import swellArrow from '../assets/swell-arrow.svg'

const StaticLocationMap = (props) => {

    return (
        <MapContainer >
            <CompassImage 
                alt="compass"
                src={Compass}
            />
            <MapImage 
                alt="map image" 
                src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${encodeURIComponent(props.lat)},${encodeURIComponent(props.lng)},12.5,10/300x300@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`} 
            />
            <WindArrowPNG 
                alt="wind direction arrow"
                src={windArrow}
                windDirection={props.windDirection}
                data-tip={`Wind - ${props.windDirectionCompass} @ ${props.windDirectionSpeed} km/h`}
            />
            <SwellArrowPNG 
                alt="swell direction arrow"
                src={swellArrow}
                swellDirection={props.swellDirection}
                data-tip={`Swell - ${props.swellDirectionCompass} @ ${Math.round(props.swellPeriod)}s`}
            />
        </MapContainer>  
    )
}

export default StaticLocationMap
