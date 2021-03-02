'use strict';

const synths = require('../data/store.json');
const {Specification, Synth, Manufacturer} = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const manufacturers = await Manufacturer.findAll({raw: true});
    const idMapManufacturers = {};

    manufacturers.forEach((manufacturer) => {
      idMapManufacturers[manufacturer.manufacturer] = manufacturer.id;
    });
    for (const synth of synths) {
      const result = await Synth.create(
        {
          name: synth.title,
          img: synth.image,
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
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Synths', null, {});
    await queryInterface.bulkDelete('Specifications', null, {});
  },
};
