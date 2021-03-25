const app = require('../app');
const db = require('../models');
const request = require('supertest');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const server = request(app);

describe.only('/login', () => {
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

    // send post with body: email, password request
    // backend uses request to search for user in the db
    // checks compares password with hash
    // checks if isAdmin
    // creates token
    // sends token as response

    test('should post login data to server, should get response if found', async (done) => {
      const passwordHash = await bcrypt.hash('abcd1234', saltRounds);
      console.log(`passwordHash`, passwordHash);
      const admin = await db.Admin.create({
        email: 'bernardwittgen@hotmail.com',
        password: passwordHash,
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
      console.log(`decoded`, decoded);
      //   decrypt token, check with adminId
      done();
    });
  });
});
