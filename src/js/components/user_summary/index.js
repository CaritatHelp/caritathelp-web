'use strict';

var app = require('angular').module('caritathelp');

app.directive('userSummary', require('./userSummary'));
app.controller('userSummaryController', require('./userSummaryController'));
