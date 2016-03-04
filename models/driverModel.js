var mongoose    = require('../lib/mongoose'),
    Schema      = mongoose.Schema;

var driver = new Schema({
    title: {
        type: String
    },
    value: {
        type: String
    }
});

module.exports = mongoose.model('Driver', driver);