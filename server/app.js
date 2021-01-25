const express = require('express');
const cors = require('cors');
const {Synth, Manufacturer, Specification} = require('./models');
const {validateManufacturersQuery} = require('./validators');
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
// PAGINATION
app.get('/manufacturers', validateManufacturersQuery, async (req, res) => {
  try {
    let limit = req.query.limit || 20;
    let offset = req.query.offset || 0;
    const result = await manufacturersAll(limit, offset);
    res.json({count: result.count, manufacturers: result.rows});
  } catch (error) {
    console.log('ERROR: /manufacturers', error);
    res.status(400).json({message: 'Bad request', errors: error.errors});
  }
});

app.get('/manufacturers/:idOrName', async (req, res) => {
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
});

app.get('/manufacturers/:idOrName/synths', async (req, res) => {
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
});

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

// PAGINATION
app.get('/synths', async (req, res) => {
  try {
    const result = await synthsWithManufacturer();
    res.json(result);
  } catch (error) {
    console.log('ERROR: /synths', error);
    res.status(400).json({message: 'Bad request', errors: error.errors});
  }
});

// PAGINATION
app.get('/synths/detailed', async (req, res) => {
  try {
    const result = await synthsWithSpecsAndManufacturer();
    res.json(result);
  } catch (error) {
    console.log('ERROR: /synths/detailed', error);
    res.status(400).json({message: 'Bad request', errors: error.errors});
  }
});

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

app.get('/synths/specification/:year', async (req, res) => {
  try {
    const year = req.params.year;
    const result = await synthsWithSpecYearProduced(year);
    res.json(result);
  } catch (error) {
    console.log('ERROR: /synths/specification/:year', error);
    res.status(400).json({message: 'Bad request', errors: error.errors});
  }
});

module.exports = app;
