(function () {

    var tomato = {},
        $ = window.jQuery.noConflict(),
        Backbone = window.Backbone.noConflict();

    function extend(protoProps, staticProps) {
        protoProps || (protoProps = {});
        var child = protoProps.hasOwnProperty('constructor') ? protoProps.constructor : function Constructor() {
            return Constructor.__super__.constructor.apply(this, arguments);
        };

        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                child[key] = this[key];
            }
        }

        function Parent() {
            this.constructor = child;
        }

        Parent.prototype = this.prototype;
        child.prototype = new Parent();
        child.__super__ = this.prototype;

        _.extend(child.prototype, protoProps);

        if (staticProps) {
            _.extend(child, staticProps);
        }

        return child;
    }

    tomato.Class = function () {
    };

    tomato.Class.prototype.super = function (Class, fn) {
        return Class.__super__[fn].apply(this, _.toArray(arguments).slice(2));
    };

    tomato.Class.create = tomato.Class.extend = extend;

    tomato.Application = tomato.Class.create({
        constructor: function (container) {
            console.log('Application: creating...');
            this.$container = $(container);
            this.router = new Backbone.Router();
            this.routes.forEach(function (route) {
                this._route(route);
            }, this);
        },
        start: function () {
            console.log('Application: starting...');
            Backbone.history.start();
        },
        stop: function () {
            console.log('Application: stopping...');
            Backbone.history.stop();
        },
        _route: function (route) {
            console.log('Application: registering route: ' + route.name);

            function Application_routeOnChange() {
                var presenter = new route.Presenter(),
                    proto = route.Presenter.prototype;
                if (!proto.view) {
                    proto.view = new proto.View();
                }
                proto.view.setPresenter(presenter);
                presenter.start(this.$container);
            }

            this.router.route(route.pattern, route.name, Application_routeOnChange.bind(this));
        }
    });


    tomato.Presenter = tomato.Class.create({
        constructor: function () {
            console.log('Presenter: creating...');
        },
        start: function () {
            console.log('Presenter: starting...')
        },
        stop: function () {
            console.log('Presenter: stopping...')
        }
    });


    tomato.View = tomato.Class.create({
        constructor: function () {
            console.log('View: creating...');
            this.init();
        },
        template: function () {
            return '<div></div>';
        },
        init: function () {
            this.$el = $.parseHTML(this.template());
        },
        setParent: function ($container) {
            $container.contents().detach();
            $container.append(this.$el);
        },
        setPresenter: function (presenter) {
            //noinspection JSUnusedGlobalSymbols
            this.presenter = presenter;
        }
    });

    define('tomato', function () {
        return tomato;
    });

}());