import React, { useState, useCallback, useRef, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import './Map.css';
import { formatRelative } from "date-fns";
import Search from './Search';
import Locate from './Locate';
import axios from  'axios';
import firebaseApp from './../Firebase.js'; // temp, probably
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // temp


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
const libraries = ["places"];

// TEMP:
const mockData = [
  {
    lat: 43.68862500497191,
    lng: -79.31379757151502,
    time: new Date(),
    name: "Our Condo"
  }, {
    lat: 43.67021259541388,
    lng: -79.3865904620357,
    time: new Date(),
    name: "Yonge Bloor"
  }, {
    lat: 43.636179346566124,
    lng: -79.34551598826303,
    time: new Date(),
    name: "Cherry Beach"
  }
]

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = useState(mockData);
  const [selected, setSelected] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState();

  const fetchMarkers = () => {
    axios.get('/api/libraries')
    .then(result => {
      console.log(result.data, "here!");
      const dbMarkers = result.data.map(entry => ({
        lat: entry.lat,
        lng: entry.long,
        time: new Date(),
        name: entry.address,
        id: entry.id,
        key: entry.id
      }))

      setMarkers(dbMarkers);
    })
    .catch();
  }
  useEffect(() => {
    fetchMarkers();
  },[]);

  const onMapClick = useCallback((event) => {
    let newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    };
    console.log(newMarker);
    setMarkers((current) => [
      ...current,
      newMarker,
    ]);
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
        zoom={8}
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
              scaledSize: new window.google.maps.Size(30, 30),
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
              <h3>{`Little Library ${selected.name}`}</h3>
              <img src={selectedImageUrl} alt="photo of library" width='100' height='100'/>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
}
export default Map;
