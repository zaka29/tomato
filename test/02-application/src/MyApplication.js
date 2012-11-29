define([
    'tomato',
    './pages/routes'
], function (tomato, routes) {

    return tomato.Application.extend({

        routes: routes,

        constructor: function MyApplication(id) {
            this.super(MyApplication, 'constructor', id);
            console.log('Application created.');
        },

        hello: function () {
            console.log('Hello, world!');
        }

    });

});