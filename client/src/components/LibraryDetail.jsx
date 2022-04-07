import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // temp
import { Button } from 'react-bootstrap/';
import axios from 'axios';


const LibraryDetail = ({ libraryInfo }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const storage = getStorage();
  const libraryId = libraryInfo.id;
  const [count, setCount] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [countByUser, setCountByUser] = useState("");
  const userId = 2;

  if (libraryInfo.id) {
    getDownloadURL(ref(storage, `images/${libraryInfo.id}.jpg`))
      .then(url => {
        setSelectedImageUrl(url);
      })
      .catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    const endpoints = {
      "VISITS": `http://localhost:3001/api/visits/?libraryId=${libraryId}`
    }
    axios.get(endpoints.VISITS)
      .then(response => {
        const { count } = response.data;
        setCount(count);
      });
  },[libraryId])

  const handleClick = () => {
    const endpoints = {
      "RECORD_VISITS": `http://localhost:3001/api/visits/`
    }

    axios.post(endpoints.RECORD_VISITS, {userId, libraryId})
      .then(response => {
        const { time, count, countByUser } = response.data;
        setCreatedAt(time);
        setCount(count);
        setCountByUser(countByUser);

      });
    
  }

  return (
    <div className="libraryDetails">
      {selectedImageUrl && <img src={selectedImageUrl} alt="photo of library" />}
      <p>{libraryInfo.address}</p>
      <Button onClick={handleClick}>Record Visit</Button>
      {countByUser && <p>You have visited {countByUser} times</p>}
      {createdAt && <p>{createdAt}</p>}
      <p>All users have visited {count} times</p>
      {!selectedImageUrl && <Link to="/upload" state={{libraryId}}>Upload image</Link>}
    </div>
  )
}

export default LibraryDetail;
