'use strict';

var BPromise = require('bluebird');

var countButtons = require('../endpoints/count_buttons.js');


function Button(promise) {

    var self = this;

    self._promise = promise.spread(function (button, access) {

        self.button = button;
        self.access = access;
        self.request = self.access.request.bind(self.access);

        return self;

    });

    self.promise = function () {
        return self._promise;
    };

    self.error = function (errorHandler) {
        self.promise().catch(errorHandler);
        return self;
    };

}

Button.create = function (promise) {

    promise = promise.spread(function (dataset, access) {

        return countButtons.getSingle(dataset, access.request.bind(access))
            .then(function (button) {

                if (button === null) {
                    throw new Error('The button "' + dataset + '" does not exist.');
                }

                return [ button, access ];

            });

    });

    return new Button(promise);

};

Button.prototype.deferred = function (fn, fnErr) {
    return this.promise().then(fn, fnErr);
};

Button.prototype.hits = function (callback) {

    var self = this;

    self._promise = new BPromise(function (resolve, reject) {

        self.deferred(function () {

            countButtons.hits(self.button, self.request)
                .then(function (hits) {
                    callback(hits); // If callback throws an error it is caught here.
                })
                .then(function () {
                    resolve(self);
                })
                .catch(function (err) {
                    reject(err);
                });

        },
        function (err) {
            reject(err);
        });

    });

    return self;

};

Button.prototype.hit = function (quantity, location) {

    var self = this;

    self._promise = new BPromise(function (resolve, reject) {

        self.deferred(function () {

            countButtons.hit(quantity, location, self.button, self.request)
                .then(function () {
                    resolve(self);
                })
                .catch(function (err) {
                    reject(err);
                });

        },
        function (err) {
            reject(err);
        });

    });

    return self;

};

module.exports = Button;
