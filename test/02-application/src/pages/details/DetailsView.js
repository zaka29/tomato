define([
    'tomato'
], function (tomato) {

    return tomato.View.extend({

        template: function () {
            return '<div>' +
                '<div>Details</div>' +
                '<div><a href="#">Back</a></div>' +
                '<div data-name="widget" data-type="pages/details/DetailsWidget"></div>' +
                '</div>';
        },

        getWidget: function() {
            return this['widget'];
        }

    });

});