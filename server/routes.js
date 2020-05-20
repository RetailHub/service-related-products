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
    price, prime, numReviews, avgRating, productId
  } = req.body;
  const { name, imageUrl, category } = req.body;
  price = parseInt(price).toFixed(2);
  productId = Number(productId);
  prime = Number(prime);
  numReviews = Number(numReviews);
  avgRating = Number(avgRating);
  const arr = [productId, name, price, prime, imageUrl, numReviews, avgRating];
  models.products.addNew(arr, (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
