var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

/**
 * Register a new User and initialize User's Cart, Order History.
 * Set the User token.
 * 
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
module.exports.register = function (req, res) {
  try {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);
    let cartOrder = new Order();
    cartOrder.save(function (err) {
      if (err) {
        console.log("error in inCart save");
      }
      // saved!
    });
    user.inCart = cartOrder.id;
    user.inCart.userid = user.id;

    user.orderHistory = new Array();
    user.save(function (err) {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    });
  }
  catch (e) {
    console.log("errrrrr");
  }
};

/**
 * Authenticate and allow Login for an existing User.
 * 
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
module.exports.login = function (req, res) {

  passport.authenticate('local', function (err, user, info) {
    var token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      // If user is not found
      res.status(200).json(info);
    }
  })(req, res);
};