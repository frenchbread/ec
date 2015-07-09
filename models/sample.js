var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
    },
    time:{
        type: String
    },
    date:{
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Sample = mongoose.model('Sample', schema);