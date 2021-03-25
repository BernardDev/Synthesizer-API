const {Admin} = require('./models');

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
    const result = await Admin.findOne({
      where: {email: req.body.email},
    });
    if (!result)
      return res.status(404).json({
        errors: ['No record found'],
        message: 'This email is not registered',
      });
    if (result.isAdmin === false)
      return res.status(401).json({
        errors: ['Unauthorized'],
        message: 'First wait until approval for admin use by the moderator',
      });
    const match = await bcrypt.compare(req.body.password, result.password);
    const payload = {adminId: result.id};
    if (match && result.isAdmin === true) {
      const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: '4h',
      });
      res
        .status(200)
        .json({token: token, message: "You've got a token! Great dude"});
    } else {
      res.status(401).json({
        errors: ['Something'],
        message: 'You entered the wrong password',
      });
    }
  } catch (error) {
    res.status(500).send({
      errors: ['Internal server error'],
      message: 'Oopsy, server error!',
    });
    console.log('error', error);
  }
});

// Het past nu. Zal ik zelf verder gaan? Ik kan niet zo 1,2,3 unhappy paths bedenken hiervoor. Zal ik verder gaan met

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
      const passwordHash = await bcrypt.hash(password, saltRounds);
      // console.log(`passwordHas`, passwordHash);
      const newAdmin = await Admin.create({
        email: email,
        password: passwordHash,
      });
      res.status(201).json({message: 'Admin created but not yet approved'});
    } catch (error) {
      console.log(`error.type`, error.name);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({
          message:
            'This email has already been registered, please wait to be approved',
        });
      } else {
        res.status(500).send({
          errors: ['Internal server error'],
          message: 'Oopsy, server error!',
        });
        console.log('error', error);
      }
    }
  }
);

app.get(
  '/admin',
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

app.patch('/admin/:id/accept', async (req, res) => {
  let id = req.params.id;
  try {
    const result = await acceptSynth(id);
    if (result.data === null) {
      return res.status(404).json({
        data: null,
        message: result.message,
        errors: result.errors,
      });
    } else {
      res.status(201).send({
        message: 'Synthesizer accepted',
        data: result,
      });
    }
  } catch (error) {
    console.log('error from outside', error);
    res.status(500).send({
      message: 'Something went wrong, please try to submit again!',
      errors: ['Internal server error'],
    });
  }
});

app.delete('/admin/:id/decline', async (req, res) => {
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
