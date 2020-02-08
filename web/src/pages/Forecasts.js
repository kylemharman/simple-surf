import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import { Container, H2 } from '../styles/GlobalStyles';
import LocationMap from '../components/LocationMap';
import axios from 'axios'
import { Link } from "@reach/router";

const Forecasts = (props) => {
       
    // rededer a location component
    const [locations, setLocations] = useState(null)
    console.log(locations)

    useEffect(() => {
        axios.get('/locations')
            .then(res => {
                setLocations(res.data)
            })
            .catch(e => console.log(e))
    }, [])


    return (
        <React.Fragment>
            <SearchBar />
            <Container margin>
                <div style={{width: "33%"}}>
                    <H2>Locations</H2>
                    <Container col>
                        {locations ? 
                            locations.map(location => <Link to={`/location/${location._id}`} onClick={{locations}} key={location._id}>{location.name}</Link>)
                        :null
                        }
                    </Container>
                </div>
                <div style={{width:"67%", height: "60vh"}} >
                    <H2>Map</H2>
                    {/* <LocationMap/> */}
                    {/* <div style={{width:"100%", height: "100%", backgroundColor:"darkBlue"}}> </div> */}
                </div>
            </Container>
        </React.Fragment>
    )
}

export default Forecasts
