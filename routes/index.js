var express = require('express');
var router = express.Router();

var CarType = require('../models/carTypes').CarType;

//home
router.get('/', function(req, res) {


    CarType.find({}, { _id: 0, created: 0}, function (err, cars) {
        res.render('index', {
            title: 'Initial Express app',
            cars : cars
        });
    })


});

module.exports = router;
