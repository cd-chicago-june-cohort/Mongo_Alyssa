var mongoose = require('mongoose');


var GiraffeSchema = new mongoose.Schema({
    name: String, 
    age: Number, 
    description: String
});

var Giraffe = mongoose.model('Giraffe', GiraffeSchema);
