'use strict';

var app = require('angular').module('caritathelp');

app.directive('eventSettings', require('./eventSettings'));
app.controller('eventSettingsController', require('./eventSettingsController'));
