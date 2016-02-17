Accommodations = new Meteor.Collection('accommodations');

var cityValues = [
    { label: "Санкт-Петербург", value: "spb" },
    { label: "Москва", value: "msk" }
];

var hotelValues = [

];

AccommodationsSchema = new SimpleSchema({
    accommodations: {
        type: Array,
        optional: true,
        minCount: 0,
        maxCount: 5
    },
    "accommodations.$": {
        type: Object
    },
    "accommodations.$.city": {
        type: String,
        autoform: {
            options: cityValues
        }
    },
    "accommodations.$.hotel": {
        type: String
    },
    "accommodations.$.moveIn": {
        type: Date,
        autoform: {
          type: "bootstrap-datepicker"
        }
    },
    "accommodations.$.MoveOut": {
        type: Date,
        autoform: {
          type: "bootstrap-datepicker"
        }
    },
    "accommodations.$.rooms": {
        type: Array,
        optional: true,
        minCount: 0,
        maxCount: 5
    },
    "accommodations.$.rooms.$": {
        type: Object
    },
    "accommodations.$.rooms.$.type": {
        type:String
    },
    "accommodations.$.rooms.$.amount": {
        type:String
    }
});

Accommodations.attachSchema(AccommodationsSchema);

var hotelPrices = [
    {
        "hotelCodename": "grand",
        "hotelName": "Grand Hotel Europe 5*",
        "dateIn": new Date(2015, 9, 1),
        "dateOut": new Date(2015, 10, 31),
        "roomType": {
            "single": {
                "eur": 300,
                "rub": ""
            },
            "double": {
                "eur": 400,
                "rub": ""
            },
            "tripple": {
                "eur": 500,
                "rub": ""
            }
        }
    },
    {
        "hotelCodename": "w",
        "hotelName": "W ST.PETERSBURG 5*",
        "dateIn": new Date(2015, 9, 1),
        "dateOut": new Date(2015, 10, 31),
        "roomType": {
            "single": {
                "eur": 350,
                "rub": ""
            },
            "double": {
                "eur": 450,
                "rub": ""
            },
            "tripple": {
                "eur": 550,
                "rub": ""
            }
        }
    },
    {
        "hotelCodename": "astoria",
        "hotelName": "Astoria 5*",
        "dateIn": new Date(2015, 9, 1),
        "dateOut": new Date(2015, 10, 31),
        "roomType": {
            "single": {
                "eur": 250,
                "rub": ""
            },
            "double": {
                "eur": 350,
                "rub": ""
            },
            "tripple": {
                "eur": 450,
                "rub": ""
            }
        }
    },
    {
        "hotelCodename": "agnle",
        "hotelName": "Angleterre 4*",
        "dateIn": new Date(2015, 9, 1),
        "dateOut": new Date(2015, 10, 31),
        "roomType": {
            "single": {
                "eur": 300,
                "rub": ""
            },
            "double": {
                "eur": 400,
                "rub": ""
            },
            "tripple": {
                "eur": 500,
                "rub": ""
            }
        }
    },
    {
        "hotelCodename": "crowne",
        "hotelName": "CROWNE PLAZA LIGOVSKY 4*",
        "dateIn": new Date(2015, 9, 1),
        "dateOut": new Date(2015, 10, 31),
        "roomType": {
            "single": {
                "eur": 300,
                "rub": ""
            },
            "double": {
                "eur": 400,
                "rub": ""
            },
            "tripple": {
                "eur": 500,
                "rub": ""
            }
        }
    }
];


// var example = [
//         {
//             city: "",
//             hotel: "",
//             moveIn: moment,
//             moveOut: moment(),
//             rooms: [
//                 {
//                     type: "",
//                     amount: 0,
//                     prisePerOne: 0,
//                     prisePerAll: 0
//                 }
//             ],
//             prisePerDay: 0,
//             priseTotal: 0
//         }
//     ];
