const app = require('../app');
const db = require('../models');
const seedDummyData = require('./seed');

const request = require('supertest');

const server = request(app);

describe('GET /', () => {
  afterAll(async () => {
    await db.sequelize.close();
  });
  describe('End to End', () => {
    afterAll(async () => {
      await db.Manufacturer.destroy({truncate: true, cascade: true});
      await db.Synth.destroy({truncate: true, cascade: true});
    });

    beforeAll(async () => {
      await db.Manufacturer.destroy({truncate: true, cascade: true});
      await db.Synth.destroy({truncate: true, cascade: true});
      await seedDummyData();
    });

    // ----------------------------------------------------------------------------------
    // tests start
    // ----------------------------------------------------------------------------------
    test('should give all manufacturers', async (done) => {
      const res = await server.get('/manufacturers');
      expect(res.status).toBe(200);
      expect(res.body.manufacturers.length).toBe(4);
      expect(res.body.count).toBe(4);
      done();
    });

    test('should give all manufacturers with respect for limit param', async (done) => {
      const res = await server.get('/manufacturers?limit=1&offset=0');
      expect(res.status).toBe(200);
      expect(res.body.manufacturers.length).toBe(1);
      expect(res.body.count).toBe(4);
      done();
    });

    test('should give one manufacturer by id', async (done) => {
      const manufacturer = await db.Manufacturer.findOne();
      const res = await server.get(`/manufacturers/${manufacturer.id}`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(manufacturer.name);
      done();
    });

    // or...

    test('should give one manufacturer by name', async (done) => {
      const res = await server.get('/manufacturers/Roland');
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Roland');
      done();
    });

    test('should give one manufacturer by id and all synths', async (done) => {
      const manufacturer = await db.Manufacturer.findOne();
      const response = await server.get(
        `/manufacturers/${manufacturer.id}/synths`
      );
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(manufacturer.name);
      done();
    });

    // or...

    test('should give one manufacturer by name and all synths', async (done) => {
      const response = await server.get('/manufacturers/Vermona/synths');
      expect(response.status).toBe(200);
      expect(response.body.Synths.length).toBe(2);
      done();
    });

    test('should give one manufacturer by id and all synths they made with the specs', async (done) => {
      const manufacturer = await db.Manufacturer.findOne();
      const response = await server.get(
        `/manufacturers/${manufacturer.id}/synths/detailed`
      );
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(manufacturer.name);
      done();
    });

    // or...

    test('should give one manufacturer by name and all synths they made with the specs', async (done) => {
      const response = await server.get(
        '/manufacturers/Vermona/synths/detailed'
      );
      expect(response.status).toBe(200);
      expect(response.body.Synths.length).toBe(2);
      done();
    });

    test('should give all synths with manufacturer', async (done) => {
      const res = await server.get('/synths');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(5);
      done();
    });

    // or...

    test('should give all synths with specs and manufacturer', async (done) => {
      const res = await server.get('/synths/detailed');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(5);
      done();
    });

    test('should give all synths with spec value yearProduced n', async (done) => {
      const res = await server.get('/synths/specification/2001');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      done();
    });

    test('should give one synth by id with specs and manufacturer', async (done) => {
      const synth = await db.Synth.findOne();
      const res = await server.get(`/synths/${synth.id}`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(synth.name);
      done();
    });

    test.only('should give one synth by name with specs and manufacturer', async (done) => {
      const res = await server.get(
        '/synths/Sequential%20Circuits%20Prophet%203000'
      );
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Sequential Circuits Prophet 3000');
      done();
    });
  });
});
