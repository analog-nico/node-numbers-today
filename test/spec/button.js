'use strict';

var numbersToday = require('../../lib/index.js');


describe('The Button entity', function () {

    it('should be created for the single "signups" button', function () {

        return numbersToday(process.env.CRED_TOKEN)
            .button('signups')
            .promise()
            .then(function (signupsButton) {

                expect(signupsButton.button.dataset).to.eql('signups');

            });

    });

    it('should reject for a not existing button', function () {

        return numbersToday(process.env.CRED_TOKEN)
            .button('does-not-exist')
            .promise()
            .then(function () {
                throw new Error('Expected rejection.');
            },
            function () {
                // Expected rejection
            });

    });

});
