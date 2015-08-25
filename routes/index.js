var express = require('express');
var router = express.Router();

//home
router.get('/', function(req, res) {

    var cars = [

        {

            "value": "Стандарт",
            "title": "Standart"

        },
        {

            "value": "Бизнес",
            "title": "Business"

        },
        {

            "value": "Премиум",
            "title": "Premium"

        },
        {

            "value": "Минивен эконом",
            "title": "Miniven eco"

        },
        {

            "value": "Минивен бизнес",
            "title": "Minivan business"

        },
        {

            "value": "Минивен премиум",
            "title": "Minivan premium"

        },
        {

            "value": "Микроавтобус",
            "title": "Microbus"

        },

        {
            "value": "Автобус",
            "title": "Autobus"
        }

    ];

    var cities = [

        {

            "value": "Санкт-Петербург",
            "key": "spb"

        },

        {
            "value": "Москва",
            "key": "msk"
        }

    ];

    var hotels = [
        {
            "title": "Grand Hotel Europe 5*",
            "value": ""
        },{
            "title": "W ST.PETERSBURG 5*",
            "value": ""
        },{
            "title": "Astoria 5*",
            "value": ""
        },{
            "title": "Angleterre 4*",
            "value": ""
        },{
            "title": "CROWNE PLAZA LIGOVSKY 4*",
            "value": ""
        },{
            "title": "Dostoevsky 3*",
            "value": ""
        },{
            "title": "Novotel St.-Petersburg Centre 4*",
            "value": ""
        },{
            "title": "MOIKA 22 Kempinski 5*",
            "value": ""
        },{
            "title": "COURTYARD by Marriott St.Petersburg Vasilievsky 4*",
            "value": ""
        },{
            "title": "SOKOS PALACE BRIDGE 5*",
            "value": ""
        },{
            "title": "SOKOS  Olimpia Garden 5*",
            "value": ""
        },{
            "title": "Sokos Hotel Vasilievsky 4*",
            "value": ""
        },{
            "title": " Corinthia Nevsky Palace 5*",
            "value": ""
        }
    ];

    var rooms = [
        {
            "title" : "Single"
        },
        {
            "title" : "Double"
        },
        {
            "title" : "Triple"
        }
    ];


    res.render('index', {
        cars    : cars,
        cities  : cities,
        hotels  : hotels,
        rooms   : rooms
    });

});

router.post('/', function (req, res) {
    console.log("Processing data..");
    console.log(req.body);

    var submittedData = req.body;

    var accommodationsList = [];

    var test = {
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

    var trip = {};
    var accommodations = [];

    //for (var key in req.body){
    //
    //}

    for (var i = 1; i<=10; i++){

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
                moveInVal = submittedData[moveIn];
            }

            if (submittedData.hasOwnProperty(moveOut)) {
                moveOutVal = submittedData[moveOut];
            }

            for (var j =1; j<=50; j++) {

                var roomType    = "room_roomType_"+i+"_"+j;

                if (submittedData.hasOwnProperty(roomType)) {

                    var roomAmount  = "room_roomAmount_"+i+"_"+j;
                    var roomPrice   = "room_roomPrice_"+i+"_"+j;

                    var roomTypeVal     = "";
                    var roomAmountVal   = "";
                    var roomPriceVal    = 0;

                    roomTypeVal = submittedData[roomType];

                    if (submittedData.hasOwnProperty[roomAmount]) {
                        roomAmountVal = submittedData[roomAmount];
                    }

                    if (submittedData.hasOwnProperty[roomPrice]) {
                        roomPriceVal = submittedData[roomPrice];
                    }

                    rooms.push({
                        roomId      : j,
                        roomType    : roomTypeVal,
                        roomsAmount : roomAmountVal,
                        roomPrice   : roomPriceVal

                    });

                }


            }

            accommodations.push({
                accommodationId : i,
                city            : cityVal,
                hotel           : hotelVal,
                moveIn          : moveInVal,
                moveout         : moveOutVal,
                rooms           : rooms
            });
        }
    }

    console.log(accommodations);

    res.redirect('/');
});

module.exports = router;
