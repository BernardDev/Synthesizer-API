function validate(schema, path = 'query') {
  return async function middleware(req, res, next) {
    try {
      const validatedObject = await schema.validate(req[path], {
        abortEarly: false,
      });

      req[
        `validated${path.charAt(0).toUpperCase() + path.slice(1)}`
      ] = validatedObject; // validatedQuery validatedParams
      console.log('validatedObject', validatedObject);
      next();
    } catch (error) {
      console.log('error dingetje', error);
      res.status(400).json({message: 'Bad request', errors: error.errors});
    }
  };
}

module.exports = validate;
