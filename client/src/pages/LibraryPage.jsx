import React, { useEffect, useState } from 'react';
import LibraryDetail from '../components/LibraryDetail';
import Map from '../components/Map';
import axios from "axios";
import { useParams } from 'react-router-dom'


const LibraryPage = () => {
  const { id } = useParams();
  const [libraryInfo, setLibraryInfo] = useState({
    id: '',
    address: '',
    lat: '',
    long: '',
    img_url: ''}
    );

  useEffect(() => {
    axios.get(`http://localhost:3001/api/libraries/${id}`)
      .then(res => {
        const {id, address, lat, long, img_url } = res.data;
        setLibraryInfo({id, address, lat, long, img_url})
        
      })
      .catch (err => {
        console.log(err)
      })
    }, [id]);
  return (
    <div>
      <LibraryDetail libraryInfo={libraryInfo}/>
      <Map id={id} />
    </div>
  )
}

export default LibraryPage