var mongoose    = require('../lib/mongoose'),
    Schema      = mongoose.Schema;

var hotel = new Schema({
    hotelCodename: {
        type: String
    },
    hotelName: {
        type: String
    },
    dateIn: {
        type: Date
    },
    dateOut: {
        type: Date
    },
    roomType: [
        {
            single: {
                eur: Number,
                rub: Number
            },
            double: {
                eur: Number,
                rub: Number
            },
            tripple: {
                eur: Number,
                rub: Number
            }
        }
    ]
});

module.exports = mongoose.model('Hotel', hotel);