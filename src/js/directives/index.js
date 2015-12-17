'use strict';

var app = require('angular').module('social');

app.directive('debug', require('./Debug'));
// app.directive('formInput', require('./FormInput'));
app.directive('compareTo', require('./CompareTo'));