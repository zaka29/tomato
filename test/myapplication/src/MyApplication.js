define([
    'tomato'
], function (tomato) {

    return tomato.Application.extend({

        init: function MyApplication() {
            tomato.super(this, MyApplication, arguments);
            console.log('Application created.');
        },

        hello: function () {
            console.log('Hello, world!');
            console.log(this);
        }

    });

});