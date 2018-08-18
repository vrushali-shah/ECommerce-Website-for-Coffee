var mongoose = require('mongoose');
var gracefulShutdown;
/**
 * MongoDB URI for making connection.
 */
var dbURI = 'mongodb://localhost/projectAPI';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);
  
/**
 * Connecting to MongoDB
 */
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
    /**
     * Checks if Product Collection exists in the DB. 
     * If it doesnot exist, save various Products to the db.
     */
  mongoose.model("Product").count({}, function(err, count){
    console.log( "Product docs: ", count );
    if(count<1)
      addProduct();
    console.log( "Product docs: ", count );
});
});
/**
 * Capture the Error events
 * To be called when the process has errors
 */
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
/**
 * Capture when DB is disconnected
 * To be called when the process is disconnected
 */
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});
/**
 * Capture the Restart or Termination Events
 * To be called when the process is restarted or terminated
 */
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
/**
 * For nodemon restarts
 */
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
/**
 * For app termination
 */
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
/**
 * For Heroku app termination
 */
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});
/**
 * Define DB Schemas and Models
 */
require('./users');
var Product = mongoose.model('Product');

/**
 * Generating and Saving data for Products on Menu Page to DB
*/
addProduct = function () {
    let prod1 = new Product({
        name: "Iced-Coffee",
        description: "Iced coffee is cold coffee with ice.",
        type: "mild",
        rating: 3.5,
        small: 2.99,
        medium: 3.99,
        large: 4.99,
        image:"assets/images/iced_coffee.jpg"
    });
    prod1.save();

    let prod2 = new Product({
        name: "Iced-Coffee With Milk",
        description: "A plain Iced Coffee With Milk - a venti with 2 percent has just 60 calories and 5 grams of sugar. You'll still get the caffeine kick and refreshment of a cold drink — and all the health benefits coffee provides.",
        type: "mild",
        rating: 3.7,
        small: 3.49,
        medium: 4.99,
        large: 5.99,
        image: "assets/images/iced_coffee_with_milk.jpg"
    });
    prod2.save();

    let prod3 = new Product({
        name: "Espresso Vanilla Latte",
        description: "Inspired by a classic enjoyed in our cafes every day. A velvety smooth blend of vanilla flavor with bold espresso and creamy milk.",
        type: "mild",
        rating: 3.2,
        small: 3.99,
        medium: 4.99,
        large: 5.99,
        image: "assets/images/espresso_vanilla_latte.jpg"
    });
    prod3.save();

    let prod4 = new Product({
        name: "Espresso Caffe Mocha",
        description: "Flavored with other natural flavors. 140 calories per 8 fl oz serving. Chilled espresso beverage. 40 fl oz (1.25 qt) 1.18L.",
        type: "strong-bitter",
        rating: 3.8,
        small: 3.49,
        medium: 4.99,
        large: 5.99,
        image: "assets/images/espresso_caffe_mocha.jpg"
    });
    prod4.save();

    let prod5 = new Product({
        name: "Caffe Americano",
        description: "Caffè Americano or Americano is a type of coffee drink prepared by diluting an espresso with hot water, giving it a similar strength to, but different flavor from traditionally brewed coffee.",
        type: "mild",
        rating: 3.4,
        small: 2.99,
        medium: 3.99,
        large: 4.99,
        image: "assets/images/caffe_americano.jpg"
    });
    prod5.save();

    let prod6 = new Product({
        name: "Caffe Latte",
        description: "Caffè latte is a coffee-based drink made primarily from espresso and steamed milk. It consists of one-third espresso, two-thirds heated milk and about 1cm of foam.",
        type: "mild",
        rating: 3.5,
        small: 2.49,
        medium: 3.49,
        large: 4.49,
        image: "assets/images/caffe_latte.jpg"
    });
    prod6.save();

    let prod7 = new Product({
        name: "Caffe Mocha",
        description: "We combine our rich, full-bodied espresso with bittersweet mocha sauce and steamed milk, then top it off with sweetened whipped cream. The classic coffee drink to satisfy your sweet tooth.",
        type: "bitter-sweet",
        rating: 3.3,
        small: 3.59,
        medium: 4.99,
        large: 6.99,
        image: "assets/images/caffe_mocha.jpg"
    });
    prod7.save();

    let prod8 = new Product({
        name: "Cappuccino",
        description: "Cappuccino is a coffee drink that today is composed of double espresso and hot milk, with the surface topped with foamed milk. Cappuccinos are most often prepared with an espresso machine. Cappuccino is traditionally small (max 180 ml) with a thick layer of foam.",
        type: "mild",
        rating: 3.6,
        small: 2.99,
        medium: 3.99,
        large: 4.99,
        image: "assets/images/cappuccino.jpg"
    });
    prod8.save();

    let prod9 = new Product({
        name: "Crystal Ball Frap",
        description: "A mystical, turquoise peach infusion Frappuccino Crème blended beverage topped with peach flavored whipped cream and one of three different candy gems that reveal your fortune. Order, gaze, then all will be told. And while we can't predict what your gems will reveal, we can tell you this drink is only here for a few short days.",
        type: "mild-sour",
        rating: 3.1,
        small: 3.49,
        medium: 5.99,
        large: 7.99,
        image: "assets/images/crystal_ball_frap.jpg"
    });
    prod9.save();

    let prod10 = new Product({
        name: "Java Chip Frap",
        description: "We blend mocha sauce and Frappuccino chips with coffee and milk and ice, then top with whipped cream and mocha drizzle to bring you endless java joy.",
        type: "mild",
        rating: 3.9,
        small: 4.99,
        medium: 6.99,
        large: 8.99,
        image: "assets/images/java_chip_frap.jpg"
    });
    prod10.save();

    let prod11 = new Product({
        name: "Cupcake Creme Frap",
        description: "Start with the Vanilla Bean Crème Frappuccino, add hazelnut syrup, blend together and finish with whipped cream. A sip of cake flavor in every bite.",
        type: "sweet",
        rating: 2.9,
        small: 1.99,
        medium: 2.49,
        large: 3.99,
        image: "assets/images/cupcak_creme_frap.jpg"
    });
    prod11.save();

    let prod12 = new Product({
        name: "Cinnamon Roll Frap",
        description: "Cinnamon dolce syrup blended together with coffee, white chocolate mocha sauce and vanilla bean, topped with whipped cream and a cinnamon dolce sprinkle. Sweet and spicy … that’s how we roll.",
        type: "bitter-sweet",
        rating: 3.5,
        small: 2.99,
        medium: 3.99,
        large: 4.99,
        image: "assets/images/cinnamon_roll_frap.jpg"
    });
    prod12.save();
}