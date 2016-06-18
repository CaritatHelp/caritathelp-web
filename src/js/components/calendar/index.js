'use strict';

var app = require('angular').module('caritathelp');

app.directive('calendar', require('./calendar'));
app.controller('calendarController', require('./calendarController'));
