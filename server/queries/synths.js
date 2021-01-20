const {Synth, Manufacturer, Specification} = require('../models');
const {Op} = require('sequelize');

// -----------------------------------------------------------------------
// FIND ALL SYNTHS

async function synthsWithManufacturers(manufacturerName) {
  const synths = await Synth.findAll();
  return synths.map((synth) => synth.get({plain: true}));
}

// synthsWithManufacturers('Roland').then((synth) => console.log(synth));

// -----------------------------------------------------------------------
// FIND ALL SYNTHS WITH SPECIFICATIONS

async function synthsWithSpecifications() {
  const synths = await Synth.findAll({
    include: {
      model: Specification,
      attributes: [
        'polyphony',
        'keyboard',
        'control',
        'yearProduced',
        'memory',
        'oscillators',
        'lfo',
        'effects',
      ],
    },
  });

  return synths.map((synth) => synth.get({plain: true}));
}

// synthsWithSpecifications().then((synths) => console.log(synths));

// -----------------------------------------------------------------------
// FIND ALL SYNTHS WITH MANUFACTURER

async function synthsWithManufacturer() {
  const synths = await Synth.findAll({
    include: {model: Manufacturer, attributes: ['name']},
  });

  return synths.map((synth) => synth.get({plain: true}));
}

// synthsWithManufacturer().then((synths) => console.log(synths));

// -----------------------------------------------------------------------
// FIND ALL MANUFACTURERS WITH THE SYNTHS THEY MADE

async function manufacturerWithSynths() {
  const manufacturers = await Manufacturer.findAll({
    include: {model: Synth, attributes: ['name']},
  });
  return manufacturers.map((manufacturer) => manufacturer.get({plain: true}));
}

// manufacturerWithSynths().then((manufacturer) => console.log(manufacturer));

// -----------------------------------------------------------------------
// FIND ALL SYNTHS WITH SPECIFICATION WHERE YEARPRODUCED

async function synthsWithSpecYearProduced() {
  const synths = await Synth.findAll({
    include: {model: Specification, where: {yearProduced: 1980}},
  });

  return synths.map((synth) => synth.get({plain: true}));
}

// synthsWithSpecYearProduced().then((synths) => console.log(synths));

// -----------------------------------------------------------------------
// FIND ALL SYNTHS BY PK

async function synthByPk(id) {
  const synth = await Synth.findByPk(id, {include: [Specification]});
  return synth.get({plain: true});
}

// synthByPk(200).then((synth) => console.log('synth', synth));

// -----------------------------------------------------------------------
// FIND ALL SYNTHS WITH SPECIFICATIONS AND POLYPHONY STARTSWITH

async function synthsWithPolyphony() {
  const synths = await Synth.findAll({
    include: {
      model: Specification,
      where: {
        polyphony: {
          [Op.regexp]: '^[0-1]',
        },
      },
    },
  });
  return synths.map((synth) => synth.get({plain: true}));
}

synthsWithPolyphony().then((synths) => console.log(synths));
