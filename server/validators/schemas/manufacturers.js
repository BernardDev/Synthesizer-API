const yup = require('yup');

const schema = yup
  .object()
  .shape({
    name: yup.string(),
  })
  .noUnknown();

module.exports = schema;
