define([
    'tomato'
], function (tomato) {

    return tomato.View.extend({

        template: function () {
            return '<div>Home</div><div><a href="#details/1">Details</a></div>';
        }

    });

});