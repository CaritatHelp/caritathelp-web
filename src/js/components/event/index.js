'use strict';

var app = require('angular').module('caritathelp');

app.directive('event', require('./event'));
app.controller('eventController', require('./eventController'));
