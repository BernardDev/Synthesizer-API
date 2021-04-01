const {Suggestion} = require('../models');

async function suggestionsAll(limit, offset) {
  try {
    const suggestions = await Suggestion.findAndCountAll({limit, offset});
    return [null, suggestions];
  } catch (error) {
    return [error, null];
  }
}

module.exports = {
  suggestionsAll,
};
