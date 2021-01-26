function validationMiddleWareFactoryQueries(schema) {
  return async function validationMiddleWare(req, res, next) {
    try {
      const {limit, offset, ...validatedQuery} = await schema.validate(
        req.query,
        {
          abortEarly: false, // we want to produce all the errors, not fail on the first one
        }
      );

      req.limit = limit;
      req.offset = offset;
      // splitting validateQuery off from pagination, as it goes into sequelize where object
      req.validatedQuery = validatedQuery;
      next();
    } catch (error) {
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  };
}

// manufacturer/:idOrName VALIDATING
// if number, accept: number(), integer(), positive()
// if string, accept: ... max characters?

// manufacturer/:idOrName FETCHING
// if number, use the appropriate query
// if string, use the appropriate query

// if fetching ID has been used, use schema ID
// if fetching NAME has been used, use schema STRING
// adding to the schema according to the needs

function validationMiddleWareFactoryParams(schema) {
  return async function validationMiddleWare(req, res, next) {
    try {
      const validatedParams = await schema.validate(req.params, {
        abortEarly: false,
      });

      req.validatedParams = validatedParams;
      next();
    } catch (error) {
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  };
}

// factory function for making middlewares
function validate(schema, path = 'query') {
  return async function middleware(req, res, next) {
    try {
      const validatedObject = await schema.validate(req[path], {
        abortEarly: false,
      });

      req[
        `validated${path.charAt(0).toUpperCase() + path.slice(1)}`
      ] = validatedObject; // validatedQuery validatedParams
      next();
    } catch (error) {
      console.log('error dingetje', error);
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  };
}

module.exports = validate;
