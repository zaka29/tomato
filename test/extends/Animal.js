define(function () {

    /**
     *
     * @param name
     * @constructor
     */
    function Animal(name) {
        this.name = name;
    }

    /**
     *
     * @param meters
     * @return {Animal}
     */
    Animal.prototype.move = function (meters) {
        console.log(this.name + (" moved " + meters + "m."));
        return this;
    };

    return Animal;

});