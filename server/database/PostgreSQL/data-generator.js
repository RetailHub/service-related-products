const faker = require('faker');
const fs = require('fs');
const dataStore = require('./urlSet.js');

const writeUsers = fs.createWriteStream('data.csv');
writeUsers.write('id|name|price|prime|imageUrl|reviews|rating|category|subcategory\n', 'utf8');

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 10;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const name = faker.commerce.productName();
      const price = faker.commerce.price();
      const prime = Math.floor(Math.random() * 2);
      const imageUrl = dataStore.images[Math.floor(Math.random() * dataStore.images.length)];
      const reviews = Math.floor(Math.random() * 10000);
      const rating = Math.floor(Math.random() * 6);
      const category = dataStore.categories[Math.floor(Math.random() * dataStore.categories.length)];
      const data = `${id}|${name}|${price}|${prime}|${imageUrl}|${reviews}|${rating}|${category}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
