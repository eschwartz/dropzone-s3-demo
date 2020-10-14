/**
 * API endpoints to handle uploads to AWS S3
 * 
 * See /src/S3Uploader.js for client-side example
 */
const aws = require('aws-sdk');
const fs = require('fs');
const upload = require('../middleware/upload');
const Router = require('express').Router;
const router = Router();


const s3 = new aws.S3();

router.post('/upload-to-s3', upload.any(), async (req, res) => {
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

router.post('/upload-url', async (req, res) => {
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

module.exports = router;