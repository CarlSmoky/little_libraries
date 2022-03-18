import React from 'react';

const LibraryDetail = ({libraryInfo}) => {
  return (
    <div className="libraryDetails">
      <h1>LibraryDetail</h1>
      <p>name:{libraryInfo.address}</p>
      <p>description:</p>
    </div>
  )
}

export default LibraryDetail;