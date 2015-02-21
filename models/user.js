/*global require, module*/
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        login        : String,
        email        : String,
        password     : String
    },
	lastLogin        : Date
	/*,
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    
    creationDate     : Date*/
    
});

// methods ======================
// generating a hash
//userSchema.methods.generateHash = function (password) {
//    'use strict';
//    
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};

userSchema.methods.toJSON = function () {
	'use strict';
	
	var user = this.toObject();
	delete user.password;
	
	return user;
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    'use strict';
    return password === this.local.password;
    //return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);