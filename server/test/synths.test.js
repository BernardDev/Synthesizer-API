const app = require('../app');

const request = require('supertest');

test('should try', async (done) => {
  const what = await request(app).get('/synths');
  //   console.log(what);

  expect(what).toBeDefined();
  done();
});
