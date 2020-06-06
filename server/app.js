require('newrelic'); // NEW RELIC
// require('dotenv').config();

const express = require('express');
const path = require('path');

const routes = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, '/../public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.get('/loaderio-a2ad6f5180a0d742930f3a9f63c468ec', (req, res) => {
	res.send('loaderio-a2ad6f5180a0d742930f3a9f63c468ec');
});

module.exports = app;
