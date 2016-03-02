'use strict';

var app = require('angular').module('caritathelp');

app.directive('friendList', require('./friendList'));
app.controller('friendListController', require('./friendListController'));
