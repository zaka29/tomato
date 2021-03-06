define([
    'tomato',
    './Animal'
], function (tomato, Animal) {

    return SnakeClass = Animal.extend(
        /**
         * @lends {zoo.Snake.prototype}
         */
        {
            /**
             * @class zoo.Snake
             * @constructor
             * @extends {zoo.Animal}
             */
            constructor: function Snake(name) {
                this.super(SnakeClass, 'constructor', name);
                console.log('Constructor of Snake: ', name);
            },

            move: function () {
                console.log(this.name, "Slithering...");
                return this.super(SnakeClass, 'move', 5);
            }

        }
    );

});