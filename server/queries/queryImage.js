const fs = require('fs');

const cloudinaryUpload = require('../cloudinary');
const {Sequelize} = require('../models');
const {Synth} = require('../models');

const folder = '../data/img';

async function addImageToRecord() {
  const synths = await Synth.findAll();
  for (const synth of synths) {
    const image = synth.img;
    const name = synth.name;
    var fileName = image.substr(image.lastIndexOf('/') + 1);
    let match = fs.readdirSync(folder).find((file) => {
      return file === fileName;
    });
    if (!match) {
      console.log('match not found', name, fileName);
    }

    const public_id = name.split(' ').join('_');
    try {
      const response = await cloudinaryUpload(
        `${folder}/${fileName}`,
        public_id
      );
      await synth.update({img: response.secure_url});
    } catch (error) {
      console.log('error cloudinaryUpload', error, fileName, name);
    }
  }
}

async function findOneRandomSynth() {
  try {
    const record = await Synth.findOne({
      order: Sequelize.literal('random()'),
    });
    return record;
  } catch (error) {
    console.log('error', error);
  }
}

addImageToRecord();
