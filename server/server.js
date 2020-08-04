const express = require('express');
const PORT = 5000;
const app = express();
const aws = require('aws-sdk');
const fs = require('fs');
const multer = require('multer')
const path = require('path');

app.use(express.static('public/uploads'));


// Configure multer middlewear
const upload = multer({ 
  storage: multer.diskStorage({

    // Upload files to public/uploads
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },

    // Give the file a unique name
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    }

  })
});

const s3 = new aws.S3();

// Keep images in an array
// (could be a DB, IRL)
const imagesDB = [];

// Arg to `upload.single()` must match name attr in <input>
app.post('/upload', upload.any(), (req, res) => {
  console.log('req.files', req.files);

  // Save image paths to the "DB"
  req.files.forEach(f => {
    imagesDB.push(f.filename)
  });

  res.sendStatus(201);
});

app.get('/images', (req, res) => {
  res.send(imagesDB);
})

app.post('/upload-url', async (req, res) => {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createPresignedPost-property
  let expires = 900;
  console.log('yo');

  s3.createPresignedPost( {
    Bucket: 'nagle-demo-for-sam',
    Expires: expires,
    Fields: {
      key: 'test-file.txt',
    }
  }, (err, data) => {
    if (err) {
      console.error(err);
      res.send(500);
      return;
    }

    res.send(data);
  })

});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});