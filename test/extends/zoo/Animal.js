define([
    'tomato'
], function (tomato) {

    return tomato.Class.extend({

        initialize: function (name) {
            this.name = name;
        },

        move: function (meters) {
            console.log(this.name + (" moved " + meters + "m."));
            return this;
        }

    });

});