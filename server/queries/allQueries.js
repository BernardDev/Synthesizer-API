const {Synth, Manufacturer, Specification, User} = require('../models');

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

// -----------------------------------------

async function synthsAll(
  specificationQuery,
  manufacturerQuery,
  pagination = {limit: 20, offset: 0}
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
  manufacturersAll,
  manufacturerByPk,
  manufacturerByName,
  synthsAll,
  synthByPk,
  synthByName,
};
