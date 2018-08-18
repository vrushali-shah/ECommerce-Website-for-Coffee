 'use strict'
var mongoose = require( 'mongoose' );
/**
 * Encrypt the User password before saving.
 */
var crypto = require('crypto');
/**
 * JWT Token for User Login and Authentication.
 */
var jwt = require('jsonwebtoken');
var order=require('./order');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');
/**
 * Mongoose Schema for User Object
 */
var userSchema = new mongoose.Schema({
/**
 * Email for User object
 */
  email: {
    type: String,
    unique: true,
    required: true,
    default:""
  },
/**
 * Name of the User Object
 */
  name: {
    type: String,
    required: true,
    default:""
    },
/**
 * Hash value of the User Object
 */
  hash: String,
  salt: String,
/**
 * Order History of the User.
 */
  orderHistory: [{
     type: Schema.Types.ObjectId,
     ref: 'Order'
    }], default: [],

  /**
    * Incart Order of the User.
    */
    inCart: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        default: new order()
    }
},
 { 
   usePushEach: true 
});
/**
 * Set the encrypted password for the User
 */
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
/**
 * Validates the User password
 */
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};
/**
 * Generates a JWT Token for User Session
 */
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

userSchema.plugin(mongooseUniqueValidator);

mongoose.model('User', userSchema);
