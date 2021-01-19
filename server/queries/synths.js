// import model
// async function\
// sequelize finders
// raw / plain

// ----------------
// As a user i want to get all synths from one specific manufacturer
// GET /synthesizer/:manufacturer
// ----------------

import { Synth, Specification, Manufacturer } require("../models")

// ----------------
// FIND ALL SYNTHS

async function findAllSynths() {
    const allSynths = await Synth.findAll({raw=true});
    return allSynths
}

const allSynths = findAllSynths();
console.log(allSynths, 'all synths')

// ----------------
// FIND ALL SYNTHS FROM SPECIFIC MANUFACTURER

async function synthsWithManufacturers(manufacturerName) {
    const synths = await Synth.findAll({
        include: { model: manufacturer, attributes: manufacturerName },
    });
    return synths.map((synth) => synth.get({ plain: true }));
}

synthsWithManufacturers('Roland').then((synth) => console.log(synth));

// ----------------
// GET ALL SYNTHS FROM ROLAND

async function synthsFromhManufacturers(synthManufacturer) {
    const synths = await Synth.findAll({
        where: { manufacturer: synthManufacturer },
    });
    return synths.map((synth) => synth.get({ plain: true }));
}

synthsWithManufacturers('Roland').then((synth) => console.log(synth));

// ----------------
// FIND ALL MANUFACTURER FROM SPECIFIC SYNTH

async function getUsers() {
  const allSynths = await Synth.findAll({
    include: { model: specification, attributes: {where:  }  },
  });
  return allUsers.map((user) => user.get({ plain: true }));
}

// getUsers().then((users) => console.log(users));

// ----------------

async function setSynthWithSpecifications(id) {
  const result = await user.findByPk(id, { include: [Specifications] });
  return result.get({ plain: true });
}

// getUserWithList(1).then((user) => console.log('user by id with lists', user));

async function imporantTodos() {
  const todos = await todoItem.findAll({
    where: { important: true },
    include: { model: todoList, attributes: ['name'] },
  });
  return todos.map((item) => item.get({ plain: true }));
}

// imporantTodos().then((items) => console.log('important todoItems', items));

async function fullUserById(id) {
  const result = await user.findByPk(id, {
    include: [
      {
        model: todoList,
        attributes: ['name'],
        include: { model: todoItem, attributes: ['task'] },
      },
    ],
  });
  return result.get({ plain: true });
}

// fullUserById(1).then((user) => console.log('User with tasks', user));
