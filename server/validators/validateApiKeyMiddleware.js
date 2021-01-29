const {checkApiKey} = require('../queries/allQueries');

async function apiKeyMiddleware(req, res, next) {
  const {limit, offset, key} = req.validatedQuery;
  console.log('req.validatedQuery', req.validatedQuery);
  const key = req.validatedQuery.key;
  delete req.query.key;
  const isValid = await checkApiKey(key);
  if (!isValid) {
    return res.status(403).json({errors: ['This key does not exist']});
  }
  next();
}

module.exports = apiKeyMiddleware;
