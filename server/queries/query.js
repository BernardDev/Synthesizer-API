const {Synth, Manufacturer, Specification} = require('../models');

// SYNTH TABLE
/*
name, img
*/

// SPECIFICATION TABLE
/*
polyphony, keyboard, control, oscillators, yearProduced, memory, filter, lfo, effects
*/

// MANUFACTURER TABLE
/*
name
*/

// GET /synths?includeSpecifications=false

// GET /synths
// GET /synths?yearProduced=1991
// GET /synths?manufacturer=Roland
// GET /synths?manufacturer=Roland&yearProduced=1991
async function getSynths(
  specificationQuery,
  manufacturerQuery,
  pagination = {limit: 20, offset: 0},
  includeSpecification
) {
  // const includesArray = {include:}
  // const includesArray = includeSpecification?
  const synths = await Synth.findAndCountAll({
    ...pagination,
    include: [
      {
        model: Specification,
        where: {...specificationQuery},
      },
      {model: Manufacturer, where: {...manufacturerQuery}},
    ],
  });
  console.log('synths', synths.rows);
  console.log('synths length', synths.rows.length);
  // return synths;
}

// getSynths({yearProduced: 1998}, {name: 'Technosaurus'}, {limit: 20, offset: 0});
getSynths({}, {}, {});

// module.exports = query;
