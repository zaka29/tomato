define([
    'tomato',
    './Animal'
], function (tomato, Animal) {

    return HorseClass = Animal.extend(
        /**
         * @lends {zoo.Horse.prototype}
         */
        {
            /**
             * @class zoo.Horse
             * @constructor
             * @extends {zoo.Animal}
             */
            constructor: function Horse(name) {
                this.super(HorseClass, 'constructor', name);
                console.log('Constructor of Horse: ', name);
            },

            move: function (meters) {
                console.log(this.name, "Galloping...");
                return this.super(HorseClass, 'move', meters || 45);
            },

            neigh: function () {
                console.log(this.name, "Neigh...");
            }

        }
    );

});