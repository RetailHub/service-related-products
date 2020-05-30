// << USING POOL >>
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'sajjanrajvaidya',
//   password: 'hrr45-sdc',
//   host: 'localhost',
//   database: 'related',
//   port: '5432',
//   keepAlive: true,
//   max: 30000,
// });

// << USING PG-PROMISE >>

// const Promise = require('bluebird');

// const initOptions = {
//   promiseLib: Promise,
// };

// const pgp = require('pg-promise')(initOptions);

// const config = require('./psqlconfig.js');

// const connection = {
//   host: 'localhost',
//   port: 5432,
//   database: 'related',
//   user: 'sajjanrajvaidya',
//   password: config.entry,
//   keepAlive: true,
//   max: 30000,
// };

// const db = pgp(connection);
const db = require('./pg-connection.js');

module.exports = {
  products: {
    getRelated(productId, callback) {
      let num;
      if (productId > 9999950) {
        num = productId - 50;
      } else {
        num = productId;
      }

      // << POOL QUERY SYNTAX >>
      // pool.query('SELECT * FROM PRODUCTS WHERE productId = $1', [productId], (err, res) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     callback(err, res);
      //   }
      // });

      // << PGP QUERY SYNTAX >>
      db.any(`SELECT * FROM PRODUCTS WHERE productId >= ${num} LIMIT 50`)
        .then((data) => {
          callback(null, data);
        })
        .catch((err) => {
          callback(err);
        });
    },
    addNew(params, callback) {
      db.none('INSERT INTO products (productId, name, price, prime, imageUrl, reviews, rating, category) VALUES (${productId}, ${name}, ${price}, ${prime}, ${imageUrl}, ${numReviews}, ${avgRating}, ${category}) ON CONFLICT (productId) DO UPDATE SET productId = ${productId}, name = ${name}, price = ${price}, prime = ${prime}, imageUrl = ${imageUrl}, reviews = ${numReviews}, rating = ${avgRating}, category = ${category}', params)
        .then((data) => {
          callback(null, data);
        })
        .catch((err) => {
          console.error(err);
          callback(err);
        });
    },
  },
  update: (params, callback) => {
    const { newValue, productId, field } = params;
    let query;
    if (typeof field === 'string') {
      query = `UPDATE products SET ${field} = '${newValue}' WHERE productId=${productId}`;
    } else {
      query = `UPDATE products SET ${field} = ${newValue} WHERE productId=${productId}`;
    }
    db.none(query)
      .then((data) => {
        callback(null, data);
      })
      .catch((err) => {
        callback(err);
      });
  },

  delete: (params, callback) => {
    const { value, field } = params;
    db.none(`DELETE FROM products WHERE ${field}=${value}`)
      .then((data) => {
        callback(null, data);
      })
      .catch((err) => {
        callback(err);
      });
  },
};
