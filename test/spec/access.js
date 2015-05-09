'use strict';

var numbersToday = require('../../lib/entities/access.js').create;//require('../../lib/index.js');


describe('The Access entity', function () {

    it('should reject too many parameters', function () {

        numbersToday(process.env.CRED_TOKEN, true, false)
            .promise()
            .then(function () {
                throw new Error('Expected rejection.');
            },
            function () {
                // Expected rejection
            });

    });

    it('can be initialized with the API token', function () {

        return numbersToday(process.env.CRED_TOKEN)
            .promise()
            .then(function (access) {

                expect(access.token).to.eql(process.env.CRED_TOKEN);

            });

    });

    it('can be initialized with username and password', function () {

        return numbersToday(process.env.CRED_USERNAME, process.env.CRED_PASSWORD)
            .promise()
            .then(function (access) {

                expect(access.token).to.eql(process.env.CRED_TOKEN);

            });

    });

});
