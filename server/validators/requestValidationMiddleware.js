function validate(schema, path = 'query') {
  return async function middleware(req, res, next) {
    try {
      const validatedObject = await schema.validate(req[path], {
        abortEarly: false,
      });

      req[`validated${path.charAt(0).toUpperCase() + path.slice(1)}`]; // validatedQuery validatedParams
      next();
    } catch (error) {
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  };
}

module.exports = validate;
