const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost:9042'],
  localDataCenter: 'datacenter1',
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to Cassandra', err);
  } else {
    console.log('Successfully connected to Cassandra');
  }
});

// CREATE KEYSPACE
client.execute("CREATE KEYSPACE IF NOT EXISTS related WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor': 1}");

// DROP EXISTING TABLE
client.execute('DROP TABLE IF EXISTS related.products');
// CREATE TABLE
client.execute(`CREATE TABLE IF NOT EXISTS related.products (
    id uuid,
    productId INT,
    name text,
    price DECIMAL,
    prime BOOLEAN,
    imageUrl text,
    reviews INT,
    rating float,
    category text,
    PRIMARY KEY (productId, name, price, prime, imageUrl, category)
    )`);
