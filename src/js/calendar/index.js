'use strict';

var app = require('angular').module('social');

app.directive('calendar', require('./calendar'));
app.controller('calendarController', require('./calendarController'));