const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const {Synth} = require('./models');

app.use(cors());

app.get('/synths', async (req, res) => {
  const synths = await Synth.findAll();
  res.json(synths);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
