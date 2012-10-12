define([
    'tomato'
], function (tomato) {

    return tomato.Class.create({

        initialize: function Animal(name) {
            this.name = name;
        },

        move: function (meters) {
            console.log(this.name + (" moved " + meters + "m."));
            return this;
        }

    });

});