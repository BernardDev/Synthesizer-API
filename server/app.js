const express = require('express');
const cors = require('cors');
const {Synth, Manufacturer, Specification} = require('./models');

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

// ------------------------------------------------------------
// MIDDLEWARES
// ------------------------------------------------------------

// ------------------------------------------------------------
// ENDPOINTS
// ------------------------------------------------------------
// Lookup all manufactures
// GET /manufacturers
app.get('/manufacturers', async (req, res) => {
  const result = await manufacturersAll();
  res.json(result);
});

// ------------------------------------------------------------
// Lookup one manufacturer by id or name
// GET /manufacturer/:idOrName
app.get('/manufacturer/:idOrName', async (req, res) => {
  const idOrName = req.params.idOrName;
  let result;
  const regex = new RegExp('^[0-9]$');
  if (idOrName.match(regex)) {
    result = await manufacturerByPk(idOrName);
  } else {
    result = await manufacturerByName(idOrName);
  }
  res.json(result);
});

// ------------------------------------------------------------
// Lookup one manufacturer with all synths
// GET /manufacturers/:name/synths
app.get('/manufacturer/:idOrName/synths', async (req, res) => {
  const idOrName = req.params.idOrName;
  let result;
  const regex = new RegExp('^[0-9]$');
  if (idOrName.match(regex)) {
    result = await manufacturerByIdWithSynth(idOrName);
  } else {
    result = await manufacturerByNameWithSynth(idOrName);
  }
  res.json(result);
});

// ------------------------------------------------------------
// Lookup one manufacturer with all synths and specs
// GET /manufacturer/:name/synths/detailed
app.get('/manufacturer/:idOrName/synths/detailed', async (req, res) => {
  const idOrName = req.params.idOrName;
  let result;
  const regex = new RegExp('^[0-9]$');
  if (idOrName.match(regex)) {
    result = await manufacturerByIdWithSynthAndSpecs(idOrName);
  } else {
    result = await manufacturerByNamedWithSynthAndSpecs(idOrName);
  }
  res.json(result);
});

// ------------------------------------------------------------
// Lookup all synths with manufacturer
// GET /synths
app.get('/synths', async (req, res) => {
  const result = await synthsWithManufacturer();
  res.json(result);
});

// ------------------------------------------------------------
// Lookup all synths with specs and manufacturer
// GET /synths
app.get('/synths/detailed', async (req, res) => {
  const result = await synthsWithSpecsAndManufacturer();
  res.json(result);
});

// ------------------------------------------------------------
// Lookup one synth (with specs and manufacturer!)
// GET /synth/:id
app.get('/synth/:idOrName', async (req, res) => {
  const idOrName = req.params.idOrName;
  console.log('idOrName', idOrName);
  let result;
  const regex = new RegExp('^[0-9]$');
  if (idOrName.match(regex)) {
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
