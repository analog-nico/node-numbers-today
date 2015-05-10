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

    it('should catch an error in the hits callback', function () {

        this.timeout(5000);

        var hitsBefore;

        return numbersToday(process.env.CRED_TOKEN)
            .button('signups')
            .hits(function (hits) {
                throw new Error();
            })
            .promise()
            .then(function () {
                throw new Error('Expected rejection.');
            },
            function () {
                // Expected rejection
            });

    });

    it('should skip if access failed', function () {

        this.timeout(5000);

        return numbersToday(process.env.CRED_USERNAME, 'invalid password')
            .button('signups')
            .hits(function (hits) {
                throw Error('###');
            })
            .promise()
            .then(function () {
                throw new Error('###');
            },
            function (err) {
                if (err.message === '###') {
                    throw err;
                }
                // Else: Expected rejection
            });

    });

    it('should skip if button lookup failed', function () {

        this.timeout(5000);

        return numbersToday('invalid token')
            .button('signups')
            .hits(function (hits) {
                throw Error('###');
            })
            .promise()
            .then(function () {
                throw new Error('###');
            },
            function (err) {
                if (err.message === '###') {
                    throw err;
                }
                // Else: Expected rejection
            });

    });

    it('should skip "hit" if first operation failed', function () {

        this.timeout(5000);

        var hitsBefore;

        return numbersToday(process.env.CRED_TOKEN)
            .button('signups')
            .hits(function (hits) {
                hitsBefore = hits;
                throw Error('###');
            })
            .hit()
            .promise()
            .catch(function (err) {

                if (err.message !== '###') {
                    throw err;
                }
                // Else: Expected rejection

            })
            .then(function () {

                return numbersToday(process.env.CRED_TOKEN)
                    .button('signups')
                    .hits(function (hits) {

                        expect(hits).to.eql(hitsBefore);

                    })
                    .promise();

            });

    });

    it('should skip "hits" if first operation failed', function () {

        this.timeout(5000);

        return numbersToday(process.env.CRED_TOKEN)
            .button('signups')
            .hits(function (hits) {
                throw Error('###');
            })
            .hits(function (hits) {
                throw new Error('!!!');
            })
            .promise()
            .catch(function (err) {
                if (err.message !== '###') {
                    throw err;
                }
                // Else: Expected rejection
            });

    });

});
