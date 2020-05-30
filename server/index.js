const app = require('./app.js');

const port = 3003;

app.listen(port, () => {
  console.log('Server is listening on port: ', port);
});
