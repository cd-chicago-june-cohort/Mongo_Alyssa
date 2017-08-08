var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

app.use(express.static(path.join(__dirname, './client/static')));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/giraffe.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000, function(){});