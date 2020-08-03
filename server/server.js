const express = require('express');
const PORT = 5000;
const app = express();
const aws = require('aws-sdk');

const s3 = new aws.S3();

app.post('/upload-url', async (req, res) => {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createPresignedPost-property
  let expires = 900;
  console.log('yo');


  let url;
  try {
    url = await s3.getSignedUrlPromise("putObject", {
      Bucket: 'nagle-demo-for-sam',
      Key: 'test-file',
      Expires: expires
    });
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }

  res.send({
    expires,
    url
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});