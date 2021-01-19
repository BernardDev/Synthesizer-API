'use strict';

const synths = require('../../scraper/data/store_dateInt.json');
const {Specification, Synth, Manufacturer} = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // -----------------
    const manufacturers = await Manufacturer.findAll({raw: true});
    // console.log(manufacturers, 'dit nodig'); // werkt!
    const idMapManufacturers = {};

    manufacturers.forEach((manufacturer) => {
      idMapManufacturers[manufacturer.name] = manufacturer.id;
    });

    // console.log(idMapManufacturers, 'idMapManufacturers');

    // const refactor = Synth.map((Synth) => {
    //   return {
    //     ManufacturerId: idMapManufacturers[Synth.manufacturer],
    //   };
    // });
    // // console.log(refactor, 'helloww');

    // await queryInterface.bulkInsert('Synths', refactor, {});
    // -----------------
    for (const synth of synths) {
      // console.log(synth, 'all');
      // console.log(idMapManufacturers[Synth.manufacturer], 'idMapManufacturers');
      // console.log(Synth.manufacturer, 'Synth.manufacturer');
      // console.log(synth.manufacturer, 'synth.manufacturer');

      const result = await Synth.create(
        {
          name: synth.title,
          img: synth.image,
          manufacturer: synth.manufacturer,
          ManufacturerId: idMapManufacturers[synth.manufacturer],
          Specification: {
            polyphony: synth.specs.Polyphony,
            oscillators: synth.specs.Oscillators,
            lfo: synth.specs.LFO,
            filter: synth.specs.Filter,
            control: synth.specs.Control,
            effects: synth.specs.Effects,
            memory: synth.specs.Memory,
            keyboard: synth.specs.Keyboard,
            yearProduced: synth.specs.DateProduced,
          },
        },
        {include: [Specification]}
      );
      console.log('result.dataValues', result.dataValues);
    }
  },
  //   try {
  // }catch(e) {
  //   console.log(e)
  // }

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Synths', null, {});
    await queryInterface.bulkDelete('Specifications', null, {});
  },
};
