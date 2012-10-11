define([
    './Animal',
    './Snake',
    './Horse'
], function (Animal, Snake, Horse) {

    var sam, tom;

    sam = new Snake('Sammy the Python');
    tom = new Horse('Tommy the Palomino');

    sam.move();
    tom.move().neigh();

    console.log(tom instanceof Horse);
    console.log(tom instanceof Animal);
    console.log(tom instanceof Snake);

});
