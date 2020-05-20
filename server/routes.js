/* eslint-disable camelcase */
/* eslint-disable radix */
const express = require('express');
const models = require('./models');

const router = express.Router();

router.get('/related_products/:id', (req, res) => {
  models.products.getRelated(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    } else {
      res.status(200).send(results);
    }
  });
});

router.post('/addProduct', (req, res) => {
  let {
    price, prime, numReviews, avgRating, productId,
  } = req.body;
  const { name, imageUrl, category } = req.body;
  price = parseInt(price).toFixed(2);
  productId = Number(productId);
  prime = Number(prime);
  numReviews = Number(numReviews);
  avgRating = Number(avgRating);
  let categoryId;

  const arr = [productId, name, price, prime, imageUrl, numReviews, avgRating, categoryId];

  models.products.addNew(arr, (err, results) => {
    if (err) {
      res.sendStatus(400).send('Incorrect syntax');
    } else {
      models.categories.addNew(category, (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            // get category ID
            models.categories.getCategory(category, (err, results) => {
              if (err) {
                console.error('ERROR: ', err);
                res.status(400).send('An unknown error occured');
              } else {
                const id_categories = results[0].id;
                const id_products = productId;

                models.productCategories.addNew([productId, categoryId], (err, results) => {
                  if (err) {
                    console.error('Error!', err);
                    // res.end();
                  } else {
                    const { insertId } = results;
                    res.send(`Insert Id is ${insertId}, productId is ${id_products}, and categoryId is ${id_categories}`);
                  }
                });
              }
            });
          } else {
            console.error('ERROR: ', err);
            res.send(400);
          }
        } else {
          const id_categories = results.insertId;
          const id_products = productId;
          models.productCategories.addNew([productId, categoryId], (err, results) => {
            if (err) {
              console.error('Error!', err);
              res.end();
            } else {
              const { insertId } = results;
              res.send(`Insert Id is ${insertId}, productId is ${id_products}, and categoryId is ${id_categories}`);
            }
          });
        }
      });
    }
  });
});

router.patch('/updateProduct', (req, res) => {
  models.update(req.body, (err, results) => {
    if (err) {
      console.error('Error line 85: ', err);
    } else {
      res.send(results);
    }
  });
});

router.delete('/deleteProduct', (req, res) => {
  models.delete(req.body, (err, results) => {
    if (err) {
      console.error('Error line 94: ', err);
    } else {
      res.send(results);
    }
  });
});


module.exports = router;
