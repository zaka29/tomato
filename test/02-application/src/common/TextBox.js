define([
    'tomato'
], function (tomato) {

    return tomato.View.extend({

        template: function () {
            return '<div><input type="text" /></div>';
        },

        getValue: function () {
            return this.$el.find('input').val();
        },

        setValue: function (value) {
            this.$el.find('input').val(value);
        }

    });

});