const express = require('express');
const cors = require('cors');
const {Synth, Manufacturer, Specification} = require('./models');
const validate = require('./validators/middleware');
const yup = require('yup');

const {
  manufacturersAll,
  manufacturerByPk,
  manufacturerByName,
  manufacturerByIdWithSynth,
  manufacturerByNameWithSynth,
  manufacturerByIdWithSynthAndSpecs,
  manufacturerByNamedWithSynthAndSpecs,
  synthsWithManufacturer,
  synthsWithSpecsAndManufacturer,
  synthByPkWithSpecsAndManufacturer,
  synthByNameWithSpecsAndManufacturer,
  synthsWithSpecYearProduced,
} = require('./queries/allQueries');

// ------------------------------------------------------------
// MIDDLEWARES
// ------------------------------------------------------------
const app = express();
app.use(cors());

// ------------------------------------------------------------
// ENDPOINTS
// ------------------------------------------------------------
// validateQuery ipv req.query
// error handler 404
// implement querying by name
app.get(
  '/manufacturers',
  validate(
    yup
      .object()
      .shape({
        manufacturer: yup.string().length(100).required(),
        limit: yup.number().integer().min(1).default(20),
        offset: yup.number().integer().min(0).default(0),
      })
      .noUnknown(),
    'query'
  ),
  async (req, res) => {
    try {
      let limit = req.query.limit || 20;
      let offset = req.query.offset || 0;
      const result = await manufacturersAll(limit, offset);
      res.json({count: result.count, manufacturers: result.rows});
    } catch (error) {
      console.error('ERROR: /manufacturers', error);
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  }
);
// number/string yup hack
// use validatedParams to choose sequelize request method
// error handling 404
app.get(
  '/manufacturers/:idOrName',
  validate(
    yup
      .object()
      .shape({
        name: yup.string().length(100).required(),
        // it can be a string or an integer
      })
      .noUnknown(),
    'param'
  ),
  async (req, res) => {
    try {
      const idOrName = req.params.idOrName;
      let result;
      let isNumber = !isNaN(parseInt(idOrName));
      if (isNumber) {
        result = await manufacturerByPk(idOrName);
      } else {
        result = await manufacturerByName(idOrName);
      }
      res.json(result);
    } catch (error) {
      console.log('ERROR: /manufacturers/:idOrName', error);
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  }
);

// replace route with GET /synths?
// rewrite test for new endpoint
app.get(
  '/manufacturers/:idOrName/synths',
  validate(
    yup
      .object()
      .shape({
        name: yup.string().length(100).required(),
      })
      .noUnknown(),
    'params'
  ),
  validate(
    yup
      .object()
      .shape({
        name: yup.string().length(100).required(),
        limit: yup.number().integer().min(1).default(20),
        offset: yup.number().integer().min(0).default(0),
        // synth->specs
      })
      .noUnknown(),
    'query'
  ),
  async (req, res) => {
    try {
      const idOrName = req.params.idOrName;
      let result;
      let isNumber = !isNaN(parseInt(idOrName));
      if (isNumber) {
        result = await manufacturerByIdWithSynth(idOrName);
      } else {
        result = await manufacturerByNameWithSynth(idOrName);
      }
      res.json(result);
    } catch (error) {
      console.log('ERROR: /manufacturers/:idOrName/synths', error);
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  }
);

// remove GET /synth?
// rewrite test to use this endpoint
app.get('/manufacturers/:idOrName/synths/detailed', async (req, res) => {
  try {
    const idOrName = req.params.idOrName;
    let result;
    let isNumber = !isNaN(parseInt(idOrName));
    if (isNumber) {
      result = await manufacturerByIdWithSynthAndSpecs(idOrName);
    } else {
      result = await manufacturerByNamedWithSynthAndSpecs(idOrName);
    }
    res.json(result);
  } catch (error) {
    console.log('ERROR: /manufacturers/:idOrName/synths/detailed', error);
    res.status(400).json({message: 'Bad request', errors: error.errors});
  }
});

// move to different file, queryValidator?
function formatSynthQuery(query) {
  console.log('query', query);
  let pagination = {};
  let manufacturerQuery = {};
  let specificationQuery = {};
  let manufacturerOptions = ['manufacturer'];
  let paginationOptions = ['limit', 'offset'];
  let specificationOptions = [
    'polyphony',
    'keyboard',
    'control',
    'yearProduced',
    'memory',
    'oscillators',
    'filter',
    'lfo',
    'effects',
  ];
  for (const option of specificationOptions) {
    if (query.hasOwnProperty(option)) {
      console.log('option', option);
      specificationQuery[option] = query[option];
    }
  }
  for (const option of manufacturerOptions) {
    if (query.hasOwnProperty(option)) {
      console.log('option', option);
      manufacturerQuery[option] = query[option];
    }
  }
  for (const option of paginationOptions) {
    if (query.hasOwnProperty(option)) {
      console.log('option', option);
      console.log(query[option]);
      pagination[option] = query[option];
    }
  }
  console.log('pagination', pagination);
  return {
    specificationQuery: specificationQuery,
    manufacturerQuery: manufacturerQuery,
    pagination: pagination,
  };
}
// add yup validation
// add error handling 404
// use validatedQuery from yup
app.get('/synths', async (req, res) => {
  try {
    const {
      specificationQuery,
      manufacturerQuery,
      pagination,
    } = formatSynthQuery(req.query);
    const result = await synthsWithSpecsAndManufacturer(
      specificationQuery,
      manufacturerQuery,
      pagination
    );
    res.json(result);
    console.log('result of thing', result);
  } catch (error) {
    console.log('ERROR: /synths/detailed', error);
    res.status(400).json({message: 'Bad request', errors: error.errors});
  }
});

// add yup validation
// use validatedParams from yup
app.get('/synths/:idOrName', async (req, res) => {
  try {
    const idOrName = req.params.idOrName;
    let result;
    let isNumber = !isNaN(parseInt(idOrName));
    if (isNumber) {
      result = await synthByPkWithSpecsAndManufacturer(idOrName);
    } else {
      result = await synthByNameWithSpecsAndManufacturer(idOrName);
    }
    res.json(result);
  } catch (error) {
    console.log('ERROR: /synths/:idOrName', error);
    res.status(400).json({message: 'Bad request', errors: error.errors});
  }
});

module.exports = app;
