import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const LocationMap = (props) => {

  // const lat = Number(props.lat)
  // const lng = Number(props.lng)
  // const zoom = 13;

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        defaultZoom={13}
      >
        <AnyReactComponent
          lat={props.lat}
          lng={props.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}


export default LocationMap;
