import React, { useContext } from 'react';
import { Container } from '../styles/GlobalStyles';
import { LocationLink} from '../styles/ForecastsPageStyled';
import { UserContext } from '../contexts/UserContext';

const Favorites = () => {

    const { userInfo } = useContext(UserContext)

    return (
        <Container margin col >
            <h1>Your Favorites</h1>
            { 
                userInfo.favorites ? 
                userInfo.favorites.map(location => <LocationLink to={`/location/${location.locationID}`} key={location._id}> {location.name} </LocationLink>) 
                :
                null
            }
        </Container>
    )
}

export default Favorites
