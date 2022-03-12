import React, { useState, useCallback, useRef, useEffect, useContext } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import './Map.css';
import { formatRelative } from "date-fns";
import Search from './Search';
import Locate from './Locate';
import axios from 'axios';
import firebaseApp from './../Firebase.js'; // temp, probably
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // temp
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { markerContext } from '../providers/MarkerProvider';


const mapContainerStyle = {
  width: '550px',
  height: '300px'
};
const center = {
  lat: 43.6884244,
  lng: -79.3137875
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}
const libraries = ["places"];

const Map = () => {
  const { markers, setMarkers } = useContext(markerContext);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  // const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState();

  // const fetchMarkers = () => {
  //   axios.get('/api/libraries')
  //     .then(result => {
  //       console.log(result.data, "here!");
  //       const dbMarkers = result.data.map(entry => ({
  //         lat: entry.lat,
  //         lng: entry.long,
  //         time: new Date(),
  //         name: entry.address,
  //         id: entry.id,
  //         key: entry.id,
  //         registered: true
  //       }))

  //       setMarkers(dbMarkers);
  //     })
  //     .catch();
  // }
  // useEffect(() => {
  //   fetchMarkers();
  // }, []);

  const onMapClick = useCallback((event) => {
    let newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
      registered: false
    };
    console.log(newMarker);
    setMarkers((current) => [
      ...current,
      newMarker,
    ]);
    setSelected(newMarker);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map(marker => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: '/books.png',
              scaledSize: new window.google.maps.Size(24, 24),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
              const storage = getStorage();
              getDownloadURL(ref(storage, `images/${marker.id}.jpg`))
                .then(url => {
                  setSelectedImageUrl(url);
                })
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
              setSelectedImageUrl(null);
            }}
          >
            <div>
            {selected.registered && <h3>{`Little Library ${selected.name}`}</h3>}
            {selected.registered && <img src={selectedImageUrl} alt="photo of library" width='100' height='100' />}
            {!selected.registered &&
            <Link
              to="/libraryForm"
              state={{ lat: selected.lat,
                      lng: selected.lng}}
            >
              Register Library
            </Link>}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
}
export default Map;
