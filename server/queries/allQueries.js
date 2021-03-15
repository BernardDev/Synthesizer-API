const {
  Synth,
  Manufacturer,
  Specification,
  User,
  Suggestion,
} = require('../models');

// const cloudinaryUpload = require('../cloudinary');

async function checkApiKey(key) {
  try {
    const foundUser = await User.findOne({where: {key}});
    if (foundUser) {
      return foundUser.update({count: foundUser.count + 1});
    } else {
      return null;
    }
  } catch (error) {
    console.error('error', error);
    return false;
  }
}

async function postUser(user) {
  const [dbUser, created] = await User.findOrCreate({
    where: {email: user.email},
    defaults: {
      key: user.key,
    },
  });
  return created;
}

async function postSuggestion(suggestion) {
  // console.log('cloudinaryImage', cloudinaryImage);
  try {
    const newSuggestion = await Suggestion.create({
      polyphony: suggestion.polyphony,
      keyboard: suggestion.keyboard,
      control: suggestion.control,
      yearProduced: suggestion.yearProduced,
      memory: suggestion.memory,
      oscillators: suggestion.oscillators,
      filter: suggestion.filter,
      lfo: suggestion.lfo,
      effects: suggestion.effects,
      name: suggestion.name,
      manufacturer: suggestion.manufacturer,
      // image: suggestion.image,
    });
    // console.log('suggestion.img', suggestion.image);
    // let filePath;
    // let fileName;
    // const newImageSuggestion = await cloudinaryUpload(filePath, fileName);
    // console.log('newSuggestion', newSuggestion);
    return newSuggestion;
  } catch (error) {
    console.log('error', error);
    return;
  }
}

// the version with findOrCreate
// async function postSuggestion(suggestion) {
//   const [dbSuggestion, created] = await Suggestion.findOrCreate({
//     where: {name: suggestion.name},
//     defaults: {
// ......
//     },
//   });
//   return created;
// }

async function manufacturersAll(limit, offset) {
  const manufacturers = await Manufacturer.findAndCountAll({limit, offset});
  return manufacturers;
}

async function manufacturerByPk(id) {
  const manufacturer = await Manufacturer.findByPk(id);
  return manufacturer;
}

async function manufacturerByName(name) {
  const manufacturer = await Manufacturer.findOne({
    where: {manufacturer: name},
  });
  return manufacturer;
}

async function synthsAll(
  specificationQuery,
  manufacturerQuery,
  pagination = {limit: 20, offset: 0},
  sortByQuery
) {
  const synths = await Synth.findAndCountAll({
    ...pagination,
    include: [
      {
        model: Specification,
        where: {...specificationQuery},
      },
      {
        model: Manufacturer,
        where: {...manufacturerQuery},
      },
    ],
    order: [[Specification, sortByQuery.sortBy, sortByQuery.sortOrder]],
  });
  return synths;
}

async function synthByPk(id) {
  const synth = await Synth.findByPk(id, {
    include: [
      {
        model: Specification,
      },
      {
        model: Manufacturer,
      },
    ],
  });
  return synth;
}
async function synthByName(name) {
  try {
    const synth = await Synth.findOne({
      where: {name},
      include: [
        {
          model: Specification,
        },
        {
          model: Manufacturer,
        },
      ],
    });

    return synth;
  } catch (error) {
    console.log('error', error);
  }
}

module.exports = {
  checkApiKey,
  postUser,
  postSuggestion,
  manufacturersAll,
  manufacturerByPk,
  manufacturerByName,
  synthsAll,
  synthByPk,
  synthByName,
};
