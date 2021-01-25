const validationMiddleWareFactory = require('./middleware');
const manufacturerSchema = require('./schemas/manufacturers.js');

module.exports = {
  validateManufacturersQuery: validationMiddleWareFactory(manufacturerSchema),
};
