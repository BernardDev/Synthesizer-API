const app = require('../app');
const db = require('../models');
console.log('db.Suggestion', db.Suggestion);
const seedDummyData = require('./seed');

const request = require('supertest');

const server = request(app);

describe.only('End to end post', () => {
  afterAll(async () => {
    await db.Suggestion.destroy({truncate: true, cascade: true});
    await db.sequelize.close();
  });

  beforeAll(async () => {
    await db.Suggestion.destroy({truncate: true, cascade: true});
  });

  test('Should', async (done) => {
    // test with post().send() gives the right response, the one with the set() does not
    // test with multipart but 'muted' should work
    const res = await server
      .post('/suggestions')
      // .send({name: 'john'});
      .set('Content-Type', 'multipart/form-data')
      // .field('polyphony', '2')
      // .field('keyboard', '49 toetsen')
      // .field('control', 'CV/MIDI')
      .field('yearProduced', 1970)
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
    const savedSuggestion = await db.Suggestion.findOne({
      where: {name: 'Super Synth XD808'},
    });
    expect(savedSuggestion).not.toBe(null);
    done();
  });
});
