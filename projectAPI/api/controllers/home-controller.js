'use strict';

const mapsServices = require('../services/maps-service');
const orderServices = require('../services/order-service');

/**
 * Returns a list of nearby cafes in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.getCafes = function (request, response) {
    let callback = function (list) {
        response.status(200);
        response.json(list);
    };
    mapsServices.getCafes(request.params.pos, callback);
};

/**
 * Returns a list of products in Cart in JSON based on the
 * input parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.getCart = function (request, response) {
    let callback = function (list) {
        response.status(200);
        response.json(list);
    };
   
    if (!request.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private cart"
        });
    } else {
        orderServices.getCart(request.payload._id,callback);
    }
}

/**
 * Returns a list of products in JSON based on the
 * input parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.getProducts = function (request, response) {
    let callback = function (list) {
        response.status(200);
        response.json(list);
    };
        orderServices.getProducts(callback);
}

/**
 * Returns a list of products for confirmed order in JSON based on the
 * input parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.confirmOrder = function (request, response) {
    let callback = function (list) {
        response.status(200);
        response.json(list);
    };
   
    if (!request.body._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private cart"
        });
    } else {
        orderServices.confirmOrder(request.body._id,request.body.Order,callback);
    }
}

/**
 * Returns a list of products to update the Cart in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.updateCart = function (request, response) {
    let callback = function (list) {
        response.status(200);
        response.json(list);
    };
   
    if (!request.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private cart"
        });
    } else {
        
        orderServices.updateCart(request.payload._id,request.body.Order,callback);
    }
}