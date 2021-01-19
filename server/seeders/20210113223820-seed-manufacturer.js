'use strict';

const Synths = require('../../scraper/data/store.json');

const results = Synths.map((Synth) => {
  return {
    name: Synth.manufacturer,
  };
});

const uniques = [...new Set(results.map((item) => item.name))];

let container = uniques.map((thing) => {
  return {name: thing};
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Manufacturers', container, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Manufacturers', null, {});
  },
};
