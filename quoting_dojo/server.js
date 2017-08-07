var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/quoting_dojo');

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var QuoteSchema = new mongoose.Schema({
    name: String, 
    quote: String, 
    created: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

app.get('/', function (req, res){
    res.render('index', {errors: false});
});

app.post('/quotes', function(req, res){
    var quote = new Quote({name: req.body.name, quote: req.body.quote });
    quote.save(function(err){
        if(err) {
            res.render('/', {errors: true, message: 'There was an error, try again'});
        } else {
            res.redirect('/quotes');
        }
    });
});

app.get('/quotes', function(req, res){
    Quote.find({}, function(err, quotes){
        if(err) {
            res.render('/', {errors: true, message: 'There was an error, try again'});
        } else {
            res.render('quotes', {quotes: quotes});
        }
    });
});

app.listen(8000, function(){});