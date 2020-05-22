const { Pool } = require('pg');

const pool = new Pool({
  user: 'sajjanrajvaidya',
  host: 'localhost',
  database: 'related',
  password: '',
  port: 5432,
});

const filePath = '../data.csv';

pool.connect()
  .then(() => {
    console.log('Successfully connected to PostgreSQL');
  })
  .then(() => {
    console.log('Importing from CSV');
    pool.query('COPY products FROM \'/Users/sajjanrajvaidya/Desktop/HackReactor/SDC/related-products/server/database/data.csv\' WITH DELIMITER \'|\' CSV HEADER');
  })
  .then(() => {
    console.log('CSV import completed');
  })
  .catch((err) => {
    if (err) {
      console.error('An error occured');
    }
  });
