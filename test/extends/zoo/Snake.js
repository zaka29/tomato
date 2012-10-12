/*global Animal */
define([
    'tomato',
    './Animal'
], function (tomato, Animal) {

    return tomato.Class.extend(Animal, {

        move: function () {
            console.log(this.name, "Slithering...");
            return this.parent(5);
        }

    });

});