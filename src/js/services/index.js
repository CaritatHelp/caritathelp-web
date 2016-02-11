'use strict';

var app = require('angular').module('caritathelp');

app.factory('dataService', require('./dataService'));
app.factory('userService', require('./userService'));
