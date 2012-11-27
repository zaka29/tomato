define([
    'tomato',
    './DetailsView'
], function (tomato, View) {

    function Details() {
        tomato.super.call(this, Details, arguments);
        console.log('Details presenter created.');
    }

    return tomato.Presenter.extend({
        name: 'Details',
        View: View,
        constructor: Details,
        start: function ($container, id) {
            tomato.super.call(this, Details, 'start', arguments);
            console.log('Details: starting...');
            this.view.setParent($container);
            this.view.getWidget().setValue('hello ' + id);
        }
    });

});