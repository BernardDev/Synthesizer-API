const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const {Synth, Manufacturer, Specification} = require('./models');

app.use(cors());

// SYNTHS
app.get('/synths', async (req, res) => {
  const synths = await Synth.findAll();
  res.json(synths);
});

app.get('/synths/:synthId', async (req, res) => {
  const synthId = parseInt(req.params.synthId);
  const synth = await Synth.findByPk(synthId);
  res.json(synth);
});

// MANUFACTURERS
app.get('/manufacturers', async (req, res) => {
  const manufacturers = await Manufacturer.findAll();
  res.json(manufacturers);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
