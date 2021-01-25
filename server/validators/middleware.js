function validationMiddleWareFactory(schema) {
  return async function validationMiddleWare(req, res, next) {
    try {
      const {limit, offset, ...validatedQuery} = await schema.validate(
        req.query,
        {
          abortEarly: false, // we want to produce all the errors, not fail on the first one
        }
      );
      // console.log('res.query', res.query);

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

module.exports = validationMiddleWareFactory;
