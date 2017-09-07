const express = require('express');
const logger = require('morgan');
const passport = require('passport');

require('./app_server/models/db');

const app = express();
const port = process.env.PORT || 3000;

const routesApi = require('./app_server/routes/routes');

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.use(logger('dev'));

// Set up routes
app.use(passport.initialize());
app.use('/api/v1', routesApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// error handlers

// unauthorised errors
app.use(function(err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401);
		res.json({"message" : err.name + ": " + err.message});
	}
});

// development error handler
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
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;

app.listen(port);
console.log('Currently running on port:' + port);
