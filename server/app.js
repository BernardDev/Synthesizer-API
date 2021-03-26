const {
  Admin,
  Synth,
  Manufacturer,
  Specification,
  User,
  Suggestion,
} = require('./models');

const express = require('express');
const cors = require('cors');

const validate = require('./validators/requestValidationMiddleware');
const uuidAPIKey = require('uuid-apikey');
const sendEmailWithAPIkey = require('./sendEmail');
const yup = require('yup');
const apiRoutes = require('./routers/api');
const {
  postUser,
  postSuggestion,
  acceptSynth,
  declineSynth,
  registerAdmin,
  createAdmin,
} = require('./queries/allQueries');
const parser = require('./cloudinary/uploadImageSuggestion');
const {suggestionsAll} = require('./queries/suggestionQueries');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());

app.use(express.json());

// --------------

function errorHandlerExpress(error, req, res, next) {
  console.log(`error middleware`, error);
  res.status(400).json({errors: [error.message], message: error.message});
}

app.post('/login', async (req, res) => {
  try {
    const [error, admin] = await Admin.authenticate(
      req.body.email,
      req.body.password
    );
    if (error) {
      return res
        .status(error.status)
        .json({errors: error.errors, message: error.message});
    }
    const token = admin.createToken();
    res
      .status(200)
      .json({token: token, message: "You've got a token! Great dude"});
  } catch (error) {
    res.status(500).send({
      errors: ['Internal server error'],
      message: 'Oopsy, server error!',
    });
    console.log('error', error);
  }
});

app.post(
  '/admins',
  validate(
    yup
      .object()
      .shape({
        email: yup.string().email().required('Email is a required field'),
        password: yup.string().required('Password is a required field'),
      })
      .noUnknown(),
    'body'
  ),
  async (req, res) => {
    try {
      const {email, password} = req.validatedBody;
      const [error, admin] = await createAdmin(email, password);
      if (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).json({
            message:
              'This email has already been registered, please wait to be approved',
          });
        } else {
          console.log(`error`, error);
          return res.status(500).send({
            errors: ['Internal server error'],
            message: 'Oopsy, server error!',
          });
        }
      }
      res.status(201).json({message: 'Admin created but not yet approved'});
    } catch (error) {
      console.log(`error.type`, error.name);
      res.status(500).send({
        errors: ['Internal server error'],
        message: 'Oopsy, server error!',
      });
      console.log('error', error);
    }
  }
);

app.get(
  '/suggestions',
  validate(
    yup
      .object()
      .shape({
        limit: yup.number().integer().min(1).default(20),
        offset: yup.number().integer().min(0).default(0),
      })
      .noUnknown(),
    'query'
  ),
  async (req, res) => {
    try {
      const {limit, offset} = req.validatedQuery;
      const result = await suggestionsAll(limit, offset);
      console.log(`result`, result);
      if (result.rows.length === 0) {
        return res.status(404).json({count: result.count, suggestions: []});
      }
      res.status(200).json({count: result.count, suggestions: result.rows});
    } catch (error) {
      console.error('ERROR: /admin', error);
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  }
);

app.patch('/suggestions/:id/accept', async (req, res) => {
  let id = req.params.id;
  try {
    const result = await acceptSynth(id);
    if (result.data === null) {
      return res.status(404).json({
        data: null,
        message: result.message,
        errors: result.errors,
      });
    }
    res.status(201).send({
      message: 'Synthesizer accepted',
      data: result,
    });
  } catch (error) {
    console.log('error from outside', error);
    res.status(500).send({
      message: 'Something went wrong, please try to submit again!',
      errors: ['Internal server error'],
    });
  }
});

app.delete('/suggestions/:id/decline', async (req, res) => {
  let id = req.params.id;
  try {
    const result = await declineSynth(id);
    if (result.message !== 'Suggestion deleted') {
      return res.status(404).json({
        data: null,
        message: result.message,
        errors: result.errors,
      });
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.log('error from outside', error);
    res.status(500).send({
      message: 'Something went wrong, please try to submit again!',
      errors: ['Internal server error'],
    });
  }
});

app.post(
  '/contribute',
  parser.single('image'),
  validate(
    yup.object().shape({
      polyphony: yup.string(),
      keyboard: yup.string(),
      control: yup.string(),
      yearProduced: yup.number().required(),
      memory: yup.string(),
      oscillators: yup.string(),
      filter: yup.string(),
      lfo: yup.string(),
      effects: yup.string(),
      name: yup.string().required(),
      manufacturer: yup.string().required(),
    }),
    'body'
  ),
  validate(
    yup.object().shape({
      path: yup.string().url().required('image is a required field'),
      size: yup
        .number()
        .max(3000000, 'file size must be less than of equal to 3MB'),
    }),
    'file'
  ),
  async (req, res) => {
    try {
      const {
        polyphony,
        keyboard,
        control,
        yearProduced,
        memory,
        oscillators,
        filter,
        lfo,
        effects,
        name,
        manufacturer,
        image,
      } = req.validatedBody;
      const isNewSynth = await postSuggestion({
        polyphony: polyphony,
        keyboard: keyboard,
        control: control,
        yearProduced: yearProduced,
        memory: memory,
        oscillators: oscillators,
        filter: filter,
        lfo: lfo,
        effects: effects,
        name: name,
        manufacturer: manufacturer,
        image: req.validatedFile.path,
      });
      // @todo: handle 400
      res.status(201).send({
        message: 'Thank you for supporting',
        data: isNewSynth,
      });
    } catch (error) {
      console.log('error', error);
      res.status(500).send({
        message: 'Something went wrong, please try to submit again!',
        errors: ['Internal server error'],
      });
    }
  },
  errorHandlerExpress
);

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

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({
    errors: ['Not found'],
    message: 'You used an unavailable route',
  });
});

module.exports = app;
