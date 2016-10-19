'use strict';

var app = require('angular').module('caritathelp');

app.factory('dataService', require('./dataService'));
app.factory('userService', require('./userService'));
app.factory('notifService', require('./notifService'));

app.service('DataVolunteers', require('./API/DataVolunteers'));
app.service('DataAssociations', require('./API/DataAssociations'));
app.service('DataEvents', require('./API/DataEvents'));
app.service('DataNews', require('./API/DataNews'));
app.service('DataChat', require('./API/DataChat'));
