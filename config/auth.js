/*global module*/
// expose our config directly to our application using module.exports
module.exports = {

    facebookAuth : {
        clientID      : '351620255010781', // your App ID
        clientSecret  : '6ef6b2ec059ca614bb12fc34a484f305', // your App Secret
        callbackURL   : 'http://localhost:8080/auth/facebook/callback'
    }

};