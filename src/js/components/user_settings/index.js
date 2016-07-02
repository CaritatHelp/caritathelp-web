'use strict';

var app = require('angular').module('caritathelp');

app.directive('userSettings', require('./userSettings'));
app.controller('userSettingsController', require('./userSettingsController'));
