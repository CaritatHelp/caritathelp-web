'use strict';

var app = require('angular').module('social');

app.controller('LlginController', require('./loginController'));
app.controller('H=homeController', require('./homeController'));
app.controller('registerController', require('./registerController'));
app.controller('profilController', require('./profilController'));