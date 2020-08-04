import React from 'react';
import './App.css';
import 'react-dropzone-uploader/dist/styles.css';
import S3Uploader from './S3Uploader';
import FileUploader from './FileUploader';

function App() {

  return (
    <>
      <div className="app">
        <S3Uploader />
        <FileUploader />
      </div>
    </>
  )
}

export default App;
