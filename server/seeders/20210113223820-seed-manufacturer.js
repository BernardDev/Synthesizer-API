'use strict';

// const Synths = require('../../scraper/data/store.json');
const synths = require('../data/store.json');
// const {Synth} = require('../models');

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
