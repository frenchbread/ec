var express = require('express');
var router = express.Router();

var CarType = require('../models/carType').CarType;
var City    = require('../models/city').City;

//home
router.get('/', function(req, res) {


    CarType.find({}, { _id: 0, created: 0}, function (err, cars) {

        City.find({}, { _id: 0, created: 0}, function (err, cities) {

            res.render('index', {
                title   : 'Initial Express app',
                cars    : cars,
                cities  : cities
            });
        });
    })


});

module.exports = router;
