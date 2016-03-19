var Datastore = require('nedb');

var restaurants = new Datastore({ filename: './db/restaurants.db', autoload: true });
var hotels = new Datastore({ filename: './db/hotels.db', autoload: true });

exports.restaurants = restaurants
exports.hotels = hotels;
