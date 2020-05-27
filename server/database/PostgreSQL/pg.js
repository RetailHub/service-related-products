const Promise = require('bluebird');

const initOptions = {
  promiseLib: Promise,
};

const pgp = require('pg-promise')(initOptions);

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'related',
  user: 'sajjanrajvaidya',
  password: '',
};

const db = pgp(connection);

module.exports = {
  products: {
    getRelated(productId, callback) {
      db.any('SELECT * FROM PRODUCTS LIMIT 50')
        .then((data) => {
          callback(null, data);
        })
        .catch((err) => {
          callback(err);
        });
    },
    addNew(params, callback) {
      db.none('INSERT INTO products (productId, name, price, prime, imageUrl, reviews, rating, category) VALUES (${productId}, ${name}, ${price}, ${prime}, ${imageUrl}, ${numReviews}, ${avgRating}, ${category})', params)
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