const express = require('express');
const pg = require('./database/postgreSQL/pg.js');

const router = express.Router();

router.get('/related_products/:id', (req, res) => {
  pg.products.getRelated(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    } else {
      res.status(200).send(results);
    }
  });
});

router.post('/addProduct', (req, res) => {
  pg.products.addNew(req.body, (err, results) => {
    if (err) {
      res.status(500).send('Something went wrong!');
    } else {
      res.status(200).send(results);
    }
  });
});

router.put('/updateProduct', (req, res) => {
  pg.update(req.body, (err, results) => {
    if (err) {
      console.error('Error', err);
    } else {
      res.send(results);
    }
  });
});

router.delete('/deleteProduct', (req, res) => {
  pg.delete(req.body, (err, results) => {
    if (err) {
      console.error('Error', err);
    } else {
      res.send(results);
    }
  });
});


module.exports = router;
