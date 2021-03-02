const app = require('../app');
const db = require('../models');
const seedDummyData = require('./seed');

const request = require('supertest');

const server = request(app);

describe('apikeys', () => {
  afterAll(async () => {
    await db.Manufacturer.destroy({truncate: true, cascade: true});
    await db.Synth.destroy({truncate: true, cascade: true});
    await db.User.destroy({truncate: true, cascade: true});
    await db.sequelize.close();
  });

  beforeAll(async () => {
    await db.Manufacturer.destroy({truncate: true, cascade: true});
    await db.Synth.destroy({truncate: true, cascade: true});
    await db.User.destroy({truncate: true, cascade: true});
    await seedDummyData();
  });

  test('should refuse API request without a API key in query string', async (done) => {
    const res = await server.get('/api/manufacturers');
    expect(res.status).toBe(400);
    // expect(res.status).toBe(403);
    expect(res.body.errors).toEqual(['key is a required field']);
    done();
  });

  test('should refuse API request with an invalid API key in query string', async (done) => {
    const res = await server.get('/api/manufacturers?key=bla');
    expect(res.status).toBe(403);
    expect(res.body.errors).toEqual(['Forbidden']);
    expect(res.body.message).toEqual('You used an invalid API key');
    done();
  });

  test('should accept API request with an valid API key in query string', async (done) => {
    const res = await server.get(
      '/api/manufacturers?key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
    );
    expect(res.status).toBe(200);
    // expect(res.body.errors).toEqual(['This key does not exist']);
    done();
  });
});
