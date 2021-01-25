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

const app = express();

app.use(cors());

// - try catch
// - validation: query / params | id / name
// - pagination
// - route naming: 'detailed'
// ------------------------------------------------------------
// MIDDLEWARES
// ------------------------------------------------------------

// ------------------------------------------------------------
// ENDPOINTS
// ------------------------------------------------------------
// Lookup all manufactures
// GET /manufacturers
// PAGINATION
app.get('/manufacturers', validateManufacturersQuery, async (req, res) => {
  let limit = req.query.limit || 20;
  let offset = req.query.offset || 0;
  const result = await manufacturersAll(limit, offset);
  res.json({count: result.count, manufacturers: result.rows});
});

// ------------------------------------------------------------
// Lookup one manufacturer by id or name
// GET /manufacturer/:idOrName
app.get('/manufacturers/:idOrName', async (req, res) => {
  const idOrName = req.params.idOrName;
  let result;
  let isNumber = !isNaN(parseInt(idOrName));
  if (isNumber) {
    result = await manufacturerByPk(idOrName);
  } else {
    result = await manufacturerByName(idOrName);
  }
  res.json(result);
});

// ------------------------------------------------------------
// Lookup one manufacturer with all synths
// GET /manufacturers/:name/synths
app.get('/manufacturers/:idOrName/synths', async (req, res) => {
  const idOrName = req.params.idOrName;
  let result;
  let isNumber = !isNaN(parseInt(idOrName));
  if (isNumber) {
    result = await manufacturerByIdWithSynth(idOrName);
  } else {
    result = await manufacturerByNameWithSynth(idOrName);
  }
  res.json(result);
});

// ------------------------------------------------------------
// Lookup one manufacturer with all synths and specs
// GET /manufacturer/:name/synths/detailed
app.get('/manufacturers/:idOrName/synths/detailed', async (req, res) => {
  const idOrName = req.params.idOrName;
  let result;
  let isNumber = !isNaN(parseInt(idOrName));
  if (isNumber) {
    result = await manufacturerByIdWithSynthAndSpecs(idOrName);
  } else {
    result = await manufacturerByNamedWithSynthAndSpecs(idOrName);
  }
  res.json(result);
});

// ------------------------------------------------------------
// Lookup all synths with manufacturer
// GET /synths
// PAGINATION
app.get('/synths', async (req, res) => {
  const result = await synthsWithManufacturer();
  res.json(result);
});

// ------------------------------------------------------------
// Lookup all synths with specs and manufacturer
// GET /synths
// PAGINATION
app.get('/synths/detailed', async (req, res) => {
  const result = await synthsWithSpecsAndManufacturer();
  res.json(result);
});

// ------------------------------------------------------------
// Lookup one synth (with specs and manufacturer!)
// GET /synth/:id
app.get('/synths/:idOrName', async (req, res) => {
  const idOrName = req.params.idOrName;
  let result;
  let isNumber = !isNaN(parseInt(idOrName));
  if (isNumber) {
    result = await synthByPkWithSpecsAndManufacturer(idOrName);
  } else {
    result = await synthByNameWithSpecsAndManufacturer(idOrName);
  }
  res.json(result);
});

// ------------------------------------------------------------
// Lookup all synths by year (or any other spec value) *
// GET /synths/specification/:name
app.get('/synths/specification/:year', async (req, res) => {
  const year = req.params.year;
  const result = await synthsWithSpecYearProduced(year);
  res.json(result);
});

module.exports = app;
