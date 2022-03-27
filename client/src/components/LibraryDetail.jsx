import React, { useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // temp


const LibraryDetail = ({libraryInfo}) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const storage = getStorage();

  if (libraryInfo.id) {
    getDownloadURL(ref(storage, `images/${libraryInfo.id}.jpg`))
        .then(url => {
          setSelectedImageUrl(url);
    })
  }

  return (
    <div className="libraryDetails">
      {selectedImageUrl && <img src={selectedImageUrl} alt="photo of library"/>}
      <p>{libraryInfo.address}</p>
    </div>
  )
}

export default LibraryDetail;
