'use strict';

var app = require('angular').module('caritathelp');

app.directive('eventCreate', require('./eventCreate'));
app.controller('eventCreateController', require('./eventCreateController'));
