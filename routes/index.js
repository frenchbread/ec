var express = require('express');
var router = express.Router();

var moment = require('moment');

var cars = require('../data/cars');
var cities = require('../data/cities');
var hotels = require('../data/hotelPrises');
var rooms = require('../data/rooms');

var parseData = require('../lib/parseData');

var H = require('../models/hotel');

//home
router.get('/', function(req, res) {

    res.render('index', {
        cars    : cars,
        cities  : cities,
        hotels  : hotels,
        rooms   : rooms
    });

});

router.get('/test', function (req, res) {

    res.render('test', {
        hotels: hotels,
        cities: cities,
        rooms : rooms
    });

});

router.post('/test', function (req ,res) {

    var exampple = [
        {
            city: "",
            hotel: "",
            moveIn: moment,
            moveOut: moment(),
            rooms: [
                {
                    type: "",
                    amount: 0,
                    prisePerOne: 0,
                    prisePerAll: 0
                }
            ],
            prisePerDay: 0,
            priseTotal: 0
        }
    ];

    var data = req.body;

    var accommodations = parseData(data);

    var accs = [];

    // counting total prise
    accommodations.forEach(function (acc) {

        // checks if acc has such fuekd and creates moment date obj
        if (acc.hasOwnProperty("moveIn")) {
            acc.moveIn = moment(acc.moveIn, "DD-MM-YYYY");
        }

        if (acc.hasOwnProperty("moveOut")) {
            acc.moveOut = moment(acc.moveOut, "DD-MM-YYYY");
        }

        var daysWithinAcc = acc.moveOut.diff(acc.moveIn, 'days');

        // TODO: add support for checking dates when selecting from db
        H.findOne({ hotelCodename: acc.hotel }, {roomType:1, hotelName:1, _id:0}, function (err, h) {

            var prisePerDay = 0;
            var priseTotal = 0;
            var rooms = [];

            acc.rooms.forEach(function (r) {

                var roomType = r.type;

                // prise per day for current toomType and hotel
                var prisePerRoomType = h.roomType[0][roomType].eur;

                // prise per all days
                var prisePerAllRooms = r.amount * prisePerRoomType;

                prisePerDay += prisePerAllRooms;

                r.prisePerDayPerRoom = prisePerRoomType;
                r.prisePerDayPerAllRooms = prisePerAllRooms;

            });

        });
    });

    res.json(accommodations);

});

router.post('/', function (req, res) {

    console.log("Processing data..");

    var submittedData = req.body;

    var acc = {
        daysTotal: 0,
        accommodations : [
            {
                accommodationId : 0,
                city            : "",
                hotel           : "",
                moveIn          : "",
                moveout         : "",
                rooms   : [
                    {
                        roomId      : 0,
                        roomType    : "",
                        roomsAmount : 0,
                        roomPrice   : 0
                    }
                ]
            }
        ]
    };

    var accommodations = [];

    for (var i=0; i<=10; i++) {

        //accommodation

        var city = "accommodation_city_" + i;

        if (submittedData.hasOwnProperty(city)) {

            var hotel = "accommodation_hotel_" + i;
            var moveIn = "accommodation_moveIn_" + i;
            var moveOut = "accommodation_moveOut_" + i;

            var cityVal = "";
            var hotelVal = "";
            var moveInVal = "";
            var moveOutVal = "";

            var rooms = [];

            cityVal = submittedData[city];

            if (submittedData.hasOwnProperty(hotel)) {
                hotelVal = submittedData[hotel];
            }

            if (submittedData.hasOwnProperty(moveIn)) {
                moveInVal = moment(submittedData[moveIn], "DD-MM-YYYY");
            }

            if (submittedData.hasOwnProperty(moveOut)) {
                moveOutVal = moment(submittedData[moveOut], "DD-MM-YYYY");
            }

            for (var j=0; j<=50; j++) {

                var roomType    = "room_roomType_"+i+"_"+j;

                if (submittedData.hasOwnProperty(roomType)) {

                    var roomAmount  = "room_roomAmount_"+i+"_"+j;
                    var roomPrice   = "room_roomPrice_"+i+"_"+j;

                    var roomTypeVal     = "";
                    var roomAmountVal   = 0;
                    var roomPriceVal    = 0;

                    roomTypeVal     = submittedData[roomType];
                    roomAmountVal   = submittedData[roomAmount];
                    roomPriceVal    = submittedData[roomPrice];

                    //if (submittedData.hasOwnProperty[roomAmount]) {
                    //    roomAmountVal = submittedData[roomAmount];
                    //}
                    //
                    //if (submittedData.hasOwnProperty[roomPrice]) {
                    //    roomPriceVal = submittedData[roomPrice];
                    //}

                    rooms.push({
                        roomId      : j,
                        roomType    : roomTypeVal,
                        roomAmount  : roomAmountVal,
                        roomPrice   : roomPriceVal

                    });

                }


            }

            accommodations.push({
                accommodationId : i,
                city            : cityVal,
                hotel           : hotelVal,
                moveIn          : moveInVal,
                moveOut         : moveOutVal,
                rooms           : rooms
            });
        }
    }

    //calculation
    var accommodationsCount = accommodations.length;
    var fullCost            = 0;


    for (var k=0; k<accommodationsCount; k++){

        var days = accommodations[k].moveOut.diff(accommodations[k].moveIn, 'days');

        for (var l=0; l<accommodations[k].rooms.length; l++) {

            fullCost += parseInt(accommodations[k].rooms[l].roomPrice) * parseInt(accommodations[k].rooms[l].roomAmount) * days;

        }

    }


    var program = [
        {
            day  : 0,
            city : "",
            services: [
                {
                    type        : "",
                    // driver & transfer
                    carType     : "",
                    from        : "",
                    to          : "",
                    //rest
                    restaurant  : "",
                    menu        : "",
                    //excursion
                    goingPlace  : "",
                    pplAmount   : "",

                    price       : 0
                }
            ]
        }
    ];

    var programs = [];
    var services = [];

    for (var m=0; m<=10; m++) {

        var day = "day_city_" + m;

        if (submittedData.hasOwnProperty(day)) {

            for (var n=0; n<=50; n++) {

                var serviceType = "service_serviceType_"+m+"_"+n;

                if (submittedData.hasOwnProperty(serviceType)) {

                    var serviceTypeVal = submittedData[serviceType];

                    //transfer
                    var transferCarType   = "";
                    var transferCarAmount = 0;
                    var transferFrom      = "";
                    var transferTo        = "";
                    var transferPrice     = 0;

                    //driver
                    var driverCarType    = "";
                    var driverHours      = "";
                    var driverCarsAmount = 0;
                    var driverPrice      = 0;

                    //excursion
                    var goingPlace      = "";
                    var pplAmount       = "";
                    var excursionPrice  = 0;

                    //food
                    var restaurant      = "";
                    var menu            = "";
                    var foodPrice       = "";

                    switch (serviceTypeVal) {
                        case "transfer" :

                            transferCarType = submittedData["transferCarType_"+m+"_"+n];
                            transferCarAmount = submittedData["transferCarAmount_"+m+"_"+n];
                            transferFrom    = submittedData["transferFrom_"+m+"_"+n];
                            transferTo      = submittedData["transferTo_"+m+"_"+n];
                            transferPrice   = submittedData["transferPrice_"+m+"_"+n];

                            services.push({
                                type    : serviceTypeVal,
                                cars    : transferCarAmount,
                                carType : transferCarType,
                                from    : transferFrom,
                                to      : transferTo,
                                price   : transferPrice
                            });

                            break;
                        case "withDriver" :

                            driverCarType       = submittedData["driverCarType_"+m+"_"+n];
                            driverHours         = submittedData["driverHours_"+m+"_"+n];
                            driverCarsAmount    = submittedData["driverCarsAmount_"+m+"_"+n];
                            driverPrice         = submittedData["driverPrice_"+m+"_"+n];

                            services.push({
                                type    : serviceTypeVal,
                                carType : driverCarType,
                                hours   : driverHours,
                                cars    : driverCarsAmount,
                                price   : driverPrice
                            });

                            break;
                        case "excursion" :

                            goingPlace      = submittedData["goingPlace_"+m+"_"+n];
                            pplAmount       = submittedData["pplAmount_"+m+"_"+n];
                            excursionPrice  = submittedData["excusrionPrice_"+m+"_"+n];

                            services.push({
                                type        : serviceTypeVal,
                                goingPlace  : goingPlace,
                                pplAmonut   : pplAmount,
                                price       : excursionPrice
                            });

                            break;
                        case "food" :

                            restaurant      = submittedData["restaurant_"+m+"_"+n];
                            menu            = submittedData["menuTitle_"+m+"_"+n];
                            foodPrice       = submittedData["foodPrice_"+m+"_"+n];

                            services.push({
                                type        : serviceTypeVal,
                                restaurant  : restaurant,
                                memu        : menu,
                                price       : foodPrice
                            });

                            break;
                    }

                }

            }

            programs.push({
                day         : m,
                city        : submittedData[day],
                services    : services
            });

        }


    }

    // calculations

    var programsCount = programs.length;
    var secondCost = 0;

    for (var p=0; p<programsCount; p++){

        //var days = accommodations[k].moveOut.diff(accommodations[k].moveIn, 'days');

        for (var o=0; o<programs[p].services.length; o++) {

            secondCost += parseInt(programs[p].services[o].price);

        }

    }


    fullCost += secondCost;


    var trip = {
        documentFor     : req.body.documentFor,
        tripStarts      : req.body.tripStarts,
        tripEnds        : req.body.tripEnds,
        totalGuests     : req.body.guestsCount,
        accommodation   : accommodations,
        program         : programs,
        price           : fullCost
    };

    console.log(trip);

    res.render('checkout', {
        trip: trip
    });
});

module.exports = router;
