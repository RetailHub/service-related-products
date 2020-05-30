const Promise = require('bluebird');

const initOptions = {
  promiseLib: Promise,
};

const pgp = require('pg-promise')(initOptions);

const config = require('./psqlconfig.js');

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'related',
  user: 'sajjanrajvaidya',
  password: config.entry,
  keepAlive: true,
  max: 30000,
};

// const db = pgp(connection);
module.exports = pgp(connection);
