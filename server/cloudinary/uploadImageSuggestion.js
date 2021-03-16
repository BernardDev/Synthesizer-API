const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('../config/configCloudinary');

config;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'suggestions',
    format: async (req, file) => 'jpg', // converts whatever to jpg
    public_id: (req, file) => {
      file.originalname = req.body.name.split(' ').join('_');
      return file.originalname;
    },
  },
});

const parser = multer({storage: storage});

module.exports = parser;
