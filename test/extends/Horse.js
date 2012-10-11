/*global Animal */
define([
    'tomato',
    './Animal'
], function (tomato, Animal) {

    tomato.inherits(Horse, Animal);

    /**
     *
     * @constructor
     * @extends {Animal}
     */
    function Horse() {
        Horse.__super__.constructor.apply(this, arguments);
    }

    /**
     *
     * @return {Horse}
     */
    Horse.prototype.move = function () {
        console.log(this, "Galloping...");
        return Horse.__super__.move.call(this, 45);
    };

    Horse.prototype.neigh = function () {
        console.log(this, "Neigh...");
    };

    return Horse;

});