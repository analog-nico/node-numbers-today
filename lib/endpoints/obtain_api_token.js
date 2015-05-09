'use strict';

var rp = require('request-promise');


module.exports = function (username, password) {

    var options = {
        uri: 'https://numbers.today/api/rest/obtain_api_token/',
        method: 'POST',
        json: true,
        body: {
            username: username,
            password: password
        }
    };

    return rp(options);

};
