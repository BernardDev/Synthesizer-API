let cloudinary = require('cloudinary').v2;
// require('dotenv').config();

require('dotenv').config({path: '../.env'});
// require('dotenv').config();

// console.log('process.env', process.env);

const CLOUDI_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDI_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDI_NAME = process.env.CLOUDINARY_NAME;

cloudinary.config({
  cloud_name: CLOUDI_NAME,
  api_key: CLOUDI_API_KEY,
  api_secret: CLOUDI_API_SECRET,
  use_filename: true,
});

function cloudinaryUpload(filePath, fileName) {
  const promiseObject = new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {public_id: fileName},
      function (error, result) {
        // console.log(result, error);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
  return promiseObject;
}

async function testing() {
  try {
    const result = await cloudinaryUpload(path, fileName);
    // const result = await cloudinaryUpload('./test7.jpg', 'cuteDog');
    console.log('result', result);
  } catch (error) {
    console.log('error', error);
  }
}

// testing();

module.exports = cloudinaryUpload;

// sh-101 | http/asdyuibsfe/sh101 ()
// sh-101 | sh101 (select)
// sh-101 | sh-101 (rename)
// sh-101 | http/cloudinary/sh101 (upload)

// -----
// {use_filename: true}
// {public_id: `${name}`}

// { use_filename: true }

// script dat all images upload
// nu hebben de image een random name
