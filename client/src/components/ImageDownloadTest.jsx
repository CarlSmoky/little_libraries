import React, { useState, useEffect } from 'react';
import firebaseApp from './../Firebase.js'
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function ImageDownloadTest() {

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage(firebaseApp);
  const [imageURL, setImageURL] = useState(null);
  // this creates the firebase ref; use uploadBytes to connect the file to the ref
  const storageRef = ref(storage, 'images/album_art.png');
  useEffect(() => {
    getDownloadURL(storageRef)
    .then((url) => {
      console.log("here",url)
      setImageURL(url)
    })
  },[imageURL]);

  return (

      <img src={imageURL} alt='firebase image'/>

  );
}
