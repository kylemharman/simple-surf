import React from 'react'
import { ForcastInfoContainer, ForcastInfoIcon } from '../styles/ForcastInfoStyled'; 


const ForecastInfo = (props) => {
    

    return (
        <React.Fragment>
            <ForcastInfoContainer data-tip={props.dataTip}>
                <p>{props.header}</p>
                <ForcastInfoIcon alt={props.alt} src={props.src} rotate={props.rotate}/>
                <h5>{props.title}</h5>
                <p>{props.body}</p>
            </ForcastInfoContainer>
        </React.Fragment>
    )
}

export default ForecastInfo
