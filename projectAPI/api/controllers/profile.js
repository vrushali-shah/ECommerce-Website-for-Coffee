var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

/**
 * Check if the User is authorized to access Profile page based on User ID and fetch User's Order History.
 */
  if (!req.payload._id) {
    res.status(200).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .populate('inCart')
      .populate('inCart.productList')
      .populate('orderHistory')
      .exec(function(err, user) {
        if(!err)
        res.status(200).json(user);
        else
        console.log("error in profileRead");
      });
  }

};
