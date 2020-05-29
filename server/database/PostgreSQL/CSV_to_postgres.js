// << USING CONNECTION POOL >>
const path = require('path');

const { Pool } = require('pg');

const config = require('./psqlconfig.js');

const pool = new Pool({
  user: 'sajjanrajvaidya',
  host: 'localhost',
  database: 'related',
  password: config.entry,
  port: 5432,
});

const csv = path.join(__dirname, '../data.csv');

pool.connect()
  .then(() => {
    console.log('Successfully connected to PostgreSQL');
  })
  .then(() => {
    pool.query('DELETE FROM products').then(() => {
      console.log('Importing from CSV');
      pool.query(`COPY products FROM '${csv}' WITH DELIMITER '|' CSV HEADER`)
        .then(() => {
          console.log('CSV import completed');
        });
    });
  })
  .catch((err) => {
    if (err) {
      console.error('An error occured');
    }
  });
