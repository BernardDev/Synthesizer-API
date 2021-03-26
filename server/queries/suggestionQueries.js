const {Suggestion} = require('../models');

async function suggestionsAll(limit, offset) {
  try {
    const suggestions = await Suggestion.findAndCountAll({limit, offset});
    return [null, suggestions];
  } catch (error) {
    return [error, null];
  }
}

async function createAdmin(email, password) {
  try {
    const newAdmin = await Admin.create({
      email: email,
      password: password,
    });
    return [null, newAdmin];
  } catch (error) {
    // console.error('error', error);
    return [error, null];
  }
}

// async function synthsAll(
//   specificationQuery,
//   manufacturerQuery,
//   pagination = {limit: 20, offset: 0},
//   sortByQuery
// ) {
//   const synths = await Synth.findAndCountAll({
//     ...pagination,
//     include: [
//       {
//         model: Specification,
//         where: {...specificationQuery},
//       },
//       {
//         model: Manufacturer,
//         where: {...manufacturerQuery},
//       },
//     ],
//     order: [[Specification, sortByQuery.sortBy, sortByQuery.sortOrder]],
//   });
//   return synths;
// }

module.exports = {
  suggestionsAll,
};
