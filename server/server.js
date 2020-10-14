const express = require('express');
const PORT = 5000;
const app = express();
const aws = require('aws-sdk');
const fs = require('fs');
const multer = require('multer')
const bodyParser = require('body-parser');
const localUploadRouter = require('./routers/local.router');
const s3UploadRouter = require('./routers/s3.router');

// IMPORTANT: uploaded files will
// be saved to /public/uploads
// Serve these files, so our React client can access them,
// and display the images.
app.use(express.static('public/uploads'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
// 
// Handles local file uploads
app.use('/', localUploadRouter);

// Handles file uploads to S3
app.use('/', s3UploadRouter)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});