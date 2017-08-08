var mongoose = require('mongoose');
var Giraffe = mongoose.model('Giraffe');

module.exports = {
    show_all: function(req, res){
        Giraffe.find({}, function(err, giraffes){
            if(err) {
                console.log(err);
                res.render('/');
            } else {
                res.render('index', {giraffes: giraffes});
            }
        });
    },
    create: function(req, res){
        var giraffe = new Giraffe({name: req.body.name, age: req.body.age, description: req.body.description});
        giraffe.save(function(err){
            if(err){
                console.log(err);
            } 
            res.redirect('/');
        });
    },
    show_one: function(req, res){
        Giraffe.find({_id: req.params.id}, function(err, giraffe){
            if(err) {
                console.log(err);
                res.render('/');
            } else {
                res.render('read_giraffe', {giraffe: giraffe});
            }
        });
    },
    update_display: function(req, res){
        Giraffe.find({_id: req.params.id}, function(err, giraffe){
            if(err) {
                console.log(err);
                res.render('/');
            } else {
                res.render('update_giraffe', {giraffe: giraffe});
            }
        });
    },
    update_process: function(req, res){
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
    },
    destroy: function(req, res){
        Giraffe.find({_id: req.params.id}).remove(function(err){
            if(err) {
                console.log(err);
                res.render('/');
            } else {
                res.redirect('/');
            }
        });
    }
};