'use strict';

const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');
/**
 * Mongoose schema for Product.
 */
let productSchema = new Schema({
    /**
     * Name of the Product object.
     */
    name: {
        type: String,
        required: true
    },
    /**
     * Description of the Product object.
     */
    description: {
        type: String,
        required: true
    },
    /**
     * Type of the Product object.
     */
    type: {
        type: String,
        required: true
    },
    /**
     * Rating of the Product object.
     */
    rating: {   
        type: Number,
    },
    /**
     * Image path of the Product object to be read from UI Assets folder.
     */
    image:String,
    /**
     * Size Small of the Product object.
     */
    small: Number,
    /**
     * Size Medium of the Product object.
     */
    medium: Number,
    /**
     * Size Large of the Product object.
     */
    large: Number
});

productSchema.plugin(mongooseUniqueValidator);

let ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
