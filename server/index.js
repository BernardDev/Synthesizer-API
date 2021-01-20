const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const {Synth, Manufacturer, Specification} = require('./models');

app.use(cors());

// SYNTHS
app.get('/booms', async (req, res) => {
  const synths = await Synth.findAll();
  res.json(synths);
});

app.get('/synth/:synthId', async (req, res) => {
  try {
    const synthId = parseInt(req.params.synthId);
    const synth = await Synth.findByPk(synthId, {include: [Specification]});
    if (synthId) {
      res.json(synth);
    } else {
      res.status(404).send('Synth not found');
    }
  } catch (e) {
    next(e);
  }
});

// MANUFACTURERS
app.get('/manufacturers', async (req, res) => {
  const manufacturers = await Manufacturer.findAll();
  res.json(manufacturers);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

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
