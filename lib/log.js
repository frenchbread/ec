var winston = require('winston');
var ENV = require('../config').get("ENV");

function getLogger(module) {

    var path = module.filename.split('/').slice(-2).join('/');

    var wl = new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: (ENV == 'development') ? 'debug' : 'error',
                label: path
            })
        ]
    });

    return wl;

}

module.exports = getLogger;