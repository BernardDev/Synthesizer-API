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

// function validateQuery(query, permittedProperties) {
//   const keys = Object.keys(query);
//   const valid = keys.every((key) => permittedProperties.includes(key));

//   if (valid) {
//     return [query, null];
//   } else {
//     return [
//       null,
//       `Invalid parameter, acceptable parameters are: ${permittedProperties.join(
//         ', '
//       )}`,
//     ];
//   }
// }

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
// SAME ENDPOINT !!!
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
  // console.log('result', result);
});

// ------------------------------------------------------------
// LARGE QUERY !!!
// SAME ENDPOINT !!!
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

// ------------------------------------------------------------

// ------------------------------------------------------------
// EXAMPLE ENDPOINTS
// ------------------------------------------------------------

// VALIDATE QUERY STRING
// app.get('/synths', async (req, res) => {
//   const [validatedQuery, error] = validateQuery(req.query, [
//     'manufacturer',
//     'img',
//   ]);

//   if (error) {
//     return res.status(400).json({message: error});
//   }

//   const synths = await Synth.findAll({
//     where: {
//       ...validatedQuery,
//     },
//   });
//   res.json(synths);
// });

// app.get('/synths', async (req, res) => {
//   const synths = await Synth.findAll();
//   res.json(synths);
// });

// ------------------------------------------------------------

// LOOKPUP ONE SYNTH BY ID
// app.get('/synth/:synthId', async (req, res) => {
//   try {
//     const synthId = parseInt(req.params.synthId);
//     const synth = await Synth.findByPk(synthId, {include: [Specification]});
//     if (synthId) {
//       res.json(synth);
//     } else {
//       res.status(404).send('Synth not found');
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// ------------------------------------------------------------

// LOOKUP ALL MANUFACTURERS
// app.get('/manufacturers', async (req, res) => {
//   const manufacturers = await Manufacturer.findAll();
//   res.json(manufacturers);
// });

// -----------------------------
// -----------------------------
// -----------------------------
// -----------------------------

module.exports = app;

// -----------------------------
// 400 client error
// 404 not found

// EXAMPLES
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

// app.get("/users/:userId/lists", async (req, res, next) => {
//   try {
//     const userId = parseInt(req.params.userId);
//     const user = await User.findByPk(userId, {
//       include: [TodoList],
//     });
//     if (user) {
//       res.send(user.todoLists);
//     } else {
//       res.status(404).send("User not found");
//     }
//   } catch (e) {
//     next(e);
//   }
// });
