define([
    'tomato',
    './DetailsView',
    './detailsModel'
], function (tomato, View, Model) {

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