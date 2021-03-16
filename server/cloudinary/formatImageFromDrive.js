let cloudinary = require('cloudinary').v2;
require('dotenv').config({path: '../.env'});
const config = require('../config/configCloudinary');

config;

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
  } catch (error) {
    console.log('error', error);
  }
}

// testing();

module.exports = cloudinaryUpload;
