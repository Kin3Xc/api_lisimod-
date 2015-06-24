// Require Dependencias
var express = require('express');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('favicon');
var fs = require('fs');



fs.readdirSync(__dirname+ '/models').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname+'/models/'+filename);
});
 

// require mongo
var db = require('./db/db.js');
db.conectar();
var app = express();



// middlewares
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

// routes API
app.use('/', require('./routes'));


// ERROR HANDLERS

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

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


// Start the server
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;