var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var city = new Schema({
    key: {
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

exports.City = mongoose.model('city', city);