// << USING CONNECTION POOL >>

const { Pool } = require('pg');

const pool = new Pool({
  user: 'sajjanrajvaidya',
  host: 'localhost',
  database: 'related',
  password: '',
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log('Successfully connected to PostgreSQL');
  })
  .then(() => {
    pool.query('DELETE FROM products').then(() => {
      console.log('Importing from CSV');
      pool.query("COPY products FROM '../data.csv' WITH DELIMITER '|' CSV HEADER")
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
