const {Synth, Manufacturer, Specification} = require('../models');
const {Op} = require('sequelize');

async function manufacturersAll(limit, offset) {
  const manufacturers = await Manufacturer.findAndCountAll({limit, offset});
  return manufacturers;
}

async function manufacturerByPk(id) {
  const manufacturer = await Manufacturer.findByPk(id);
  return manufacturer.get({plain: true});
}
// manufacturerByPk(200).then((manufacturer) => console.log(manufacturer));

async function manufacturerByName(name) {
  const manufacturer = await Manufacturer.findOne({where: {name: name}});
  return manufacturer.get({plain: true});
}

// manufacturerByName('Roland').then((manufacturer) => console.log(manufacturer));

async function manufacturerByIdWithSynth(id) {
  const manufacturer = await Manufacturer.findByPk(id, {
    include: {
      model: Synth,
    },
  });
  return manufacturer.get({plain: true});
}

async function manufacturerByNameWithSynth(name) {
  const manufacturer = await Manufacturer.findOne({
    where: {name: name},
    include: {
      model: Synth,
    },
  });
  return manufacturer.get({plain: true});
}

// manufacturerWithSynth('Teisco').then((manufacturer) => console.log(manufacturer));

async function manufacturerByIdWithSynthAndSpecs(id) {
  const manufacturer = await Manufacturer.findByPk(id, {
    include: {
      model: Synth,
      include: {
        model: Specification,
      },
    },
  });
  return manufacturer.get({plain: true});
}

async function manufacturerByNamedWithSynthAndSpecs(name) {
  const manufacturer = await Manufacturer.findOne({
    where: {name: name},
    include: {
      model: Synth,
      include: {
        model: Specification,
      },
    },
  });
  return manufacturer.get({plain: true});
}

// manufacturerWithSynthAndSpecs('Teisco').then((manufacturer) => console.log(manufacturer));

// Lookup one manufacturer and one synth ?
// GET /manufacturers/:name/synth/:id

// ...

async function synthsWithManufacturer() {
  const synths = await Synth.findAll({
    include: {model: Manufacturer},
  });
  return synths.map((synth) => synth.get({plain: true}));
}

// synthsWithManufacturer().then((synths) => console.log(synths, 'hellow'));

async function synthsWithSpecsAndManufacturer() {
  const synths = await Synth.findAll({
    include: [
      {
        model: Specification,
      },
      {
        model: Manufacturer,
      },
    ],
  });
  return synths.map((synth) => synth.get({plain: true}));
}

// synthsWithSpecsAndManufacturer().then((synths) => console.log(synths));

async function synthByPkWithSpecsAndManufacturer(id) {
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
  return synth.get({plain: true});
}
// synthByPkWithSpecsAndManufacturer(20).then((synth) => console.log(synth));

async function synthByNameWithSpecsAndManufacturer(synthName) {
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
    return synth.get({plain: true});
  } catch (error) {
    console.log('error', error);
  }
}

// synthByNameWithSpecsAndManufacturer('Roland RS-202 Strings').then((synth) =>
//   console.log(synth)
// );

// Lookup one random synth ()
// GET /synth/getRandom

// ...

async function synthsWithSpecYearProduced(year) {
  const synths = await Synth.findAll({
    include: [
      {
        model: Specification,
        where: {yearProduced: year},
      },
      {
        model: Manufacturer,
      },
    ],
  });

  return synths.map((synth) => synth.get({plain: true}));
}

// synthsWithSpecYearProduced('1980').then((synths) => console.log(synths));

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
  manufacturerByIdWithSynth,
  manufacturerByNameWithSynth,
  manufacturerByIdWithSynthAndSpecs,
  manufacturerByNamedWithSynthAndSpecs,
  synthsWithManufacturer,
  synthsWithSpecsAndManufacturer,
  synthByPkWithSpecsAndManufacturer,
  synthByNameWithSpecsAndManufacturer,
  synthsWithSpecYearProduced,
};
