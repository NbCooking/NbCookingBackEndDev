var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var routes = require('./app/routes/index');
var subscribe = require('./app/routes/subscribe');
var profile = require('./app/routes/profile');
var account = require('./app/routes/account');
var offer = require('./app/routes/offer');
var cart = require('./app/routes/cart');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nbcooking');

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'Un PasswOrd 2 M4lad3!@', cookie: { maxAge: 60 * 60 * 1000 }}));


app.use('/', routes);
app.use('/subscribe', subscribe);
app.use('/profile', profile);
app.use('/account', account);
app.use('/login', account);
app.use('/offer', offer);
app.use('/cart', cart);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
