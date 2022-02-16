import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function ImageDownloadTest() {
  const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  };
  const firebaseApp = initializeApp(firebaseConfig);

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage(firebaseApp);
  const [imageURL, setImageURL] = useState(null);
  // this creates the firebase ref; use uploadBytes to connect the file to the ref
  const storageRef = ref(storage, 'images/album_art.png');
  useEffect(() => {
    getDownloadURL(storageRef)
    .then((url) => {
      setImageURL(url)
    })
  },[imageURL]);

  return (

      <img src={imageURL} alt='firebase image'/>
    
  );
}
