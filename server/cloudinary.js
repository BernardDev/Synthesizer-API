let cloudinary = require('cloudinary').v2;

require('dotenv').config({path: '../.env'});

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
    console.log('result', result);
  } catch (error) {
    console.log('error', error);
  }
}

// testing();

module.exports = cloudinaryUpload;
