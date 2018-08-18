let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    passport = require('passport');
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    require('./api/models/db');
    require('./api/config/passport');

var routesApi = require('./api/routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Initialize app
let initApp = require('./api/app');
initApp(app);

app.listen(port);
console.log('ProjectAPI RESTful API server started on: ' + port);