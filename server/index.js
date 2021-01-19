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

app.get('/synths', async (req, res) => {
  const synths = await Synth.findAll();
  res.json(synths);
});

// app.get('/synth/:synthId', async (req, res) => {
//   const synthId = parseInt(req.params.synthId);
//   const synth = await Synth.findByPk(synthId);
//   res.json(synth);
// });

app.get('/synth/:synthId', async (req, res) => {
  const synthId = parseInt(req.params.synthId);
  const synth = await Synth.findByPk(synthId, {include: [Specification]});
  res.json(synth);
});

// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

//   Tutorial.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };

// MANUFACTURERS
app.get('/manufacturers', async (req, res) => {
  const manufacturers = await Manufacturer.findAll();
  res.json(manufacturers);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
