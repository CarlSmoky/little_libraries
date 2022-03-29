import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // temp


const LibraryDetail = ({ libraryInfo }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const storage = getStorage();
  const libraryId = libraryInfo.id;

  if (libraryInfo.id) {
    getDownloadURL(ref(storage, `images/${libraryInfo.id}.jpg`))
      .then(url => {
        setSelectedImageUrl(url);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="libraryDetails">
      {selectedImageUrl && <img src={selectedImageUrl} alt="photo of library" />}
      <p>{libraryInfo.address}</p>
      {!selectedImageUrl && <Link to="/upload" state={{libraryId}}>Upload image</Link>}
    </div>
  )
}

export default LibraryDetail;
