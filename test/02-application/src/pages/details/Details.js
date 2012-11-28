define([
    'tomato',
    './DetailsView',
    './detailsModel'
], function (tomato, View, Model) {

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

            this.model = new Model();

            this.binding = new tomato.Binding(this.view, this.model);

            this.model.set('text', 'Hello');
            this.model.set('button', 'Hello');

        },
        save: function () {
            var model = this.binding.flush();
            model.set('button', model.get('text'));
        }
    });

});