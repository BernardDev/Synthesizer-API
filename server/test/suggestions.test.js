const app = require('../app');
const db = require('../models');
const seedDummyData = require('./seed');

const request = require('supertest');

const server = request(app);

describe.only('End to end post', () => {
  afterAll(async () => {
    // clear Suggestions
    await db.sequelize.close();
  });

  beforeAll(async () => {
    // clear Suggestions
  });

  test('Should', async (done) => {
    // const suggestion = {
    //   Specification: {
    //     polyphony: '2',
    //     keyboard: '49 toetsen',
    //     control: 'CV/MIDI',
    //     yearProduced: 1972,
    //     memory: 'none',
    //     oscillators: '8',
    //     filter: 'LP 12 bB',
    //     lfo: '3',
    //     effects: 'Delay',
    //   },
    //   img: 'img.img',
    //   name: 'Super Synth XD808',
    //   Manufacturer: {
    //     manufacturer: 'Roland',
    //   },
    // };

    const suggestion = {};

    // test with post().send() gives the right response, the one with the set() does not
    // test with multipart but 'muted' should work

    const res = await server
      .post('/suggestions')
      // .send({name: 'john'});
      .set('Content-Type', 'multipart/form-data')
      // .field('polyphony', '2')
      // .field('keyboard', '49 toetsen')
      // .field('control', 'CV/MIDI')
      // .field('yearProduced', 1972)
      // .field('memory', 'none')
      // .field('oscillators', '8')
      // .field('filter', 'LP 12 bB')
      // .field('lfo', '3')
      // .field('effects', 'Delay')
      .field('name', 'Super Synth XD808')
      // .field('manufacturer', 'Roland')
      .attach('image', `${__dirname}/moog_prodigy.jpg`);
    expect(res.status).toBe(201);
    expect(res.body).toEqual({message: 'Thank you for supporting'});
    // const savedSuggestion = await db.Suggestion.findOne({
    //   where: {name: 'Super Synth XD808'},
    // });
    // expect(savedSuggestion).not.toBe(null);
    done();
  });
});
