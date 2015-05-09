'use strict';

var BPromise = require('bluebird');
var rp = require('request-promise');

var obtainApiToken = require('./endpoints/obtain_api_token.js');
var countButtons = require('./endpoints/count_buttons.js');


function NTApi(token) {

    this.token = token;

    this.rp = rp.defaults({
        baseUrl: 'https://numbers.today/',
        headers: {
            'Authorization': 'Token ' + token
        },
        json: true
    });

}

NTApi.createWithCredentials = function (username, password) {

    return obtainApiToken(username, password)
        .then(function (response) {
            return new NTApi(response.token);
        });

};

NTApi.createWithToken = function (token) {

    return new BPromise(function (resolve) {
        resolve(new NTApi(token));
    });

};

NTApi.prototype.getAllButtons = function () {
    return countButtons.getAll(this.rp);
};

NTApi.prototype.getButton = function (dataset) {
    return countButtons.getSingle(this.rp, dataset);
};


module.exports = NTApi;
