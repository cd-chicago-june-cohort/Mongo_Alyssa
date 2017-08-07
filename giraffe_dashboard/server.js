var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/giraffe_dashboard');

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var GiraffeSchema = new mongoose.Schema({
    name: String, 
    age: Number, 
    description: String
});
mongoose.model('Giraffe', GiraffeSchema);
var Giraffe = mongoose.model('Giraffe');

app.get('/', function (req, res){
    Giraffe.find({}, function(err, giraffes){
        if(err) {
            console.log(err);
            res.render('/');
        } else {
            res.render('index', {giraffes: giraffes});
        }
    });
});

app.get('/giraffes/new', function(req, res){
    res.render('create_giraffe');
});

app.post('/giraffes', function(req, res){
    var giraffe = new Giraffe({name: req.body.name, age: req.body.age, description: req.body.description});
    giraffe.save(function(err){
        if(err){
            console.log(err);
        } 
        res.redirect('/');
    });
});

app.get('/giraffes/:id', function(req, res){
    Giraffe.find({_id: req.params.id}, function(err, giraffe){
        if(err) {
            console.log(err);
            res.render('/');
        } else {
            res.render('read_giraffe', {giraffe: giraffe});
        }
    });
});

app.get('/giraffes/edit/:id', function(req, res){
    Giraffe.find({_id: req.params.id}, function(err, giraffe){
        if(err) {
            console.log(err);
            res.render('/');
        } else {
            res.render('update_giraffe', {giraffe: giraffe});
        }
    });
});

app.post('/giraffes/:id', function(req, res){
    Giraffe.findOne({_id: req.params.id}, function(err, giraffe){
        if(err) {
            console.log(err);
            res.render('/');
        } else {
            giraffe.name = req.body.name;
            giraffe.age = req.body.age;
            giraffe.description = req.body.description;
            giraffe.save();
            res.redirect('/');
        }
    });
});

app.get('/giraffes/destroy/:id', function(req, res){
    Giraffe.find({_id: req.params.id}).remove(function(err){
        if(err) {
            console.log(err);
            res.render('/');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(8000, function(){});