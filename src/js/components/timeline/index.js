'use strict';

var app = require('angular').module('caritathelp');

app.directive('timeline', require('./timeline'));
app.controller('timelineController', require('./timelineController'));
