import React, { useState } from 'react';
import firebaseApp from './../Firebase.js'
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function ImageLoadTest() {

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);
const [selectedImage, setSelectedImage] = useState(null);
// this creates the firebase ref; use uploadBytes to connect the file to the ref
const storageRef = ref(storage, 'images/album_art2.png');
console.log(process.env.REACT_APP_TEST);
  return (
    <div>
      <h1>Upload and Display Image usign React Hook's</h1>
      {selectedImage && (
        <div>
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />

      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          const uploadedFile = event.target.files[0];
          // uploadBytes is a firebase function:
          uploadBytes(storageRef, uploadedFile).then((snapshot) => {
              console.log('Uploaded a blob or file!');
            });
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
}
