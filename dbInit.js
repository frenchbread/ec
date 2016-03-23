var Datastore = require('nedb');

var hotels = new Datastore({ filename: __dirname + '/db/hotels.db', autoload: true });
var transfers = new Datastore({ filename: __dirname + '/db/transfers.db', autoload: true });
var drivers = new Datastore({ filename: __dirname + '/db/drivers.db', autoload: true });
var excursions = new Datastore({ filename: __dirname + '/db/excursions.db', autoload: true });
var restaurants = new Datastore({ filename: __dirname + '/db/restaurants.db', autoload: true });

exports.hotels = hotels;
exports.transfers = transfers;
exports.drivers = drivers;
exports.excursions = excursions;
exports.restaurants = restaurants;
