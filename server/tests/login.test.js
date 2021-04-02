const app = require('../app');
const db = require('../models');
const request = require('supertest');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const server = request(app);

describe('/login', () => {
  afterAll(async () => {
    await db.sequelize.close();
  });
  describe('login routes', () => {
    afterAll(async () => {
      await db.Admin.destroy({truncate: true, cascade: true});
    });

    beforeAll(async () => {
      await db.Admin.destroy({truncate: true, cascade: true});
    });

    beforeEach(async () => {
      await db.Admin.destroy({truncate: true, cascade: true});
    });

    test('should post login data to server, should get response if found', async (done) => {
      const admin = await db.Admin.create({
        email: 'bernardwittgen@hotmail.com',
        password: 'abcd1234',
        isAdmin: true,
      });
      const res = await server
        .post(`/login`)
        .send({email: 'bernardwittgen@hotmail.com', password: 'abcd1234'});
      expect(res.status).not.toBe(404);
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      let decoded = jwt.verify(res.body.token, process.env.PRIVATE_KEY);
      expect(decoded.adminId).toBe(admin.id);
      done();
    });

    test('should not send token when password does not match', async (done) => {
      const admin = await db.Admin.create({
        email: 'bernardwittgen@hotmail.com',
        password: 'abcd1234',
        isAdmin: true,
      });
      const res = await server
        .post(`/login`)
        .send({email: 'bernardwittgen@hotmail.com', password: 'hallohallo'});
      expect(res.status).toBe(401);
      expect(res.body).toEqual({
        errors: ['Unauthorized'],
        message: 'You entered the wrong password',
      });
      expect(res.body.token).not.toBeDefined();
      done();
    });

    test('should not send token when email is not found in db', async (done) => {
      const admin = await db.Admin.create({
        email: 'bernardwittgen@hotmail.com',
        password: 'abcd1234',
        isAdmin: true,
      });
      const res = await server
        .post(`/login`)
        .send({email: 'henkwittgen@hotmail.com', password: 'abcd1234'});
      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        errors: ['No record found'],
        message: 'This email is not registered',
      });
      expect(res.body.token).not.toBeDefined();
      done();
    });

    test('should not send token when the user is not an approved admin', async (done) => {
      const admin = await db.Admin.create({
        email: 'bernardwittgen@hotmail.com',
        password: 'abcd1234',
        isAdmin: false,
      });
      const res = await server
        .post(`/login`)
        .send({email: 'bernardwittgen@hotmail.com', password: 'abcd1234'});
      expect(res.body).toEqual({
        errors: ['Unauthorized'],
        message: 'First wait until approval for admin use by the moderator',
      });
      expect(res.status).toBe(401);
      expect(res.body.token).not.toBeDefined();
      done();
    });
  });
});
