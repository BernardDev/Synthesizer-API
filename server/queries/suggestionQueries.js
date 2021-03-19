const {Suggestion} = require('../models');

async function suggestionsAll(limit, offset) {
  try {
    const suggestions = await Suggestion.findAndCountAll({limit, offset});
    return suggestions;
  } catch (error) {
    return error;
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
