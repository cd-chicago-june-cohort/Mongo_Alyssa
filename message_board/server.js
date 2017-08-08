var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/message_board');

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({ extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
    name: String,
    message: String,
    _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
});

var CommentSchema = new mongoose.Schema({
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
    name: String,
    text: String,
});

mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);

var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

app.get('/', function(req, res){
    Message.find({}).populate('_comments').exec(function(err, messages){
        if (err) {console.log(err);
            res.render('index', {error: true, error_message: err, messages: messages});
        } else {
            res.render('index', {error: false, messages: messages});
        }
    });
});

app.post('/post_message', function(req, res){
    var message = new Message({name: req.body.name, message: req.body.message});
    message.save(function(err){
        if(err){
            console.log(err);
            res.render('index', {error: true, error_message: err, messages: []});
        } else {
        res.redirect('/');
        }
    });
});

app.post('/post_comment/:message_id', function(req, res){
    Message.findOne({_id: req.params.message_id}, function(err, message){
        if(err) {
            res.render('index', {error: true, error_message: err, messages: []});
        } else {
            var comment = new Comment({name: req.body.name, text: req.body.comment});
            comment._message = message._id;
            comment.save(function(err){
                message.comments.push(comment);
                message.save(function(err){
                    if(err) {
                        res.render('index', {error: true, error_message: err, messages: []});
                    } else {
                        res.redirect('/');
                    }
                });
            });
        }
    });
});

app.listen(8000, function(){});