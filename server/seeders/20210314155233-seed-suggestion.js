'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Suggestions',
      [
        {
          name: 'Super Synth LP9000',
          polyphony: '2',
          keyboard: '49 toetsen',
          control: 'CV/MIDI',
          yearProduced: 1972,
          memory: 'none',
          oscillators: '8',
          filter: 'LP 12 bB',
          lfo: '3',
          effects: 'Delay',
          manufacturer: 'Roland',
        },
        {
          name: 'Knoepertjoeper',
          polyphony: '2',
          keyboard: '49 toetsen',
          control: 'CV/MIDI',
          yearProduced: 1972,
          memory: 'none',
          oscillators: '8',
          filter: 'LP 12 bB',
          lfo: '3',
          effects: 'Delay',
          manufacturer: 'Roland',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Suggestions', null, {});
  },
};
