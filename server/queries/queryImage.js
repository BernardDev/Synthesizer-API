const fs = require('fs');

const cloudinaryUpload = require('../cloudinary');
const {Sequelize} = require('../models');
const {Synth} = require('../models');

const folder = '../data/img';

async function addImageToRecord() {
  const synths = await Synth.findAll({limit: 3});
  for (const synth of synths) {
    const image = synth.img;
    const name = synth.name;
    // console.log('name', name);
    var fileName = image.substr(image.lastIndexOf('/') + 1);
    // console.log('result random synth', fileName);
    let match = fs.readdirSync(folder).find((file) => {
      return file === fileName;
    });
    if (!match) {
      console.log('match not found', name, fileName);
    }
    // console.log('match before', match);
    // match = synth.name;
    // console.log('match after', match);
    // console.log('name', name);
    // key=key.replace(" ","_");

    const public_id = name.split(' ').join('_');
    // console.log('public_id', public_id);
    try {
      const response = await cloudinaryUpload(
        `${folder}/${fileName}`,
        public_id
      );
      // console.log('response', response.secure_url);
      await synth.update({img: response.secure_url});
    } catch (error) {
      console.log('error cloudinaryUpload', error, fileName, name);
    }

    // return match;
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

// grabImage().then((record) => console.log(record.dataValues.img));

// var result = /[^/]*$/.exec("foo/bar/test.html")[0];
