define([
    'tomato'
], function (tomato) {

    return tomato.View.extend({

        template: function () {
            return '<div>Details</div><div><a href="#">Back</a></div>';
        }

    });

});