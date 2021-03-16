const app = require('../app');
const db = require('../models');

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

  test('Should upload fields to elephant db and attachment to cloudinary db', async (done) => {
    const res = await server
      .post('/suggestions')
      .set('Content-Type', 'multipart/form-data')
      .field('polyphony', '2')
      .field('keyboard', '49 toetsen')
      .field('control', 'CV/MIDI')
      .field('yearProduced', 1970)
      .field('memory', 'none')
      .field('oscillators', '8')
      .field('filter', 'LP 12 bB')
      .field('lfo', '3')
      .field('effects', 'Delay')
      .field('name', 'Super Synth XD808')
      .field('manufacturer', 'Roland')
      .attach('image', `${__dirname}/moog_prodigy.jpg`);
    // expect(res.status).toBe(201);
    // expect(res.body).toBe(null);
    expect(res.body).not.toEqual(null);
    const savedSuggestion = await db.Suggestion.findOne({
      where: {name: 'Super Synth XD808'},
    });
    expect(savedSuggestion).not.toBe(null);
    console.log(`savedSuggestion`, savedSuggestion.dataValues);
    done();
  });

  test('Should give an error naming manufacturer is a required field', async (done) => {
    const res = await server
      .post('/suggestions')
      .set('Content-Type', 'multipart/form-data')
      .field('yearProduced', 1970)
      .field('name', 'Super Synth XD808');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      errors: ['manufacturer is a required field'],
      message: 'Bad request',
    });
    done();
  });

  test('Should give an error naming image is a required field', async (done) => {
    const res = await server
      .post('/suggestions')
      .set('Content-Type', 'multipart/form-data')
      .field('yearProduced', 1970)
      .field('name', 'Super Synth XD808')
      .field('manufacturer', 'Roland');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      errors: ['image is a required field'],
      message: 'Bad request',
    });
    done();
  });

  test.only('Should give an error saying the file is to big', async (done) => {
    const res = await server
      .post('/suggestions')
      .set('Content-Type', 'multipart/form-data')
      .field('yearProduced', 1970)
      .field('name', 'Super Synth XD808')
      .field('manufacturer', 'Roland')
      .attach('image', `${__dirname}/moog_prodigy.jpg`);
    // console.log(`res`, res);
    // expect(res.status).toBe(400);
    expect(res.body).toEqual(null);
    done();
  });
});