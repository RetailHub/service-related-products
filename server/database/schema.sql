DROP DATABASE IF EXISTS `fec8_related_products`;
CREATE DATABASE `fec8_related_products`;
USE `fec8_related_products`;

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `productId` INT(11) UNIQUE,
  `name` VARCHAR(40),
  `price` DECIMAL(7, 2),
  `prime` TINYINT,
  `imageUrl` VARCHAR(255),
  `numReviews` INT(11),
  `avgRating` FLOAT(2)
);

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(30) UNIQUE
);

DROP TABLE IF EXISTS `productCategories`;

CREATE TABLE `productCategories` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `id_products` INT(11),
  `id_categories` INT(11)
);

DROP TABLE IF EXISTS `feedback`;

CREATE TABLE `feedback` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `type` ENUM('unrelated', 'inappropriate', 'other'),
  `comment` VARCHAR(255),
  `id_productCategories` INT(11)
);

ALTER TABLE `productCategories` ADD FOREIGN KEY (id_products) REFERENCES `products` (`id`);
ALTER TABLE `productCategories` ADD FOREIGN KEY (id_categories) REFERENCES `categories` (`id`);
ALTER TABLE `feedback` ADD FOREIGN KEY (id_productCategories) REFERENCES `productCategories` (`id`);