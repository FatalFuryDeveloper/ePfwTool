'use strict';

console.log('starting...');

var express = require('express');

var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);

server.listen(3000, function () {
    console.log('Express server listening on localhost:3000');
});

module.exports = app;