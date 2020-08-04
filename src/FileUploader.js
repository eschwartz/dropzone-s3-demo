import React from 'react';

function FileUploader() {
  return (
    <>
        <h1>Upload to local server!</h1>
        <form action="/upload" method="post" encType="multipart/form-data">
          <input type="file" name="fileToUpload" id="fileToUpload" />
          <input type="submit" name="submit" />
        </form>
    </>
  )
}

export default FileUploader;