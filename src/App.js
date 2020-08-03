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

    const params = { 
      fields: res.data.fields, 
      meta: { 
        fileUrl: `${res.data.url}/${res.data.fields.key}`
      }, 
      url: res.data.url 
    };
    console.log('params', params);

    // ENABLE CORS on your bucket
    /**
      <?xml version="1.0" encoding="UTF-8"?>
      <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
      <CORSRule>
          <AllowedOrigin>http://localhost:3000</AllowedOrigin>
          <AllowedMethod>POST</AllowedMethod>
          <AllowedHeader>*</AllowedHeader>
      </CORSRule>
      </CORSConfiguration>

     */

    return params;
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
