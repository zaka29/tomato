define([
    'tomato',
    './HomeView'
], function (tomato, View) {

    return tomato.Presenter.extend({
        name: 'Home',
        View: View,
        start: function ($container) {
            console.log('Home: starting...');
            this.view.setParent($container);
        }
    });

});