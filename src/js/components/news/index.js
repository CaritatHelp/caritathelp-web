'use strict';

var app = require('angular').module('caritathelp');

app.directive('news', require('./news'));
app.controller('newsController', require('./newsController'));
