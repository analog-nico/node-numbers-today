'use strict';

var NTApi = require('../../lib/index.js');

describe('The obtain_api_token endpoint', function () {

    it('should return the token', function () {

        return NTApi.createWithCredentials(process.env.CRED_USERNAME, process.env.CRED_PASSWORD)
            .then(function (ntApi) {

                expect(ntApi.token).to.eql(process.env.CRED_TOKEN);

            });

    });

});
