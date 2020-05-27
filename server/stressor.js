const faker = require('faker');

module.exports = {
  generateId: (userContext, events, done) => {
    // generate data with Faker
    const id = Math.floor(Math.random() * 10000001);
    // add variable to virtual user's context
    userContext.vars.id = id;
    return done();
  },
  generatePost: (userContext, events, done) => {
    userContext.vars.productId = 10000000 + (Math.floor(Math.random() * 10000001));
    userContext.vars.name = faker.commerce.productName();
    userContext.vars.price = faker.commerce.price();
    userContext.vars.prime = faker.random.boolean();
    userContext.vars.imageUrl = faker.image.imageUrl();
    userContext.vars.numReviews = Math.floor(Math.random() * 1001);
    userContext.vars.avgRating = Math.floor(Math.random() * 6);
    userContext.vars.category = faker.lorem.word();
    return done();
  },
};
