define([
    'tomato',
    './DetailsView'
], function (tomato, View) {

    return tomato.Presenter.extend({
        View: View,
        constructor: function () {
            this.super('constructor');
            console.log('Details presenter created.');
        },
        start: function ($container) {
            this.super('start', $container);
            console.log('Details: starting...');
            this.view.setParent($container);
        }
    });

});