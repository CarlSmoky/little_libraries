import React, { useState, useEffect } from 'react';
import firebaseApp from './../Firebase.js'
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function ImageDownloadTest() {

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage(firebaseApp);
  const [imageURL, setImageURL] = useState(null);
  const url = 'https://firebasestorage.googleapis.com/v0/b/little-libraries-ea3cb.appspot.com/o/images%2Fsample_library.jpg?alt=media&token=35b1e831-d995-4ec2-993b-13f5e5d49c18'
  // this creates the firebase ref; use uploadBytes to connect the file to the ref
  const storageRef = ref(storage, 'images/album_art.png');
  useEffect(() => {
    setImageURL(url);

  },[imageURL]);

  return (

      <img src={imageURL} alt='firebase image'/>

  );
}
