var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var carType = new Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.CarType = mongoose.model('carType', carType);