var express = require('express'),
app = express(),
port = process.env.PORT || 3000;

var Raven = require('raven');
Raven.config('https://61a059f537174f0bb57923e793d22055:43b19b9943864afb97766a651d02bdb9@sentry.io/258849').install();

// The cnt var we use to show in the cnt route
cnt = 0;

// Define the ping route
app.get('/ping', function(req, res) {
    cnt++;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ "message": "pong" }));
});

// Define the cnt route
app.get('/cnt', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ "pinCnt": cnt }));
});

// Start the listening
app.listen(port);
console.log('Port of the app: ' + port);
Raven.captureMessage('App is starting');


// Start reading from stdin so we don't exit.
process.stdin.resume();

// On server stop (Ctrl + C) or do something when app is closing
process.on('SIGINT', function () {
    Raven.captureMessage("App done");
});
process.on('exit', function () {
    Raven.captureMessage("App done");
});

// ctrl+c event
process.on('SIGINT', function () {
    Raven.captureMessage("App quit");
});

// catches "kill pid"
process.on('SIGUSR1', function () {
    Raven.captureMessage("Kill pid exception");
});
process.on('SIGUSR2', function () {
    Raven.captureMessage("Kill pid exception");
});

//catches uncaught exceptions
process.on('uncaughtException', function () {
    Raven.captureMessage("Error occured, app crashed");
});