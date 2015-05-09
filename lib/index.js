'use strict';

var Access = require('./entities/access.js');

function numbersToday() {
    return Access.create.apply(undefined, arguments);
}

module.exports = numbersToday;
