(function () {

    var tomato = {};

    tomato.inherits = function (child, parent) {
        var __hasProp = {}.hasOwnProperty;

        for (var key in parent) {
            if (__hasProp.call(parent, key)) {
                child[key] = parent[key];
            }
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };

    define('tomato', function () {
        return tomato;
    });

}());