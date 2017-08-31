const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
let gracefulShutdown;

const dbUri = 'mongodb://localhost:27017/emoterv1';

Grid.mongo = mongoose.mongo;
mongoose.connect(dbUri, {
	useMongoClient: true
});


// add grid-fs to mongoose
mongoose.connection.once('useMongoClient', function() {
	let gfs = Grid(mongoose.connection.db);
});
// Connection events
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbUri);
});
mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});



// capture app termination and restart the server
gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};
// nodemon restars
process.once('SIGUSR2', function() {
	gracefulShutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});
// for app termination
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});
// for heroku app termination
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app termination', function(){
		process.exit(0);
	});
});

// bring in models
require('./art');
require('./commission');
require('./user');
