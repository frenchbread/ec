'use strict';

const Datastore = require('nedb');

const hotels = new Datastore({ filename: __dirname + '/db/hotels.db', autoload: true });
const transfers = new Datastore({ filename: __dirname + '/db/transfers.db', autoload: true });
const drivers = new Datastore({ filename: __dirname + '/db/drivers.db', autoload: true });
const excursions = new Datastore({ filename: __dirname + '/db/excursions.db', autoload: true });
const restaurants = new Datastore({ filename: __dirname + '/db/restaurants.db', autoload: true });

exports.hotels = hotels;
exports.transfers = transfers;
exports.drivers = drivers;
exports.excursions = excursions;
exports.restaurants = restaurants;
