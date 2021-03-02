'use strict';

const synths = require('../data/store.json');

const results = synths.map((synth) => {
  return {
    manufacturer: synth.manufacturer,
  };
});

const uniques = [...new Set(results.map((item) => item.manufacturer))];

let container = uniques.map((thing) => {
  return {manufacturer: thing};
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Manufacturers', container, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Manufacturers', null, {});
  },
};
