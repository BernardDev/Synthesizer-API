const {checkApiKey} = require('../queries/allQueries');

async function apiKeyMiddleware(req, res, next) {
  const {key} = req.validatedQuery;
  const keyApi = key;
  delete req.query.key;
  const isValid = await checkApiKey(keyApi);
  if (!isValid) {
    return res.status(403).json({errors: ['This key does not exist']});
  } else {
    return next();
  }
}

module.exports = apiKeyMiddleware;
