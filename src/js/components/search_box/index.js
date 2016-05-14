'use strict';

var app = require('angular').module('caritathelp');

app.directive('searchBox', require('./searchBox'));
app.controller('searchBoxController', require('./searchBoxController'));
