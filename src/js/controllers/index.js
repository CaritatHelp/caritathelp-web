'use strict';

var app = require('angular').module('social');

app.controller('loginController', require('./loginController'));
app.controller('homeController', require('./homeController'));
app.controller('registerController', require('./registerController'));
app.controller('profilController', require('./profilController'));