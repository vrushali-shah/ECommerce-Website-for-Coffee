var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

/**
 * Returns an array of Products stored in Cart
 * @param {any} callback {Products}
 */
exports.getProducts = function (callback) {
    try {
        Product.find({}, (err, prod) => {
            if (!err)
                callback(prod)
        });
    }
    catch (e) {
        console.log("error in order service getCart");
    }
}

/**
 * Returns the latest state of Cart with Product details in it for a particular User login.
 * @param {any} id {User ID}
 * @param {any} callback {All inCart Products of the User}
 */
exports.getCart = function (id, callback) {
    try {
        User
            .findById(id)
            .populate('inCart')
            .populate('inCart.productList')
            .exec(function (err, user) {
                if (!err)
                    callback(user.inCart);
                else
                    console.log("error in order serive getCart exec");
            });
    }
    catch (e) {
        console.log("error in order service getCart");
    }
}

/**
 * Updates the User Cart based on the user actions
 * @param {any} id {User ID}
 * @param {any} update {User action performed for a particular product}
 * @param {any} callback {Update and Save changes}
 */
exports.updateCart = function (id, update, callback) {
    try {
        User.findById(id)
            .populate('inCart')
            .populate('inCart.productList')
            .exec(function (err, user) {
                // Handle any possible database errors
                var aas = JSON.parse(update);
                user.inCart.productList = aas.productList;
                user.inCart.placeName = aas.placeName;
                user.inCart.placeAddress = aas.placeAddress;
                user.inCart.payment = aas.payment;
                user.inCart.totalCost = aas.totalCost;
                user.inCart.save(function (err) {
                    if (err) return console.log(err);
                    // saved!
                })
                if (err)
                    callback(err);
                callback({ "message": "Cart updated!!" });
            });
    }
    catch (e) {
        console.log("error in order service updateCart");
    }
}

/**
 * Confirm User Order. Update and Save its details in User's Order History.
 * @param {any} id {User ID}
 * @param {any} order {Order Details}
 * @param {any} callback {Add details to User Order History}
 */
exports.confirmOrder = function (id, order, callback) {
    try {
           User
            .findById(id)
            .populate('orderHistory')
            .populate('inCart')
            .populate('inCart.productList')
            .exec(function (err, user) {
                if (!err) {
                    let cartOrder = new Order();
                    cartOrder.save(function (err) {
                        if (err) {
                            console.log("error in confirmOrder save");
                        }
                        // saved!
                    });

                    order.orderDate = new Date();
                    user.inCart.productList = order.productList;
                    user.inCart.placeName = order.placeName;
                    user.inCart.placeAddress = order.placeAddress;
                    user.inCart.payment = order.payment;
                    user.inCart.totalCost = order.totalCost;
                    user.inCart.save(function (err) {
                        if (err) return console.log(err);
                        // saved!
                    })
                    user.orderHistory.push(user.inCart);
                    user.inCart = cartOrder;
                    user.inCart.userid = user._id;
                    user.save(function (err) {
                        if (err) {
                            console.log("error in confirmOrder save");
                        }
                        // saved!
                    });

                    callback(user.orderHistory);
                }
                else
                    console.log("error in confirmOrder exec");
            });
    }
    catch (e) {
        console.log("error in order service confirmOrder");
    }
}