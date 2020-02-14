import React from 'react'
import { Container } from '../styles/GlobalStyles';
import { LocationLink} from '../styles/ForecastsPageStyled';

const Favorites = (props) => {

    return (
        <Container margin col >
            <h1>Your Favorites</h1>
            { 
                props.user.favorites ? 
                props.user.favorites.map(location => <LocationLink to={`/location/${location.locationID}`} key={location._id}> {location.name} </LocationLink>) 
                :
                null
            }

        </Container>
    )
}

export default Favorites
