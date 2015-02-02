/*global module*/
module.exports = function () {
    'use strict';

    
};

module.exports.login = function (req, res) {
    'use strict';
    
    res.json(req.user);
};

module.exports.signup = function (req, res) {
    'use strict';
};

module.exports.logout = function (req, res) {
    'use strict';
    
    req.logout();
    res.end();
};