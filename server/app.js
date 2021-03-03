const express = require("express");
const cors = require("cors");
const validate = require("./validators/requestValidationMiddleware");
const uuidAPIKey = require("uuid-apikey");
const sendEmailWithAPIkey = require("./sendEmail");
const yup = require("yup");
const apiRoutes = require("./routers/api");

const { postUser } = require("./queries/allQueries");

const app = express();

app.use(cors());

app.use(express.json());

// Consider moving this to a router
app.post(
  "/apikey",
  validate(
    yup.object().shape({
      email: yup.string().email().required(),
    }),
    "body"
  ),
  async (req, res) => {
    // Remove log
    console.log("hai");
    try {
      const { email } = req.validatedBody;
      const APIkey = uuidAPIKey.create().apiKey;
      const isNewUser = await postUser({ email: email, key: APIkey });
      if (isNewUser) {
        const response = sendEmailWithAPIkey(APIkey, email);
        res
          .status(201)
          .send({ message: `Your API key has been sent to ${email}` });
      } else {
        res.status(409).send({
          message: "You already have a key!",
          errors: ["record already exists"],
        });
      }
    } catch (error) {
      res.status(500).send({
        errors: ["Internal server error"],
        message: "Oopsy, server error!",
      });
      console.log("error", error);
    }
  }
);

app.use("/api", apiRoutes);

app.use((req, res) => {
  console.log("Req", req.path);
  res.status(404).json({
    errors: ["Not found"],
    message: "You used an unavailable route",
  });
});

module.exports = app;
