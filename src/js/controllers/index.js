'use strict';

var app = require('angular').module('caritathelp');

app.controller('homeController', require('./homeController'));
app.controller('directoryController', require('./directoryController'));
app.controller('profilController', require('./profilController'));
app.controller('associationController', require('./associationController'));
app.controller('searchController', require('./searchController'));
app.controller('eventController', require('./eventController'));
app.controller('inboxController', require('./inboxController'));
