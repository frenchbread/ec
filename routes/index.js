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


    res.render('index', {
        cars    : cars,
        cities  : cities
    });

});

module.exports = router;
