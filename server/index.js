const server = require('./app.js');

const port1 = process.env.PORT || 3003;
const port2 = process.env.PORT || 3004;

const { app1 } = server;
const { app2 } = server;

app1.listen(port1, () => {
  console.log('Server #1 is listening on port: ', port1);
});

app2.listen(port2, () => {
  console.log('Server #2 is listening on port: ', port2);
});
