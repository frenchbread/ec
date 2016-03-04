var mongoose    = require('../lib/mongoose'),
    Schema      = mongoose.Schema;

var transfer = new Schema({
    title: {
        type: String
    },
    value: {
        type: String
    }
});

module.exports = mongoose.model('Transfer', transfer);