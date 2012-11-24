define([
    'tomato',
    './Animal'
], function (tomato, Animal) {

    return tomato.Class.create(Animal,
        /**
         * @lends {zoo.Snake.prototype}
         */
        {
            /**
             * @class zoo.Snake
             * @constructor
             * @extends {zoo.Animal}
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

});