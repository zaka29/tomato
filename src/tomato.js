(function () {

    var tomato = {};

    tomato.Class = {
        create: function (parent, props) {
            if (typeof parent !== 'function') {
                props = parent;
            } else {
                ctor.prototype = parent.prototype;
                props['initialize'].prototype = new ctor();
                props['initialize'].__super__ = parent.prototype;
            }

            var __hasProp = {}.hasOwnProperty;

            for (var key in props) {
                if (__hasProp.call(props, key)) {
                    props['initialize'].prototype[key] = props[key];
                }
            }

            function ctor() {
                this.constructor = props['initialize'];
            }

            return props['initialize'];
        }
    };

    define('tomato', function () {
        return tomato;
    });

}());