'use strict';

var app = require('angular').module('caritathelp');

app.factory('dataService', require('./dataService'));
app.factory('userService', require('./userService'));
app.factory('notifService', require('./notifService'));

app.service('DataVolunteers', require('./API/DataVolunteers'));
