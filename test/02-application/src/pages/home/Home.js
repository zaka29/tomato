define([
    'tomato',
    './HomeView'
], function (tomato, View) {

    return Home = tomato.Presenter.extend({
        View: View,
        start: function ($container) {
            this.super(Home, 'start', $container);
            console.log('Home: starting...');
            this.view.setParent($container);
        }
    });

});