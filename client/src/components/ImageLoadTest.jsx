import React, { useState } from 'react';
import firebaseApp from './../Firebase.js'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { resizeFile, dataURIToBlob } from './../resizeFile.js';
import firebaseSignIn from '../FirebaseAuth';
import { useNavigate, useLocation } from 'react-router-dom'



export default function ImageLoadTest({libraryId}) {
  // const { id } = useParams();
  const location = useLocation();
  // const { libraryId } = location.state;
  const navigate = useNavigate();
  console.log("current user?", getAuth().currentUser);
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage(firebaseApp);
  const [selectedImage, setSelectedImage] = useState(null);
  // this creates the firebase ref; use uploadBytes to connect the file to the ref
  const storageRef = ref(storage, `images/${libraryId}.jpg`);
  return (
    <div>
      <h1>Upload and Display Image usign React Hook's</h1>
      {selectedImage && (
        <div>
          <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
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
          resizeFile(uploadedFile)
            .then(resized => {
              const newFile = dataURIToBlob(resized);
              uploadBytes(storageRef, newFile).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                navigate(`/library/${libraryId}`);
              });
              setSelectedImage(uploadedFile);
            })
            .catch(err => {
              console.log(err);
            })
        }}
      />
    </div>
  );
}
