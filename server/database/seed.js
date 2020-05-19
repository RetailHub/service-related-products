const faker = require('faker');
const models = require('../models');

async function seedDatabase() {
  // Generate categories
  const cats = new Set();
  while (cats.size < 10) {
    const name = faker.random.word();
    cats.add(name);
  }
  await cats.forEach(async (cat) => {
    await models.categories.addNew(cat);
  });

  // Generate newProducts data
  const images = ['a-bicycle.jpg', 'a-diamond-ring-for-happiness.jpg', 'a-heavy-axe.jpg', 'a-lighted-star-stick.jpg', 'a-spoon-full-of-food.jpg', 'a-sturdy-red-wine-barrel.jpg', 'a-suitcase-for-loading.jpg', 'adhesive-tape.jpg', 'aesthetic-hourglass.jpg', 'all-kinds-of-cameras.jpg', 'all-kinds-of-traditional-chopsticks.jpg', 'apple-computer.jpg', 'apple-mouse.jpg', 'apple-products.jpg', 'apple-watch.jpg', 'baby-ruth.jpg', 'beautiful-glasses.jpg', 'beautiful-headdress-crown.jpg', 'beautiful-pocket-watch.jpg', 'black-business-mens-leather-shoes.jpg', 'bolt-driver.jpg', 'bottled-wine-in-various-colours.jpg', 'bulb.jpg', 'bumblebee-toys.jpg', 'bundles-of-currency-notes.jpg', 'caffeine-free-coca-cola.jpg', 'calculator.jpg', 'camera-lens.jpg', 'camping-tent.jpg', 'canadian-flag-flying.jpg', 'canon-cameras-of-different-models.jpg', 'casual-shoes.jpg', 'chess.jpg', 'chic-guitar.jpg', 'chime-bells-with-a-long-history.jpg', 'chips-ahoy.jpg', 'cinnamon-roll-pop-tart.jpg', 'clocks-alarm-clocks.jpg', 'close-up-of-colour-pencils.jpg', 'coca-cola-clear.jpg', 'coil.jpg', 'colorful-chalk.jpg', 'colorful-dice.jpg', 'colorful-pencils-in-various-colors.jpg', 'colorful-pens.jpg', 'cool-and-temperamental-sunglasses.jpg', 'cool-motorcycle-helmets.jpg', 'crush.jpg', 'dasani.jpg', 'delicate-and-smooth-porcelain.jpg', 'delicate-fashion-headphones.jpg', 'diet-coke-plus.jpg', 'diet-pepsi.jpg', 'elegant-folding-fan.jpg', 'elegant-leaflet-rosewood-handstrings.jpg', 'elegant-purple-clay-pot.jpg', 'exquisite-diamond-ring.jpg', 'exquisite-glasses.jpg', 'exquisite-home-stilllife.jpg', 'facial-cleanser.jpg', 'fanta.jpg', 'fashion-watches.jpg', 'fashionable-and-exquisite-ring.jpg', 'fine-and-beautiful-jewelry-box.jpg', 'fine-guitar.jpg', 'fingertip-gyroscope.jpg', 'firewood.jpg', 'frame-drum-transparent-background-png.jpg', 'fruit-by-the-foot.jpg', 'fruit-roll-ups.jpg', 'gardettos.jpg', 'glass-bead-ornaments.jpg', 'glass-vase-with-flowers.jpg', 'gushers.jpg', 'hammocks-in-the-beach-forest.jpg', 'heart-jewelry.jpg', 'heart-shaped-ornaments.jpg', 'hello-kitty-meowberry-pop-tart.jpg', 'hersheys-kisses.jpg', 'high-end-cigars.jpg', 'hostess-cupcakes.jpg', 'household-bread-machine.jpg', 'jarritos.jpg', 'julmust.jpg', 'junior-mints.jpg', 'kitchen-knife-feature.jpg', 'laptop-keyboard.jpg', 'lays.jpg', 'limca.jpg', 'lock.jpg', 'love-in-the-cup.jpg', 'microscope.jpg', 'mountain-dew.jpg', 'multifunctional-apple-usb-charger.jpg', 'nikon-camera-lens-cap.jpg', 'nutter-butters.jpg', 'old-lunch-box.jpg', 'old-pot.jpg', 'old-sewing-machines.jpg', 'optimus-prime-toys.jpg', 'orangina.jpg', 'outdoor-benches.jpg', 'pentax-camera.jpg', 'pepsi-perfect.jpg', 'piano-part.jpg', 'pink-flamingo.jpg', 'poker-and-color-chips.jpg', 'practical-and-convenient-household-vacuum-cleaner.jpg', 'precious-and-exquisite-agate-bracelet.jpg', 'premium-saltines.jpg', 'rattan-household-goods.jpg', 'reeses-pieces.jpg', 'rendering-of-the-iphone-6.jpg', 'ritz.jpg', 'robo-berry-blast-pop-tart.jpg', 'rold-gold.jpg', 'romantic-valentines-day-candle.jpg', 'round-cute-little-alarm-clock.jp', 'scissors-transparent-background-png.jpg', 'sim-card-chip-for-mobile-phone.jpg', 'simple-and-exquisite-keyboard.jpg', 'smores-pop-tart.jpg', 'snickers.jpg', 'sodastream.jpg', 'sour-patch-kids.jpg', 'stapler.jpg', 'steam-engine.jpg', 'summer-slippers.jpg', 'tab-clear.jpg', 'tableware.jpg', 'teddy-bear-boy.jpg', 'tostitos.jpg', 'toy-car.jpg', 'traditional-light-bulbs.jpg', 'trolli-gummies.jpg', 'twix.jpg', 'umbrella-gallery.jpg', 'unfrosted-strawberry-pop-tart.jpg', 'unique-lighting.jpg', 'unique-sunglasses.jpg', 'use-mobile-tablets.jpg', 'weathervane.jpg', 'white-keyboard.jpg', 'whoppers.jpg', 'wild-berry-pop-tart.jpg', 'wild-tropical-blast-pop-tart.jpg', 'wind-power-generator.jpg', 'womens-high-heels.jpg', 'wonderful-magnifier.jpg', 'yellow-plastic-toy-duck.jpg'];
  const imglen = images.length;
  const newProds = [];
  let i = 1;
  while (newProds.length < 100) {
    // create array for each product
    // [productId, name, price, prime, imageUrl, numReviews, avgRating]
    newProds.push([i,
      faker.commerce.productName(),
      faker.commerce.price(),
      Math.floor(Math.random() * 2),
      i > imglen ? `https://d1ivqy59bo7rzu.cloudfront.net/${images[i % imglen]}` : `https://d1ivqy59bo7rzu.cloudfront.net/${images[i]}`,
      faker.random.number(),
      (Math.floor((Math.random() * 6) + 5)) / 2,
    ]);
    i += 1;
  }
  await newProds.forEach(async (product) => {
    await models.products.addNew(product);
  });

  // Create associations between products/categories
  for (let j = 1; j < 101; j += 1) {
    const prodCats = new Set();
    while (prodCats.size < 2) {
      prodCats.add(Math.ceil(Math.random() * 10));
    }
    prodCats.forEach(async (categoryId) => {
      // Create params array for each productCategory relationship
      // [id_products, id_categories]
      await models.productCategories.addNew([j, categoryId]);
    });
  }
}

seedDatabase();
