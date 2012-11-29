define([
    'tomato',
    './Animal'
], function (tomato, Animal) {

    return Animal.extend(
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
                this.super('constructor', name);
                console.log('Constructor of Horse: ', name);
            },

            move: function () {
                console.log(this.name, "Galloping...");
                return this.super('move', 45);
            },

            neigh: function () {
                console.log(this.name, "Neigh...");
            }

        }
    );

});