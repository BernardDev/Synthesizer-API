const express = require('express');
const cors = require('cors');
const validate = require('./validators/middleware');
const formatSynthQuery = require('./validators/queryValidators');
const uuidAPIKey = require('uuid-apikey');
const sendEmailWithAPIkey = require('./auth/send');
const yup = require('yup');
const apiRoutes = require('./routers/api');

const {postUser} = require('./queries/allQueries');

const app = express();

app.use(express.json());

app.post(
  '/apikey',
  validate(
    yup.object().shape({
      email: yup.string().email().required(),
    }),
    'body'
  ),
  async (req, res) => {
    try {
      const {email} = req.validatedBody;
      const APIkey = uuidAPIKey.create().apiKey;
      const isNewUser = await postUser({email: email, key: APIkey});
      if (isNewUser) {
        const response = sendEmailWithAPIkey(APIkey, email);
        res.status(201).send(response);
      } else {
        res.send({errors: ['You already have a key!'], message: 'nope!'});
      }
    } catch (error) {
      res.status(500).send({
        errors: ['Oopsy, server error!'],
        message: 'Oopsy, server error!',
      });
      console.log('error', error);
    }
  }
);

app.use(cors());
// ------------------------------------------------------------
// ENDPOINTS
// ------------------------------------------------------------

app.use('/api', apiRoutes);

module.exports = app;
