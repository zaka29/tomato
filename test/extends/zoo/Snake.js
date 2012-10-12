/*global Animal */
define([
    'tomato',
    './Animal'
], function (tomato, Animal) {

    tomato.inherits(Snake, Animal);

    /**
     *
     * @constructor
     * @extends {Animal}
     */
    function Snake() {
        Snake.__super__.constructor.apply(this, arguments);
    }

    /**
     *
     * @return {Snake}
     */
    Snake.prototype.move = function () {
        console.log(this.name, "Slithering...");
        return Snake.__super__.move.call(this, 5);
    };

    return Snake;

});