define([
    'tomato',
    './pages/routes'
], function (tomato, routes) {

    return tomato.Application.extend({

        routes: routes,

        constructor: function MyApplication() {
            tomato.super.call(this, MyApplication, arguments);
            console.log('Application created.');
        },

        hello: function () {
            console.log('Hello, world!');
        }

    });

});