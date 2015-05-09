'use strict';

var path = require('path');
var fs = require('fs');

if (fs.existsSync(path.join(__dirname, '../../credentials.json'))) {

    var credentials = require('../../credentials.json');

    if (!process.env.CRED_USERNAME) {
        process.env.CRED_USERNAME = credentials.username;
    }

    if (!process.env.CRED_PASSWORD) {
        process.env.CRED_PASSWORD = credentials.password;
    }

    if (!process.env.CRED_TOKEN) {
        process.env.CRED_TOKEN = credentials.token;
    }

}
