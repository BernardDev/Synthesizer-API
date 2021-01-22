const {Synth, Manufacturer, Specification} = require('../models');
const {Op} = require('sequelize');
// QUESTIONS
// when to use: { include: [todoList] }
// and when to use: include: {model: todoList, where... }
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// Lookup all manufactures
// GET /manufacturers
async function manufacturersAll() {
  const manufacturers = await Manufacturer.findAll();
  return manufacturers.map((manufacturer) => manufacturer.get({plain: true}));
}

// manufacturersAll().then((manufacturers) => console.log(manufacturers));

// -----------------------------------------------------------------------
// Lookup one manufacturer
// GET /manufacturer/:id
async function manufacturerByPk(id) {
  const manufacturer = await Manufacturer.findByPk(id);
  return manufacturer.get({plain: true});
}
// manufacturerByPk(200).then((manufacturer) => console.log(manufacturer));

// GET /manufacturer/:name
async function manufacturerByName(name) {
  const manufacturer = await Manufacturer.findOne({where: {name: name}});
  return manufacturer.get({plain: true});
}

// manufacturerByName('Roland').then((manufacturer) => console.log(manufacturer));

// -----------------------------------------------------------------------
// Lookup one manufacturer with all synths
// GET /manufacturers/:name/synths
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
    // { include: [todoList] },
  });
  return manufacturer.get({plain: true});
}

// manufacturerWithSynth('Teisco').then((manufacturer) => console.log(manufacturer));

// -----------------------------------------------------------------------
// Lookup one manufacturer with all synths and specs
// GET /manufacturer/:name/synths
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
// -----------------------------------------------------------------------
// Lookup one manufacturer and one synth ?
// GET /manufacturers/:name/synth/:id

// ...

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// Lookup all synths with manufacturer
// GET /synths

async function synthsWithManufacturer() {
  const synths = await Synth.findAll({
    include: {model: Manufacturer},
  });
  return synths.map((synth) => synth.get({plain: true}));
}

// synthsWithManufacturer().then((synths) => console.log(synths, 'hellow'));
// -----------------------------------------------------------------------
// Lookup all synths with specs and manufacturer
// GET /synths

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
// -----------------------------------------------------------------------
// Lookup one synth (with specs and manufacturer!)
// GET /synth/:id

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

// GET /synth/:name
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
// -----------------------------------------------------------------------
// Lookup one random synth ()
// GET /synth/getRandom

// ...

// -----------------------------------------------------------------------
// Lookup all synths by year (or any other spec value) *
// GET /synths/specification/:name

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

// -----------------------------------------------------------------------
// Lookup all synths by synth type
// GET /synths/synthType/:name

// ...
// -----------------------------------------------------------------------
// Lookup all synths by interface feature
// GET /synths/interfaceFeature/:name

// ...

// -----------------------------------------------------------------------
// Lookup all synths by format
// GET /synths/format/:name

// ...

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// GET /manufacturers/roland/synths (with specifications)
// async function synthsWithSpecsFromManufacturer(name) {
//   const manufacturer = await Manufacturer.findOne({
//     where: {name: name},
//     include: {
//       model: Synth,
//       include: {
//         model: Specification,
//       },
//     },
//   });
//   return manufacturer.get({plain: true});
// }

// synthsWithSpecsFromManufacturer('Teisco').then((synths) => console.log(synths));
// synthsWithSpecsFromManufacturer('Teisco');

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// FIND ALL SYNTHS WITH SPECIFICATIONS

// async function synthsWithSpecifications() {
//   const synths = await Synth.findAll({
//     include: {
//       model: Specification,
//       attributes: [
//         'polyphony',
//         'keyboard',
//         'control',
//         'yearProduced',
//         'memory',
//         'oscillators',
//         'lfo',
//         'effects',
//       ],
//     },
//   });

//   return synths.map((synth) => synth.get({plain: true}));
// }

// synthsWithSpecifications().then((synths) => console.log(synths));

// -----------------------------------------------------------------------
// FIND ALL SYNTHS WITH MANUFACTURER

// async function synthsWithManufacturer() {
//   const synths = await Synth.findAll({
//     include: {model: Manufacturer, attributes: ['name']},
//   });

//   return synths.map((synth) => synth.get({plain: true}));
// }

// synthsWithManufacturer().then((synths) => console.log(synths));

// -----------------------------------------------------------------------
// FIND ALL MANUFACTURERS WITH THE SYNTHS THEY MADE

// async function manufacturerWithSynths() {
//   const manufacturers = await Manufacturer.findAll({
//     include: {model: Synth, attributes: ['name']},
//   });
//   return manufacturers.map((manufacturer) => manufacturer.get({plain: true}));
// }

// manufacturerWithSynths().then((manufacturer) => console.log(manufacturer));

// -----------------------------------------------------------------------
// FIND ALL SYNTHS WITH SPECIFICATION WHERE YEARPRODUCED

// async function synthsWithSpecYearProduced() {
//   const synths = await Synth.findAll({
//     include: {model: Specification, where: {yearProduced: 1980}},
//   });

//   return synths.map((synth) => synth.get({plain: true}));
// }

// synthsWithSpecYearProduced().then((synths) => console.log(synths));

// -----------------------------------------------------------------------
// FIND ALL SYNTHS BY PK

// async function synthByPk(id) {
//   const synth = await Synth.findByPk(id, {include: [Specification]});
//   return synth.get({plain: true});
// }

// synthByPk(200).then((synth) => console.log('synth', synth));

// -----------------------------------------------------------------------
// FIND ALL SYNTHS WITH SPECIFICATIONS AND POLYPHONY STARTSWITH

// async function synthsWithPolyphony() {
//   const synths = await Synth.findAll({
//     include: {
//       model: Specification,
//       where: {
//         polyphony: {
//           [Op.regexp]: '^[0-1]',
//         },
//       },
//     },
//   });
//   return synths.map((synth) => synth.get({plain: true}));
// }

// synthsWithPolyphony().then((synths) => console.log(synths));
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

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
