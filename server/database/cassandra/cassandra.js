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

const createKeyspace = (name) => {
  // CREATE THE KEYSPACE
  client.execute(`CREATE KEYSPACE IF NOT EXISTS ${name} WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1}`);
};

createKeyspace('related');

