const express = require('express');
const cors = require('cors');

var bodyParser = require('body-parser');

// const {resolve} = require('path');
// console.log('resolve', resolve);

const validate = require('./validators/requestValidationMiddleware');
const uuidAPIKey = require('uuid-apikey');
const sendEmailWithAPIkey = require('./sendEmail');
const yup = require('yup');
const apiRoutes = require('./routers/api');
const {postUser, postSuggestion} = require('./queries/allQueries');

// const {uploader, cloudinaryConfig} = require('./config/cloudinaryConfig');
const {multerUploads, dataUri} = require('./middleware/multer');

const multer = require('multer');
var upload = multer({dest: 'uploads/'});

// --- using

const app = express();

app.use(cors());

// what is this?
// app.use(express.static(resolve(__dirname, 'src/public')));

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.json());

// app.use('*', cloudinaryConfig);

// app.get('/*', (req, res) =>
//   res.sendFile(resolve(__dirname, './test/moog_prodigy.jpg'))
// );

// --------------

app.post(
  '/suggestions',
  // upload.none(),
  // upload.any(),
  // upload.single('suggestions'),
  multerUploads,
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
      manufacturers: yup.string(),
      image: yup.mixed(),
      // more detailed validation
      // image: yup.mixed().test('image', 'The file is too large', (value) => {
      //   if (!value.length) return true; // attachment is optional
      //   return value[0].size <= 2000000;
      // }),
    }),
    'body'
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
        // image,
      } = req.validatedBody;
      console.log('req.file', req.file);
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
        // image: image,
      });
      res.status(201).send({
        message: 'Thank you for supporting',
        data: isNewSynth,
      });
    } catch (error) {
      console.log('error', error);
      res.status(500).send({
        message: 'Oopsy, server error!',
        errors: ['Internal server error'],
      });
    }
  }
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

app.use('/api', apiRoutes);

app.use((req, res) => {
  console.log('Req', req.path);
  res.status(404).json({
    errors: ['Not found'],
    message: 'You used an unavailable route',
  });
});

// console.log('req files...', req.file);
// let nameFile = req.file.originalname;
// console.log('nameFile', nameFile);
// let cloudinaryImage = {
//   fileName: nameFile,
//   filePath: 'desktop',
// };

module.exports = app;
