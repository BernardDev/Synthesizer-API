const {checkApiKey} = require('../queries/allQueries');

async function apiKeyMiddleware(req, res, next) {
  const {key} = req.validatedQuery;
  const keyApi = key;
  delete req.query.key;
  const isValid = await checkApiKey(keyApi);
  if (!isValid) {
    return res
      .status(403)
      .json({errors: ['Forbidden'], message: 'You used an invalid API key'});
  } else {
    return next();
  }
}

module.exports = apiKeyMiddleware;
