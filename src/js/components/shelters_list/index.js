'use strict';

var app = require('angular').module('caritathelp');

app.directive('sheltersList', require('./sheltersList'));
app.controller('sheltersListController', require('./sheltersListController'));
