'use strict';

var app = require('angular').module('social');

app.directive('navbar', require('./navbar'));
app.controller('navbarController', require('./navbarController'));