# File Upload Example

## Overview

This repo demonstrates file uploads, including both server-side and client-side code.

We use [multer](https://github.com/expressjs/multer) on the server. This handles `multipart/form-data` uploads from the client, saves the files to a local directory. It then adds a `req.files` property to our express request object, with information about the uploaded files.

On the client, we use [`react-dropzone-uploader`](https://react-dropzone-uploader.js.org/docs/quick-start), which allows drag-and-drop file uploads. Note that could just as easily use a standard HTML form to uploads the file:

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="myFileUpload" />
</form>
```

...or any number of other open source libraries to help with form uploads. 

We also handle uploads to AWS S3.

## Getting Started

Just your standard full-stack React app.

```
npm install
npm run server
npm run client
```

## Using a database

In your proejct applications, you will need to keep track of each image's file path. You will likely also want to track other  "meta-data" about the image -- what's it for, who uplaoded it, etc. 

In this example, I use a JS array on the server to store the image info on the server. IRL, you will want to store this information in a database table. This will allow you to lookup all images belong to a user (for example), and return each image's file path to the client.

## Relevant Code

- [FileUploader.js](./src/FileUploader.js): Client side form component to upload to the server's local file system
- [S3Uploader.js](./src/S3Uploader.js): Client side form component to upload to S3
- [local.router.js](./server/routers/local.router.js): Server-side router to handle local file uploads.
- [s3.router.js](./server/routers/s3.router.js): Server-side router to handle file upload to AWS S3.
- [upload.js](./server/routers/upload.js): Configuration of the `multer` middleware, to handle file uploads