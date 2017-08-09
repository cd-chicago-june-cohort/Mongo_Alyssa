var giraffes = require('../controllers/giraffes.js');

module.exports = function(app) {
    app.get('/', function (req, res){
        giraffes.show_all(req, res);
    });

    app.get('/giraffes/new', function(req, res){
        res.render('create_giraffe');
    });

    app.post('/giraffes', function(req, res){
        giraffes.create(req, res);
    });

    app.get('/giraffes/:id', function(req, res){
        giraffes.show_one(req, res);
    });

    app.get('/giraffes/edit/:id', function(req, res){
        giraffes.update_display(req, res);
    });

    app.post('/giraffes/:id', function(req, res){
        giraffes.update_process(req, res);
    });

    app.get('/giraffes/destroy/:id', function(req, res){
        giraffes.destroy(req, res);
    });
}