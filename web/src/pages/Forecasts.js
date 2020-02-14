import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMapGl, {Marker, Popup, } from 'react-map-gl';
import { Link, navigate } from "@reach/router";
import Select from 'react-select'
// styles
import { Container, H2 } from '../styles/GlobalStyles';
import { LocationLink, MapContainer, ListContainer, MapViewButton } from '../styles/ForecastsPageStyled';
import '../styles/mapOverRide.css'
// assets
import marker from '../assets/location-marker.svg';


const Forecasts = () => {
    
    // map
    const [showMap, setShowMap] = useState(true) 
    const [selectedLocation, setSelectedLoation] = useState(null) // location selected on map
    const [ viewport, setViewport] = useState({ // set initial map values
        latitude: -21.814,
        longitude: 0.000,
        width: "100%",
        height: "100%",
        zoom: 1.15
    })

    // location selections
    const [locations, setLocations] = useState(null); // gets all locations from db
    const [selectedCountryGroup, setSelectedCountryGroup] = useState("Select Location"); // gets all locations from db
    const [selectedOption, setSelectedOption] = useState("Search"); // selected location from dropdown

    const handleSelectedCountryGroup = (selectedCountryGroup) => {
        setSelectedCountryGroup(selectedCountryGroup.value)
        handleGetLocations(selectedCountryGroup.value)
        setViewport({
            latitude: selectedCountryGroup.latitude,
            longitude: selectedCountryGroup.longitude,
            width: "100%",
            height: "100%",
            zoom: selectedCountryGroup.zoom
        })

    }

    const handleGetLocations = (locationGroup) => {
        axios.get(`/location-search/${locationGroup}`)
            .then(res => {
                setLocations(res.data)
            })
            .catch(e => console.log(e))
    }

    const handleSelectedOption = (selectedOption) => {
        setSelectedOption(selectedOption.value)
        navigate(`location/${selectedOption.id}`)
    }

    const handleShowMap = () => {
        setShowMap(!showMap)
    }

    return (
        <React.Fragment>
            <Container margin>
                <ListContainer>
                    
                    <div style={{marginBottom: "10px", width: "270px"}}>
                        <H2>Select Location</H2>
                        <Select
                            value={selectedCountryGroup} 
                            placeholder={selectedCountryGroup}
                            onChange={(selectedCountryGroup) => handleSelectedCountryGroup(selectedCountryGroup)} 
                            options={[
                                { value: "Australasia", label: "Australasia", latitude: -29.365, longitude: 134.805, zoom: 2.5 },
                                { value: "Europe", label: "Europe", latitude: 52.815, longitude: 4.208, zoom: 2.5},
                            ]}
                        />
                    </div>

                    <div style={{marginBottom: "10px", width: "270px"}}>
                        { locations ?
                            <Select
                                value={selectedOption} 
                                placeholder={selectedOption}
                                onChange={ (selectedOption) => handleSelectedOption(selectedOption)} 
                                options={ 
                                    locations.map( location => {
                                        return { value: location.name, label: location.name, id: location._id }
                                    })
                                }
                            />
                            : null 
                        }
                    </div>

                    {locations ? 
                        locations.map(location => <LocationLink to={`/location/${location._id}`} key={location._id}>{location.name}</LocationLink>)
                    : null }

                </ListContainer>
               
                <MapContainer>
                    <MapViewButton active={showMap} onClick={() => handleShowMap()}> Map View </MapViewButton> 

                    <div style={{width:"100%", height: "80vh"}} >
                    
                    { showMap ? 
                        <ReactMapGl 
                            {...viewport}
                            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                            onViewportChange={ viewport => setViewport(viewport)}
                            mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
                        >
                            { locations ? 
                                locations.map((location) => {

                                return <Marker 
                                            key={location._id} 
                                            latitude={location.coordinates[0]} 
                                            longitude={location.coordinates[1]}
                                            offsetLeft={-20}
                                            offsetTop={-20}
                                        >
                                        <button style={{background: "none", border:"none", cursor:"pointer"}}
                                                onClick={ () => navigate(`/location/${location._id}`)  }
                                                onMouseOver={ e => {
                                                    e.preventDefault();
                                                    setSelectedLoation(location)
                                                }}
                                                onMouseLeave={ e => {
                                                    e.preventDefault();
                                                    setSelectedLoation(null)
                                                }}
                                        >
                                            <img src={marker} alt="wave icon" style={{width: "30px", height: "30px"}}/>
                                        </button>
                                    </Marker>
                                })
                                : null
                            }
                            { selectedLocation ? (
                                <Popup
                                    latitude={selectedLocation.coordinates[0]} 
                                    longitude={selectedLocation.coordinates[1]}
                                    style={{ background: "#2684ffb3", border: " 2px solid #2684ff ", } }
                                >
                                    <div>
                                    <h4 style={{margin:"0px"}}>{selectedLocation.name}</h4>
                                    <p style={{margin:"5px 0 0 0"}}>Begginer Friendly</p>
                                    </div>
                                </Popup>
                            ) : null}
                        </ReactMapGl>
                    : null }
                    </div>
                </MapContainer>

            </Container>
        </React.Fragment>
    )
}

export default Forecasts
