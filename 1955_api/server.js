var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

require('./server/config/name.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000, function(){});