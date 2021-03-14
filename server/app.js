const express = require('express');
const cors = require('cors');
const validate = require('./validators/requestValidationMiddleware');
const uuidAPIKey = require('uuid-apikey');
const sendEmailWithAPIkey = require('./sendEmail');
const yup = require('yup');
// import { object, string, mixed } from "yup"
const {object, string, mixed} = require('yup');
const apiRoutes = require('./routers/api');
var multer = require('multer');
var upload = multer({dest: 'suggestions/'});

const {postUser, postSuggestion} = require('./queries/allQueries');

const app = express();

app.use(cors());

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
    console.log('hai');
    try {
      const {email} = req.validatedBody;
      const APIkey = uuidAPIKey.create().apiKey;
      const isNewUser = await postUser({email: email, key: APIkey});
      if (isNewUser) {
        const response = sendEmailWithAPIkey(APIkey, email);
        res
          .status(201)
          .send({message: `Your API key has been sent to ${email}`});
      } else {
        res.status(409).send({
          message: 'You already have a key!',
          errors: ['record already exists'],
        });
      }
    } catch (error) {
      res.status(500).send({
        errors: ['Internal server error'],
        message: 'Oopsy, server error!',
      });
      console.log('error', error);
    }
  }
);

app.post(
  '/suggestions',
  upload.any(),
  // upload.single('moog_prodigy'),
  // upload.none(),
  validate(
    yup.object().shape({
      // polyphony: yup.string(),
      // keyboard: yup.string(),
      // control: yup.string(),
      // yearProduced: yup.number().required(),
      // memory: yup.string(),
      // oscillators: yup.string(),
      // filter: yup.string(),
      // lfo: yup.string(),
      // effects: yup.string(),
      name: yup.string().required(),
      // manufacturers: yup.string(),
      // test this validation
      image: yup.mixed(),
      // image: yup.mixed().test('image', 'The file is too large', (value) => {
      //   if (!value.length) return true; // attachment is optional
      //   return value[0].size <= 2000000;
      // }),
    }),
    'body'
  ),
  async (req, res) => {
    // console.log('req', req);
    try {
      const {
        // polyphony,
        // keyboard,
        // control,
        // yearProduced,
        // memory,
        // oscillators,
        // filter,
        // lfo,
        // effects,
        name,
        // manufacturer,
        image,
      } = req.validatedBody;
      // console.log('name', name);
      const isNewSynth = await postSuggestion({
        // polyphony: polyphony,
        // keyboard: keyboard,
        // control: control,
        // yearProduced: yearProduced,
        // memory: memory,
        // oscillators: oscillators,
        // filter: filter,
        // lfo: lfo,
        // effects: effects,
        name: name,
        // manufacturer: manufacturer,
        image: image,
      });
      res.status(201).send({message: 'Thank you for supporting'});
      console.log('res good', res);
      // the version with findOrCreate
      // if (isNewSynth) {
      //   res.status(201).send({message: 'Thank you for supporting'});
      // } else {
      //   res.status(409).send({
      //     message: 'This synth already exists',
      //     errors: ['record already exists'],
      //   });
      // }
    } catch (error) {
      console.log('res bad', res);
      res.status(500).send({
        message: 'Oopsy, server error!',
        errors: ['Internal server error'],
      });
      console.log('error', error);
    }
  }
);

app.use('/api', apiRoutes);

app.use((req, res) => {
  console.log('Req', req.path);
  res.status(404).json({
    errors: ['Not found'],
    message: 'You used an unavailable route',
  });
});

module.exports = app;
