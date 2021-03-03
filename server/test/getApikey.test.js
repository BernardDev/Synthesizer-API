const emailMock = jest.mock("../sendEmail.js", () => {
  return function () {
    console.log("mail sent");
  };
});

const app = require("../app");
const db = require("../models");
// remove unused import
const seedDummyData = require("./seed");

const request = require("supertest");

const server = request(app);

describe("request new apikey", () => {
  afterEach(async () => {
    await db.User.destroy({ truncate: true, cascade: true });
  });

  beforeEach(async () => {
    await db.User.destroy({ truncate: true, cascade: true });
  });

  afterAll(async () => {
    await db.User.destroy({ truncate: true, cascade: true });
    await db.sequelize.close();
  });

  test("Should give confirmation notification if email has been sent", async (done) => {
    const res = await server.post("/apikey").send({ email: "blabla@ding.com" });
    expect(res.body).toEqual({
      message: "Your API key has been sent to blabla@ding.com",
    });
    expect(res.status).toBe(201);
    done();
  });

  test("Should give warning if api key has already been sent to this email", async (done) => {
    const testUser = await db.User.create({
      email: "bernardvanderende@hotmail.com",
      apiKey: "12345",
    });
    const res = await server
      .post("/apikey")
      .send({ email: "bernardvanderende@hotmail.com" });
    expect(res.body).toEqual({
      errors: ["record already exists"],
      message: "You already have a key!",
    });
    expect(res.status).toBe(409);
    done();
  });

  test("Should give warning if if email is not formatted correctly", async (done) => {
    const res = await server.post("/apikey").send({ email: "blablading.com" });
    expect(res.body).toEqual({
      errors: ["email must be a valid email"],
      message: "Bad request",
    });
    expect(res.status).toBe(400);
    done();
  });
});
