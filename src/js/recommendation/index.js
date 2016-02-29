'use strict';

var app = require('angular').module('caritathelp');

app.directive('recommendation', require('./recommendation'));
app.controller('recomController', require('./recomController'));
