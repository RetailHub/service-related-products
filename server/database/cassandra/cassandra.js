const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost:9042'],
  localDataCenter: 'datacenter1',
});

client.connect()
  .then(() => {
    console.log('Successfully connected to Cassandra');
  })
  .then(() => {
  // CREATE KEYSPACE
    client.execute("CREATE KEYSPACE IF NOT EXISTS related WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor': 1}");
  })
  .then(() => {
  // DROP EXISTING TABLE
    client.execute('DROP TABLE IF EXISTS related.products');
  })
  .then(() => {
  // CREATE TABLE
    client.execute(`CREATE TABLE IF NOT EXISTS related.products (
      productId INT,
      name text,
      price DECIMAL,
      prime BOOLEAN,
      imageUrl text,
      reviews INT,
      rating float,
      category text,
      subcategory text,
      PRIMARY KEY (productId, name, price, prime, imageUrl, category)
      )`);
  })
  .then(() => {
    console.log('Created keyspace related with a table products');
  })
  .catch((err) => {
    if (err) console.error('An error occurred');
  });
