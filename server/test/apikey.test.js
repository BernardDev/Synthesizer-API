const app = require('../app');
const db = require('../models');
const seedDummyData = require('./seed');

const request = require('supertest');

const server = request(app);

describe.only('apikeys', () => {
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

  test('should refuse requests without apikey in querystring', async (done) => {
    const res = await server.get('/manufacturers');
    expect(res.status).toBe(400);
    // expect(res.status).toBe(403);
    expect(res.body.errors).toEqual(['key is a required field']);
    done();
  });

  test('should refuse request if key is not in db', async (done) => {
    const res = await server.get('/manufacturers?key=bla');
    expect(res.status).toBe(403);
    expect(res.body.errors).toEqual(['This key does not exist']);
    done();
  });

  test('should accept request if key is in db', async (done) => {
    const res = await server.get(
      '/manufacturers?key=GVMVW12-1XK4W8E-HEND0CT-DVDB4DE'
    );
    expect(res.status).toBe(200);
    // expect(res.body.errors).toEqual(['This key does not exist']);
    done();
  });
});
