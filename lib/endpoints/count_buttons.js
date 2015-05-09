'use strict';

var _ = require('lodash');


function getAll(rp) {

    return rp('/api/rest/count_buttons/');

}

function getSingle(dataset, rp) {

    return getAll(rp)
        .then(function (buttons) {

            for ( var i = 0; i < buttons.length; i+=1 ) {

                if (buttons[i].dataset === dataset) {
                    return buttons[i];
                }

            }

            return null;

        });

}

function hit(quantity, location, button, rp) {

    var options = {
        uri: button.hit_endpoint,
        qs: {}
    };

    if (_.isNumber(quantity)) {
        options.qs.quantity = quantity;
    }

    if (_.isString(location)) {
        options.qs.location = location;
    }

    return rp(options);

}

function hits(button, rp) {

    return getSingle(button.dataset, rp)
        .then(function (button) {
            return button.hits;
        });

}

module.exports = {
    getAll: getAll,
    getSingle: getSingle,
    hit: hit,
    hits: hits
};
