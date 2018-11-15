'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var path = require('path');

module.exports = function(app) {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(__dirname, '/../../webapp')));
    app.use(errorHandler());
    
};