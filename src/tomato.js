(function () {

    var tomato = {};

    tomato.Class = {
        create: function (parent, props) {
            if (typeof parent !== 'function') {
                props = parent;
            } else {
                Ctor.prototype = parent.prototype;
                props['initialize'].prototype = new Ctor();
                props['initialize'].__super__ = parent.prototype;
            }

            for (var key in props) {
                if (props.hasOwnProperty(key)) {
                    props['initialize'].prototype[key] = props[key];
                }
            }

            function Ctor() {
                this.constructor = props['initialize'];
            }

            return props['initialize'];
        }
    };

    var inherits = tomato.inherits = function (child, parent) {
        for (var key in parent) {
            if (parent.hasOwnProperty(key)) {
                child[key] = parent[key];
            }
        }
        function Ctor() {
            this.constructor = child;
        }

        Ctor.prototype = parent.prototype;
        child.prototype = new Ctor();
        child.__super__ = parent.prototype;
        return child;
    };

    tomato.super = function (context, fn, args) {
        fn.__super__.constructor.apply(context, args);
    };

    function _extend(protoProps, staticProps) {
        var child = inherits(protoProps['init'] || new Function(), this);
        delete protoProps['init'];
        if (protoProps) {
            _.extend(child.prototype, protoProps);
        }
        if (staticProps) {
            _.extend(child, staticProps);
        }
        child.extend = this.extend;
        return child;
    }

    tomato.Application = function () {
        console.log('Creating...')
    };

    tomato.Application.prototype.start = function () {
        console.log('Starting...')
    };

    tomato.Application.prototype.stop = function () {
        console.log('Stopping...')
    };

    tomato.Application.extend = _extend;

    define('tomato', function () {
        return tomato;
    });

}());