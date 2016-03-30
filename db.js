'use strict';

const Datastore = require('nedb');

const hotels = new Datastore({ filename: __dirname + '/db/hotels.db'});
const hotelRates = new Datastore({ filename: __dirname + '/db/hotelRates.db'});
const transfers = new Datastore({ filename: __dirname + '/db/transfers.db'});
const drivers = new Datastore({ filename: __dirname + '/db/drivers.db'});
const excursions = new Datastore({ filename: __dirname + '/db/excursions.db'});
const restaurants = new Datastore({ filename: __dirname + '/db/restaurants.db'});

exports.hotels = hotels;
exports.hotelRates = hotelRates;
exports.transfers = transfers;
exports.drivers = drivers;
exports.excursions = excursions;
exports.restaurants = restaurants;
