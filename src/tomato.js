(function (global) {

    var tomato = {},
        $ = global.jQuery.noConflict(),
        Backbone = global.Backbone.noConflict(),
        _ = global._.noConflict();

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

    function inherits(child, parent) {
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
    }

    tomato.super = function (constructor, fn, args) {
        if (typeof fn === 'string') {
            constructor.__super__[fn].apply(this, args);
        } else {
            constructor.__super__['constructor'].apply(this, fn);
        }
    };

    function _extend(protoProps, staticProps) {
        var child;
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
            child = inherits(protoProps.constructor, this);
        } else {
            var parent = this;
            child = inherits(function () {
                parent.apply(this, arguments);
            }, this);
        }
        if (protoProps) {
            _.extend(child.prototype, protoProps);
        }
        if (staticProps) {
            _.extend(child, staticProps);
        }
        child.extend = this.extend;
        return child;
    }

    /**
     *
     * @constructor
     */
    tomato.Application = function (container) {
        console.log('Application: creating...');
        this.$container = $(container);
        this.router = new Backbone.Router();
        this.routes.forEach(function (route) {
            this.route(route);
        }, this);
    };

    tomato.Application.prototype.start = function () {
        console.log('Application: starting...');
        Backbone.history.start();
    };

    tomato.Application.prototype.stop = function () {
        console.log('Application: stopping...');
    };

    tomato.Application.prototype.route = function (route) {
        console.log('Application: registering route: ' + route.name);

        function Application_startPresenter(view, presenter, $container, args) {
            view.setPresenter(presenter);
            presenter.start.apply(presenter, _.union($container, args));
        }

        function Application_RouteOnChange() {
            var presenter = new route.Presenter(),
                proto = route.Presenter.prototype,
                args = _.toArray(arguments);
            if (!proto.view) {
                proto.view = new proto.View();
                proto.view.subscribe('viewReady', function () {
                    Application_startPresenter(proto.view, presenter, this.$container, args);
                }.bind(this));
                proto.view.render();
            } else {
                Application_startPresenter(proto.view, presenter, this.$container, args);
            }
        }

        this.router.route(route.pattern, route.name, Application_RouteOnChange.bind(this));
    };

    /**
     *
     * @constructor
     */
    tomato.Presenter = function () {
        console.log('Presenter: creating...');
    };

    tomato.Presenter.prototype.start = function () {
        console.log('Presenter: starting...')
    };

    tomato.Presenter.prototype.stop = function () {
        console.log('Presenter: stopping...')
    };

    /**
     *
     * @constructor
     */
    tomato.View = function () {
        console.log('View: creating...');
        this.eventBus = $({});
    };

    tomato.View.prototype.subscribe = function () {
        this.eventBus.on.apply(this.eventBus, arguments);
    };

    tomato.View.prototype.unsubscribe = function () {
        this.eventBus.off.apply(this.eventBus, arguments);
    };

    tomato.View.prototype.publish = function () {
        this.eventBus.trigger.apply(this.eventBus, arguments);
    };

    tomato.View.prototype.template = function () {
        return '<div></div>';
    };

    tomato.View.prototype.render = function () {
        var thisView = this;
        this.$el = $($.parseHTML(this.template()));
        this.loadCouner = 0;
        this.$el.find('[data-type]').each(function () {
            thisView.loadCouner++;
            var $placeholder = $(this);
            require([$placeholder.data('type')], function (Widget) {
                var widget = new Widget();
                thisView[$placeholder.data('name')] = widget;
                widget.subscribe('viewReady', function () {
                    $placeholder.replaceWith(widget.$el);
                    thisView.loadCouner--;
                    if (thisView.loadCouner == 0) {
                        thisView.publish('viewReady');
                    }
                });
                widget.render();
            });
        });
        if (this.loadCouner == 0) {
            this.publish('viewReady');
        }
    };

    tomato.View.prototype.setParent = function ($container) {
        $container.contents().detach();
        $container.append(this.$el);
    };

    tomato.View.prototype.setPresenter = function (presenter) {
        //noinspection JSUnusedGlobalSymbols
        this.presenter = presenter;
    };

    tomato.View.extend
        = tomato.Presenter.extend
        = tomato.Application.extend
        = _extend;

    define('tomato', function () {
        return tomato;
    });

}(window));