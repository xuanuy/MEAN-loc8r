var mongoose = require('mongoose');
var dbURI;
if (process.env.NODE_ENV === "production") {
    dbURI = process.env.MONGOLAB_URI;
} else {
    dbURI = 'mongodb://localhost/loc8r';
}
mongoose.connect(dbURI);

require('../controllers/locations');

var dbURIlog = 'mongodb://localhost/loc8rlog';
var logDB = mongoose.createConnection(dbURIlog);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

var readLine = require("readline");
if (process.platform === "win32") {
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}

function gracefulShutdown(msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
}

// nodemon terminates
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// app terminates
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// Heroku terminate
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});