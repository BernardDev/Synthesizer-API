const app = require('../app');
const db = require('../models');

const request = require('supertest');

const server = request(app);

describe('admins', () => {
  afterAll(async () => {
    await db.sequelize.close();
  });
  describe('admins route', () => {
    afterAll(async () => {
      await db.Admin.destroy({truncate: true, cascade: true});
    });

    beforeAll(async () => {
      await db.Admin.destroy({truncate: true, cascade: true});
    });

    beforeEach(async () => {
      await db.Admin.destroy({truncate: true, cascade: true});
    });

    test('should store user data in Admin table', async (done) => {
      const res = await server.post(
        `/admins?email=bernardwittgen@htomail.com&password=abcd1234`
      );
      expect(res.body).toBe();
      const foundRegistration = await db.Admin.findOne({
        where: {email: 'bernardwittgen@htomail.com'},
      });
      console.log(`foundRegistration`, foundRegistration);
      // const admin = await db.Admin.create({
      //   email: 'bernardwittgen@htomail.com',
      //   password: 'abcd1234',
      // //   isAdmin: true,
      // });
      done();
    });
  });
});
