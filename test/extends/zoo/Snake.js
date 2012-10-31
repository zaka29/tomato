define([
    'tomato',
    './Animal'
], function (tomato, Animal) {

    var Snake = tomato.Class.create(Animal,
        /**
         * @lends {Snake.prototype}
         */
        {
            /**
             * @class Snake
             * @constructor
             * @extends {Animal}
             */
            initialize: function Snake() {
                this.constructor.__super__.constructor.apply(this, arguments);
            },

            move: function () {
                console.log(this.name, "Slithering...");
                return this.constructor.__super__.move.call(this, 5);
            }

        }
    );

    return Snake;

});