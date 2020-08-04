import React from 'react';
import './App.css';
import 'react-dropzone-uploader/dist/styles.css';
import S3Uploader from './S3Uploader';

function App() {

  return (
    <>
      <div className="app">
        <S3Uploader />
      </div>
    </>
  )
}

export default App;
