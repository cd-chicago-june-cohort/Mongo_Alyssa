var mongoose = require('mongoose');
var bcrypt = require('bcrypt'); 

var UserSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: [true, 'First name is required'], 
        minlength: [4, 'First name must be at least 4 characters']
    }, 
    last_name: { 
        type: String, 
        required: [true, 'Last name is required'], 
        minlength: [4, 'Last name must be at least 4 characters']
    }, 
    email: {
        type: String, 
        required: [true, 'Email is required'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is not a valid format'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Password must be at least 4 characters'],
    },
    birthday: {
        type: Date, 
        required: [true, 'Birthday is required'],
        max: [Date.now, 'Birthday must be in the past']
    }
}, {timestamps: true });

UserSchema.pre('save', function(next){
    var self = this;
    mongoose.models["User"].findOne({email : self.email},function(err, results) {
        if(err) {
            next(err);
        } else if(results) { //there was a result found, so the email address exists
            self.invalidate("email","email must be unique");
            next(new Error("email must be unique"));
        } else {
            this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)),
            next();
        }
    });
});

var User = mongoose.model('User', UserSchema);
