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
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    pool: {
      max: 4,
    },
  },
};
