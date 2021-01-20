// require('dotenv').config({path: './../.env'});
require('dotenv').config();

// console.log('process.env', process.env);

module.exports = {
  development: {
    use_env_variable: 'DEV_DATABASE_URL',
    dialect: 'postgres',
    pool: {
      max: 4,
    },
  },
  test: {
    use_env_variable: 'TEST_DATABASE_URL',
    dialect: 'postgres',
    pool: {
      max: 4,
    },
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    pool: {
      max: 4,
    },
  },
};
