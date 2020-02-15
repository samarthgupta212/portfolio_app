require('dotenv').config();
// this is important!
module.exports = {
  development: {
    username: 'findb',
    password: 'postgres',
    database: 'fin_systems_db',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+05:30', // for writing to database
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
