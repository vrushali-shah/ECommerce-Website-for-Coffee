var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
/**
 * Define the Authentication Token
 */
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});
const homeController = require('../controllers/home-controller');
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

/**
 * Define Routes for Navigation based on User actions and Authentication token
 */

router.get('/profile', auth, ctrlProfile.profileRead);          //navigate to Profile page WITH  User Token
router.get('/product', homeController.getProducts);             //navigate to Product page WITHOUOT  User Token
router.get('/cafes/:pos', homeController.getCafes);             //navigate to FindStores page WITHOUT  User Token
router.get('/cart', auth, homeController.getCart);              //navigate to Cart page WITH  User Token
router.post('/register', ctrlAuth.register);                    //navigate to Register page WITHOUT  User Token
router.post('/login', ctrlAuth.login);                          //navigate to Profile page WITH  User Token
router.post('/order/confirm', homeController.confirmOrder);     //navigate to Profile page WITH  User Token
router.post('/cart/update', auth, homeController.updateCart);   //navigate to Profile page WITH  User Token

module.exports = router;
