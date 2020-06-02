require('newrelic'); // NEW RELIC
// require('dotenv').config();

const express = require('express');
const path = require('path');

const routes = require('./routes');

const app1 = express();
const app2 = express();

app1
  .use(express.static(path.join(__dirname, '/../public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/api', routes);

app2
  .use(express.static(path.join(__dirname, '/../public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/api', routes);

module.exports.app1 = app1;
module.exports.app2 = app2;
