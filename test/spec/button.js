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

    it('can hit the button and get the current hits', function () {

        this.timeout(5000);

        var hitsBefore;

        return numbersToday(process.env.CRED_TOKEN)
            .button('signups')
            .hits(function (hits) {
                hitsBefore = hits;
            })
            .hit()
            .hits(function (hits) {
                expect(hits).to.eql(hitsBefore+1);
            })
            .promise();

    });

});
