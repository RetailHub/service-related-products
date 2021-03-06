DROP DATABASE IF EXISTS related;
CREATE DATABASE related;
\c related;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  productId SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  price DECIMAL(7, 2) NOT NULL,
  prime BOOLEAN NOT NULL,
  imageUrl VARCHAR(255) NOT NULL,
  reviews INT NOT NULL,
  rating FLOAT(2) NOT NULL,
  category VARCHAR(40),
  subcategory VARCHAR(40)
);