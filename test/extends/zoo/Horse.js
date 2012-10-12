define([
    'tomato',
    './Animal'
], function (tomato, Animal) {

    return tomato.Class.create(Animal, {

        initialize: function Horse() {
            this.constructor.__super__.constructor.apply(this, arguments);
        },

        move: function () {
            console.log(this.name, "Galloping...");
            return this.constructor.__super__.move.call(this, 45);
        },

        neigh: function () {
            console.log(this.name, "Neigh...");
        }

    });

});