define([
    './zoo/Animal',
    './zoo/Snake',
    './zoo/Horse'
], function (Animal, Snake, Horse) {

    console.time('app');
    console.groupCollapsed('Initialization');

    var sam, tom;

    sam = new Snake('Sammy the Python');
    tom = new Horse('Tommy the Palomino');

    sam.move();
    tom.move().neigh();

    console.groupEnd();
    console.group('Type check');

    console.log('tom is Horse:', tom instanceof Horse);
    console.log('tom is Animal:', tom instanceof Animal);
    console.log('tom is Snake:', tom instanceof Snake);

    console.groupEnd();
    console.group('Objects');

    console.log({
        sam: sam,
        tom: tom
    });

    console.groupEnd();
    console.timeEnd('app');

});
