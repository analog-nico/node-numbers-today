'use strict';

var BPromise = require('bluebird');
var rp = require('request-promise');
var _ = require('lodash');

var obtainApiToken = require('./../endpoints/obtain_api_token.js');
var Button = require('./button.js');


function Access(promise) {

    var self = this;

    promise = promise.then(function (token) {

        self.token = token;

        self.rp = rp.defaults({
            baseUrl: 'https://numbers.today/',
            headers: {
                'Authorization': 'Token ' + token
            },
            json: true
        });

        return self;

    });

    self.promise = function () {
        return promise;
    };

}

Access.create = function (usernameOrToken, password) {

    var promise;

    if (arguments.length === 1) {

        promise = new BPromise.resolve(usernameOrToken);

    } else if (arguments.length === 2) {

        promise = obtainApiToken(usernameOrToken, password)
            .then(function (response) {
                return response.token;
            });

    } else {
        promise = BPromise.reject(new Error('Initialize the API access with either username and password or the API token.'));
    }

    return new Access(promise);

};

Access.prototype.deferred = function (fn) {
    return this.promise().then(fn);
};

Access.prototype.request = function (options) {

    var self = this;

    return self.deferred(function () {
        return self.rp(options);
    });

};

Access.prototype.button = function () {

    var args = _.flatten([ arguments, this ]);

    return Button.create(this.deferred(function () {
        return args;
    }));

};

module.exports = Access;
