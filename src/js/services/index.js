'use strict'

var app = require('angular').module('social');

app.factory('DataService', require('./DataService'));
app.factory('UserService', require('./UserService'));