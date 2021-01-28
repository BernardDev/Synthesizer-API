const express = require('express');
const cors = require('cors');
const validate = require('./validators/middleware');
const formatSynthQuery = require('./validators/queryValidators');
const uuidAPIKey = require('uuid-apikey');
const sendEmailWithAPIkey = require('./auth/send');
const yup = require('yup');

const {
  checkApiKey,
  postUser,
  manufacturersAll,
  manufacturerByPk,
  manufacturerByName,
  synthsAll,
  synthByPk,
  synthByName,
} = require('./queries/allQueries');

const app = express();

app.use(express.json());

// how to still send the email?
// how to get rid of the 400 bad request?

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
// schema's yup = name var
// yup general schema
// querying on pk and or findOne

async function apiKeyMiddleware(req, res, next) {
  // console.log('req.validatedQuery', req.validatedQuery);
  const key = req.validatedQuery.key;
  console.log('key', key);
  delete req.query.key;
  const isValid = await checkApiKey(key);
  if (!isValid) {
    return res.status(403).json({errors: ['This key does not exist']});
  }
  next();
  //- [x] is the key there?
  //- [x] get key out of req.
  //- [x] remove apikey from req.query
  // check if key matches key in db
  // it is not in:
  // 403
  // it is in:
  // next()w
}

app.get(
  '/manufacturers',
  validate(yup.object().shape({key: yup.string().required()}), 'query'),
  apiKeyMiddleware,
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
      // 80-84, 72
      const {limit, offset, key} = req.validatedQuery;

      const result = await manufacturersAll(limit, offset);
      if (result.rows.length === 0) {
        return res.status(404).json({count: result.count, manufacturers: []});
      }
      res.json({count: result.count, manufacturers: result.rows});
    } catch (error) {
      console.error('ERROR: /manufacturers', error);
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  }
);

// --------------------------------------------------------------------------------

const idOrManufacturerSchema = yup
  .object()
  .shape({
    nameOrId: yup.string().required(),
    id: yup.number().when('nameOrId', function (nameOrId, schema) {
      if (!isNaN(parseInt(nameOrId))) {
        return schema.default(parseInt(nameOrId));
      }
    }),
    manufacturer: yup.string().when('nameOrId', function (nameOrId, schema) {
      if (typeof nameOr !== 'number' && isNaN(parseInt(nameOrId))) {
        return schema.default(nameOrId);
      }
    }),
  })
  .noUnknown();

app.get(
  '/manufacturers/:nameOrId',
  validate(idOrManufacturerSchema, 'params'),
  async (req, res) => {
    try {
      const {manufacturer, id} = req.validatedParams;
      console.log('manufacturer destruct', manufacturer);
      console.log('id destruct', id);
      let result;
      if (id) {
        result = await manufacturerByPk(id);
      } else {
        result = await manufacturerByName(manufacturer);
      }
      if (result.length === 0) {
        res.status(404);
      }
      res.json(result);
    } catch (error) {
      console.log('ERROR: /manufacturers/:nameOrId', error);
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  }
);

// --------------------------------------------------------------------------------
// replaces GET /manufacturers/:idOrName/synths/detailed'
app.get(
  '/synths',
  validate(
    yup
      .object()
      .shape({
        limit: yup.number().integer().min(1).default(20),
        offset: yup.number().integer().min(0).default(0),
        polyphony: yup.string(),
        keyboard: yup.string(),
        control: yup.string(),
        yearProduced: yup.number().integer(),
        memory: yup.string(),
        oscillators: yup.string(),
        filter: yup.string(),
        lfo: yup.string(),
        effects: yup.string(),
        manufacturer: yup.string(),
      })
      .noUnknown(),
    'query'
  ),
  async (req, res) => {
    try {
      const {
        specificationQuery,
        manufacturerQuery,
        pagination,
      } = formatSynthQuery(req.validatedQuery);
      const result = await synthsAll(
        specificationQuery,
        manufacturerQuery,
        pagination
      );
      if (result.rows.length === 0) {
        res.status(404);
      }
      res.json(result);
      console.log('result of thing', result);
    } catch (error) {
      console.log('ERROR: /synths/detailed', error);
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  }
);
// ------------------------------------------------------------

// add yup validation
// use validatedParams from yup
const idOrNameSchema = yup
  .object()
  .shape({
    nameOrId: yup.string().required(),
    id: yup.number().when('nameOrId', function (nameOrId, schema) {
      if (!isNaN(parseInt(nameOrId))) {
        return schema.default(parseInt(nameOrId));
      }
    }),
    name: yup.string().when('nameOrId', function (nameOrId, schema) {
      if (typeof nameOr !== 'number' && isNaN(parseInt(nameOrId))) {
        return schema.default(nameOrId);
      }
    }),
  })
  .noUnknown();

app.get(
  '/synths/:nameOrId',
  validate(idOrNameSchema, 'params'),
  async (req, res) => {
    try {
      // const idOrName = req.params.idOrName;
      const {name, id} = req.validatedParams;
      let result;
      if (id) {
        result = await synthByPk(id);
      } else {
        result = await synthByName(name);
      }
      res.json(result);
    } catch (error) {
      console.log('ERROR: /synths/:nameOrId', error);
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  }
);

module.exports = app;
