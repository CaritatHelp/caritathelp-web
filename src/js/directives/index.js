'use strict';

var app = require('angular').module('social');

app.directive('navbar', require('./Navbar'));
app.directive('debug', require('./Debug'));