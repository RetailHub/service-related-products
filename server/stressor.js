const faker = require('faker');

module.exports = {
  generateId: (userContext, events, done) => {
    // generate data with Faker
    const id = Math.floor(Math.random() * 10000001);
    // add variable to virtual user's context
    userContext.vars.id = id;
    return done();
  },
};
