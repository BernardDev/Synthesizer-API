const {Synth, Manufacturer, Specification} = require('../models');

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
async function synthByName(synthName) {
  try {
    const synth = await Synth.findOne({
      where: {name: synthName},
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

// Lookup one random synth ()
// GET /synth/getRandom

// ...

// Lookup all synths by synth type
// GET /synths/synthType/:name

// ...

// Lookup all synths by interface feature
// GET /synths/interfaceFeature/:name

// ...

// Lookup all synths by format
// GET /synths/format/:name

// ...

module.exports = {
  manufacturersAll,
  manufacturerByPk,
  manufacturerByName,
  synthsAll,
  synthByPk,
  synthByName,
};
