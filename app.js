var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var config = require('./config');

var app = express();

//manually setup
app.set('port', process.env.PORT || 8080);
app.listen(8080);




var findAuthors = function(db, callback) {
    
   var cursor = db.collection('authors').find( );

   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};


console.dir(config.mongodb);


var mdb = config.mongodb.db;
var mds = config.mongodb.ds;
var usr = config.mongodb.user;
var pas = config.mongodb.password;
var num = config.mongodb.port;

var url = 'mongodb://'+usr+':'+pas+'@'+mds+'.mongolab.com:'+num+'/'+mdb;

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
    
  findAuthors(db, function() {
      db.close();
  });    
    
  console.log("Connected correctly to server.");
  //db.close();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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