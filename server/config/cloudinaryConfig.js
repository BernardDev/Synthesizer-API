const {config, uploader} = require('cloudinary').v2;
// import { config, uploader } from 'cloudinary'

require('dotenv').config();

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    // use_filename: true,
  });
  next();
};

const cloudinaryUploads = () => {};

module.exports = {
  cloudinaryConfig,
  uploader,
};
