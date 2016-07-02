'use strict';

var app = require('angular').module('caritathelp');

app.directive('userActions', require('./userActions'));
app.controller('userActionsController', require('./userActionsController'));
