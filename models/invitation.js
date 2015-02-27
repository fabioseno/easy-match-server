/*global require, module, Schema*/
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our invitation model
var invitationSchema = mongoose.Schema({

	sender     : {
        type: mongoose.Schema.ObjectId,
        ref : 'User'
    },

    recipient  : {
        type: mongoose.Schema.ObjectId,
        ref : 'User'
    },

    suggestions: [{
        where   : String,
        when    : Date
    }],

    accepted        : Boolean,
    resolutionDate  : Date,
	creationDate    : { type: Date, default: Date.now }
});

invitationSchema.methods.reply = function (suggestion, callback) {
    'use strict';
    this.suggestions.push(suggestion);
    this.save(function (err) {
        if (err) {
            Console.log('Error replying to invitation: %s', err);
            return callback(err);
        }
    });
    return callback(null);
};

invitationSchema.methods.accept = function (callback) {
    'use strict';
    this.accepted = true;
    this.save(function (err) {
        if (err) {
            Console.log('Error accepting invitation: %s', err);
            return callback(err);
        }
    });
    return callback(null);
};

invitationSchema.methods.reject = function (callback) {
    'use strict';
    this.accepted = true;
    this.save(function (err) {
        if (err) {
            Console.log('Error accepting invitation: %s', err);
            return callback(err);
        }
    });
    return callback(null);
};


// create the model for invitations and expose it to our app
module.exports = mongoose.model('Invitation', invitationSchema);