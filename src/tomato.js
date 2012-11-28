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

        // TODO use eventbus for route change handling
        function Application_RouteOnChange() {
            var presenter = new route.Presenter(),
                proto = route.Presenter.prototype,
                args = _.toArray(arguments);
            if (!proto.view) {
                proto.view = new proto.View();
                proto.view.on('ready', function () {
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
        this.bindable = [];
    };

    tomato.View.prototype.on = function () {
        this.eventBus.on.apply(this.eventBus, arguments);
    };

    //noinspection JSUnusedGlobalSymbols
    tomato.View.prototype.off = function () {
        this.eventBus.off.apply(this.eventBus, arguments);
    };

    tomato.View.prototype.trigger = function () {
        this.eventBus.trigger.apply(this.eventBus, arguments);
    };

    tomato.View.prototype.template = function () {
        return '<div></div>';
    };

    tomato.View.prototype._requireWidget = function ($placeholder) {
        this.loadCouner++;
        require([$placeholder.data('type')], function (Widget) {
            this._onloadWidget(Widget, $placeholder);
        }.bind(this));
    };

    tomato.View.prototype._onloadWidget = function (Widget, $placeholder) {
        var widget = new Widget();
        this[$placeholder.data('name')] = widget;

        var attribute = $placeholder.data('bind');
        if (attribute != null) {
            this.bindable.push({
                'attribute': attribute,
                'widget': widget
            });
        }

        widget.on('ready', function () {
            $placeholder.replaceWith(widget.$el);
            this.loadCouner--;
            this.viewReady();
        }.bind(this));

        widget.render();
    };

    tomato.View.prototype.viewReady = function () {
        if (this.loadCouner == 0) {
            this.trigger('ready');
            this.init();
        }
    };

    tomato.View.prototype.init = function () {

    };

    tomato.View.prototype.render = function () {
        this.$el = $($.parseHTML(this.template()));

        // Just copied from Backbone
        var events = this.events || {},
            delegateEventSplitter = /^(\S+)\s*(.*)$/;
        for (var key in events) {
            var method = events[key];
            if (!_.isFunction(method)) method = this[events[key]];
            if (!method) throw new Error('Method "' + events[key] + '" does not exist');
            var match = key.match(delegateEventSplitter);
            var eventName = match[1], selector = match[2];
            method = _.bind(method, this);
            eventName += '.delegateEvents' + this.cid;
            if (selector === '') {
                this.$el.bind(eventName, method);
            } else {
                this.$el.delegate(selector, eventName, method);
            }
        }


        this.loadCouner = 0;
        this.$el.find('[data-type]').each(function (i, el) {
            this._requireWidget($(el));
        }.bind(this));
        this.viewReady();
    };

    tomato.View.prototype.setParent = function ($container) {
        $container.contents().detach();
        $container.append(this.$el);
    };

    tomato.View.prototype.setPresenter = function (presenter) {
        //noinspection JSUnusedGlobalSymbols
        this.presenter = presenter;
    };

    tomato.Binding = function (view, model) {
        this.view = view;
        this.model = model;
        _.each(this.view.bindable, function (item) {
            this.model.on('change:' + item.attribute, function (model, value) {
                item.widget.setValue(value);
            });
        }, this)
    };

    tomato.Binding.prototype.flush = function () {
        _.each(this.view.bindable, function (item) {
            this.model.set(item.attribute, item.widget.getValue());
        }, this);
        return this.model;
    };

    tomato.Model = Backbone.Model;

    tomato.View.extend
        = tomato.Presenter.extend
        = tomato.Application.extend
        = _extend;

    define('tomato', function () {
        return tomato;
    });

}(window));