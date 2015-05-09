'use strict';

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

module.exports = {
    getAll: getAll,
    getSingle: getSingle
};
