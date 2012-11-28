define([
    'tomato'
], function (tomato) {

    return tomato.View.extend({

        events: {
            'click button': function () {
                this.trigger('click');
            }
        },

        template: function () {
            return '<div><button>Save</button></div>';
        },

        getValue: function () {
            return this.$el.find('button').text();
        },

        setValue: function (value) {
            this.$el.find('button').text(value);
        }

    });

});