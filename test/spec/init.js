'use strict';

var NTApi = require('../../lib/index.js');

describe('The NTApi constructor', function () {

    it('can be called directly', function () {

        var ntApi = new NTApi(process.env.CRED_TOKEN);

        expect(ntApi.token).to.eql(process.env.CRED_TOKEN);

    });

    it('can be called through createWithToken', function () {

        return NTApi.createWithToken(process.env.CRED_TOKEN)
            .then(function (ntApi) {

                expect(ntApi.token).to.eql(process.env.CRED_TOKEN);

            });

    });

});
