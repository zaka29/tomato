define([
    'tomato'
], function (tomato) {

    return tomato.Class.create(
        /**
         * @lends zoo.Animal.prototype
         */
        {
            /**
             * @class zoo.Animal
             * @param name
             * @constructor
             */
            constructor: function (name) {
                console.log('Constructor of Animal: ', name);
                this.name = name;
            },

            move: function (meters) {
                console.log(this.name + (" moved " + meters + "m."));
                return this;
            }

        }
    );

});