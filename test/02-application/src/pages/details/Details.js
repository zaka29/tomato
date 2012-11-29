define([
    'tomato',
    './DetailsView'
], function (tomato, View) {

    return Details = tomato.Presenter.extend({
        View: View,
        constructor: function () {
            this.super(Details, 'constructor');
            console.log('Details presenter created.');
        },
        start: function ($container) {
            this.super(Details, 'start', $container);
            console.log('Details: starting...');
            this.view.setParent($container);
        }
    });

});