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

    var MyHorse = Horse.extend({
        move: function() {
            return this.super(MyHorse, 'move', 100);
        }
    });

    var myHorse = new MyHorse("MyHorse");
    myHorse.move();

    console.groupEnd();
    console.groupCollapsed('Type check');

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
