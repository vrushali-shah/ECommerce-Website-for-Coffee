'use strict';
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * Defining a Mongoose-Unique-Validator Dependency
 */
let mongooseUniqueValidator = require('mongoose-unique-validator');
let Prod = require('./product');
/**
 * Mongoose schema for Order object.
 */
let orderSchema = new Schema({
    /**
     * TotalCost of the Order.
     */
    totalCost: {
        type: Number,
        default: 0
    },
    /**
     * UserId of the User who placed the Order.
     */
    userid: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    /**
     * OrderDate of the Order.
     */
    orderDate: {
        type: Date,
        default: new Date()
    },
    /**
     * Receiver's Name of the Order.
     */
    receiverName: {
        type: String,
        default: ""
    },
    /**
     * Place Name where the Order is placed.
     */
    placeName: {
        type: String,
        default: ""
    },
    /**
     * Place Address where the Order is placed.
     */
    placeAddress: {
        type: String,
        default: ""
    },
    /**
     * List of all the Products placed for the Order.
     */
    productList: {
        type: [{
            size: String,         //cup size i.e small/medium/large
            qty: Number,          //quantity of the products
            product: {            //product selected for the Order
                type: Schema.Types.Object,
                ref: 'Product'
            }
        }],
        default: []
    },
    /**
     * Payment Details for the Order.
     */
    payment: {
        holderName: { type: String, default: "" },      //Card Holder Name
        cardNumber: { type: String, default: "" },      //Card Number
        cvv: { type: Number, default: 0 },              //CVV Number
        month: { type: String, default: "" },           //Month of Expiry
        year: { type: String, default: "" },            //Year of Expiry
        }
    },
    {
        usePushEach: true
    });

orderSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Order', orderSchema);
