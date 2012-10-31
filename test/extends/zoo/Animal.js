define([
    'tomato'
], function (tomato) {

    var Animal = tomato.Class.create(
        /**
         * @lends Animal.prototype
         */
        {
            /**
             * @class Animal
             * @param name
             * @constructor
             */
            initialize: function Animal(name) {
                this.name = name;
            },

            move: function (meters) {
                console.log(this.name + (" moved " + meters + "m."));
                return this;
            }

        }
    );

    return Animal;

});