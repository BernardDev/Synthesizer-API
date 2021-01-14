'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Synths',
      [
        {
          name: 'Roland SH-101',
          img:
            'http://www.vintagesynth.com/sites/default/files/2017-05/roland_sh101.jpg',
          manufacturer_id: 1,
          specification_id: 2,
          SynthType: 'Analog',
          Format: 'Keyboard',
          InterfaceFeature: 'Vintage',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Synths', null, {});
  },
};
