define([
    'tomato',
    'text!./DetailsView.html'
], function (tomato, template) {

    return tomato.View.extend({

        template: function () {
            return template;
        },

        getButton: function () {
            return this['button'];
        },

        init: function () {
            this.getButton().on('click', this.presenter.save.bind(this.presenter));
        }

    });

});