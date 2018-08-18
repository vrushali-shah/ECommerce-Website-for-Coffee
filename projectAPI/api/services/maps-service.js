'use strict';
/**
 * Define Google API Key for fetching nearby locations
 */
var googleApiKey = 'AIzaSyAly2_tJUskaQoxaf7CY2kMD2SRqU2gPCo',
    googleMapsClient = require('@google/maps').createClient({
        key: googleApiKey
    });

/**
 * Returns an array of location object matching the specified Search parameters.
 * To search with Zipcode or Current Geographical Location
 *
 * @param {Object} params {Position parameters}
 * @param {function} callback {Sucess callback function}
 */
exports.getCafes = function (pos, callback) {
  
    if (!pos.includes(",")) {
        getCafesUsingZipcode(pos, callback)
    }
    else {
        getCafesUsingGeo(pos, callback);
    }
};

/**
 * Returns an array of Cafes withing a radius of 500 meters from the User's current location
 * @param {any} pos {Current User location}
 * @param {any} callback {Array of nearby Cafes}
 */
function getCafesUsingGeo(pos, callback) {
    googleMapsClient.placesNearby({
        location: pos,
        radius: 500,
        type:'cafe'
    }, function (err, response) {
        if (!err) {
            console.log("Found " + response.json.results.length + " cafes.");
            callback(response.json.results);
        }
        else {
            console.log("Error in cafesUsingGeo:\n" + err);
        }
    });
}

/**
 * Returns an array of Cafes based on the Zipcode or Valid Input specified by the User
 * @param {any} pos {Zipcode or User Input}
 * @param {any} callback {Array of Cafes surrounding the zipcode specified}
 */
function getCafesUsingZipcode(zipcode, callback) {
    googleMapsClient.geocode({
        address: zipcode
    }, function (err, response) {
        if (!err) {
            console.log(response.json.results);
            let location = response.json.results[0].geometry.location;
            getCafesUsingGeo(location.lat + "," + location.lng,callback);
        }
        else {
            console.log("Error in getLatLng:\n" + err);
        }
    });
}