const express = require('express');
const PORT = 5000;
const app = express();
const aws = require('aws-sdk');
const fs = require('fs');
const multer = require('multer')
const bodyParser = require('body-parser');

app.use(express.static('public/uploads'));
app.use(bodyParser.urlencoded({ extended: true }));


// Configure multer middleware
const upload = multer({ 
  storage: multer.diskStorage({

    // Upload files to public/uploads
    destination: (req, file, cb) => {
      let uploadDirectory = 'public/uploads/'
      cb(null, uploadDirectory);
    },

    // Give each uploaded file a unique name,
    // so we don't accidentally overwrite existing files
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

  // We can receive other data from the client, too
  console.log('req.body.food', req.body.food);

  // Save image paths to the "DB"
  req.files.forEach(f => {
    imagesDB.push(f.filename)
  });

  res.sendStatus(201);
});

app.post('/upload-to-s3', upload.any(), async (req, res) => {
  for (let file of req.files) {
    // Initialize a "Read stream" to start
    // reading data from this file
    console.log(`uploading ${file.filename}...`)
    await s3.upload({
      Bucket: 'prime-academy-file-upload-demo-2020',
      Key: file.filename,
      // Initialize a "read stream" to read data from
      // the file, and "pipe" it up to S3
      Body: fs.createReadStream(file.path)
    }).promise()
    console.log(`uploading ${file.filename}... done.`)
  }
  res.sendStatus(200);
})

app.get('/images', (req, res) => {
  res.send(imagesDB);
})

app.post('/upload-url', async (req, res) => {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createPresignedPost-property
  let expires = 900;
  console.log('yo');

  s3.createPresignedPost( {
    Bucket: 'prime-academy-file-upload-demo-2020',
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