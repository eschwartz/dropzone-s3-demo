const express = require('express');
const PORT = 5000;
const app = express();
const aws = require('aws-sdk');

const s3 = new aws.S3();

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