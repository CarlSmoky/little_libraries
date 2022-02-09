import React from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from '../mapStyles';


function Map() {
  const libraries = ["places"];
  const mapContainerStyle = {
    width: '550px',
    height: '300px'
  };
  const center = {
    lat: 43.654225,
    lng: -79.383186
  }
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={8}
      options={options}
    ></GoogleMap>
  );
}

export default Map;