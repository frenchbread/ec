var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressSession = require('express-session');
var config = require('./config');
var app = express();

app.set('views', __dirname + '/views');
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

config.get('ENV') == 'development' ? app.use(logger('dev')) : app.use(logger('combined'));

app.use(expressSession({secret: 'mySecretKey', saveUninitialized: true, resave: true}));

app.use('/', require('./routes'));

app.use(function(req, res, next) {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;
