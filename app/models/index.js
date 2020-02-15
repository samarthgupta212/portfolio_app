'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const cls = require('continuation-local-storage');

const namespace = cls.createNamespace('my-very-own-namespace');
Sequelize.useCLS(namespace);

let sequelize;
if (process.env.HEROKU_POSTGRESQL_GRAY_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_GRAY_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  true //false
  })
} else {
   sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
