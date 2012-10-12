define([
    'tomato',
    './Animal'
], function (tomato, Animal) {

    return tomato.Class.extend(Animal, {

        move: function () {
            console.log(this.name, "Galloping...");
            return this.parent(45);
        },

        neigh: function () {
            console.log(this.name, "Neigh...");
        }

    });

});