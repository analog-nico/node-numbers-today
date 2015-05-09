'use strict';

var countButtons = require('../endpoints/count_buttons.js');


function Button(promise) {

    var self = this;

    promise = promise.spread(function (button, access) {

        self.button = button;
        self.access = access;

        return self;

    });

    self.promise = function () {
        return promise;
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

Button.prototype.deferred = function (fn) {
    return this.promise().then(fn);
};

Button.prototype.hit = function (quantity, location) {

    var self = this;

    return self.deferred(function () {
        console.log('Hit!');
    });

};

module.exports = Button;
