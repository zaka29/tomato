(function () {

    var tomato = {};

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

    tomato.Module = function () {
        console.log('Creating...')
    };

    tomato.Module.prototype.start = function () {
        console.log('Starting...')
    };

    tomato.Module.prototype.stop = function () {
        console.log('Stopping...')
    };

    tomato.Module.extend = _extend;

    define('tomato', function () {
        return tomato;
    });

}());