define([
    'tomato'
], function (tomato) {

    return tomato.Module.extend({

        init: function MyModule() {
            tomato.super(this, MyModule, arguments);
            console.log('Module created.');
        },

        hello: function () {
            console.log('Hello, world!');
            console.log(this);
        }

    });

});