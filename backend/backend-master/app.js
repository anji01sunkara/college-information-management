var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//importing the routes
var indexRouter = require('./routes/index');
var galleryRouter = require('./routes/gallery');
var facultyRouter = require('./routes/faculty');
var noticesRouter = require('./routes/notices');
var placementsRouter = require('./routes/placements');
var app = express();

//server setup
const port = 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//db setup
const db = require('./routes/query')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//allowing cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




  //init routes
app.use('/', indexRouter);
app.use('/gallery', galleryRouter);
app.use('/faculty', facultyRouter);
app.use('/notices', noticesRouter);
app.use('/placements', placementsRouter);
app.get('/users', db.getUsers)







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
