import React from 'react';
import './App.css';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';

function App() {
  // specify upload params and url for your files
  const getUploadParams = async ({ meta }) => { 
    const res = await axios.post('/upload-url');
    console.log("POST /upload-url", res.data);

    return { 
      url: res.data.url 
    };
  }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <>
      <div className="app">

        <h1>Upload Files!</h1>
        <Dropzone
          getUploadParams={getUploadParams}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  )
}

export default App;
