const app = require('../app');
const db = require('../models');
const seedDummyData = require('./seed');

const request = require('supertest');

const server = request(app);

describe.only('GET /', () => {
  afterAll(async () => {
    await db.sequelize.close();
  });
  describe.only('End to End', () => {
    afterAll(async () => {
      await db.Manufacturer.destroy({truncate: true, cascade: true});
      await db.Synth.destroy({truncate: true, cascade: true});
      await db.User.destroy({truncate: true, cascade: true});
    });

    beforeAll(async () => {
      await db.Manufacturer.destroy({truncate: true, cascade: true});
      await db.Synth.destroy({truncate: true, cascade: true});
      await db.User.destroy({truncate: true, cascade: true});
      await seedDummyData();
    });

    // ----------------------------------------------------------------------------------
    // tests start manufacturers
    // ----------------------------------------------------------------------------------
    test('should give all manufacturers with default limit / offset', async (done) => {
      const res = await server.get(
        '/api/manufacturers?key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
      );
      expect(res.status).toBe(200);
      expect(res.body.manufacturers.length).toBe(4);
      done();
    });

    test('should give all manufacturers paginated by query string ', async (done) => {
      const res = await server.get(
        '/api/manufacturers?limit=1&offset=0&key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
      );
      expect(res.status).toBe(200);
      expect(res.body.manufacturers.length).toBe(1);
      done();
    });

    // specials
    test('should give error NaN for not giving valid value for offset query', async (done) => {
      const res = await server.get(
        '/api/manufacturers?limit=2&offset=cheese&key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
      );
      expect(res.body.message).toBe('Validation error');
      expect(res.body.errors).toEqual([
        'offset must be a `number` type, but the final value was: `NaN` (cast from the value `"cheese"`).',
      ]);
      done();
    });

    test.only('should provide meningfull message when query is malformed', async (done) => {
      const res = await server.get(
        '/api/synths?key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DEdfggdfg'
      );
      // expect(res.body).toBe(null)
      // This key does not exist
      expect(res.body.message).toBe('Invalid API key');
      expect(res.body.errors).toEqual(['This key does not exist']);
      done();
    });

    test('should give one manufacturer by name', async (done) => {
      const res = await server.get(
        '/api/manufacturers/Roland?key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
      );
      expect(res.status).toBe(200);
      expect(res.body.manufacturer).toBe('Roland');
      done();
    });

    test('should give one manufacturer by id', async (done) => {
      const manufacturer = await db.Manufacturer.findOne();
      const res = await server.get(
        `/api/manufacturers/${manufacturer.id}?key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE`
      );
      expect(res.status).toBe(200);
      expect(res.body.manufacturer).toBe('Vermona');
      done();
    });

    // ----------------------------------------------------------------------------------
    // tests start synths
    // ----------------------------------------------------------------------------------
    // rename rows to synhts

    test('should give all synths (with default limit / offset)', async (done) => {
      const res = await server.get(
        '/api/synths?key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
      );
      expect(res.status).toBe(200);
      expect(res.body.synths.length).toBe(5);
      done();
    });

    test('should give all synths paginated by query string ', async (done) => {
      const res = await server.get(
        '/api/synths?limit=1&offset=0&key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
      );
      expect(res.status).toBe(200);
      expect(res.body.synths.length).toBe(1);
      done();
    });

    test('should give all synths with spec value yearProduced n', async (done) => {
      const res = await server.get(
        '/api/synths?yearProduced=2001&key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
      );
      expect(res.status).toBe(200);
      expect(res.body.synths.length).toBe(1);
      done();
    });

    test('should give all synths from a certain manufacturer', async (done) => {
      const res = await server.get(
        '/api/synths?manufacturer=Vermona&key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
      );
      expect(res.status).toBe(200);
      expect(res.body.synths.length).toBe(2);
      done();
    });

    test('should give all synths, query string paginated, from specific manufacturer, by a certain year of production ', async (done) => {
      const res = await server.get(
        '/api/synths?limit=2&offset=0&manufacturer=Vermona&yearProduced=1999&key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
      );
      expect(res.status).toBe(200);
      expect(res.body.synths.length).toBe(1);
      done();
    });

    test('should give one synth by name', async (done) => {
      const res = await server.get(
        '/api/synths/Roland%20JV-2080?key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
      );
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Roland JV-2080');
      expect(res.body.Manufacturer.manufacturer).toBe('Roland');
      expect(res.body.Specification.polyphony).toBe('64 voices');
      done();
    });

    test('should give one synth by id', async (done) => {
      const synth = await db.Synth.findOne();
      const res = await server.get(
        `/api/synths/${synth.id}?&key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE`
      );
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(synth.name);
      done();
    });
  });
});
