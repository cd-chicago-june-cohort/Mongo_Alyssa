var users = require('../controllers/users.js');


module.exports = function(app) {
    app.get('/', function (req, res){
        res.render('index', {errors: req.session.errors});
    });

    app.post('/register', function (req, res){
        users.create(req, res);
    });

    app.post('/authenticate', function(req, res){
        users.login(req, res);
    });

    app.get('/success', function(req, res){
        res.render('success', {user: req.session.user, message: req.session.message});
    });
};