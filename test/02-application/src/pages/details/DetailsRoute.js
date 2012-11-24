define([
    './Details'
], function (Details) {

    return {
        name: 'Details',
        pattern: 'details/:id',
        Presenter: Details
    };

});