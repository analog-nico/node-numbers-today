'use strict';

var NTApi = require('../../lib/index.js');

describe('The count_buttons endpoint', function () {

    it('should return all buttons', function () {

        return NTApi.createWithToken(process.env.CRED_TOKEN)
            .then(function (ntApi) {

                return ntApi.getAllButtons()
                    .then(function (buttons) {

                        expect(buttons.length).to.eql(1);
                        expect(buttons[0].dataset).to.eql('signups');

                    });

            });

    });

    it('should return the single "signups" button', function () {

        return NTApi.createWithToken(process.env.CRED_TOKEN)
            .then(function (ntApi) {

                return ntApi.getButton('signups')
                    .then(function (button) {

                        expect(button.dataset).to.eql('signups');

                    });

            });

    });

    it('should return null for a not existing button', function () {

        return NTApi.createWithToken(process.env.CRED_TOKEN)
            .then(function (ntApi) {

                return ntApi.getButton('does-not-exist')
                    .then(function (button) {

                        expect(button).to.eql(null);

                    });

            });

    });

});
