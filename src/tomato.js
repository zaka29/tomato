(function (global) {

    var tomato = {},
        $ = global.jQuery.noConflict(),
        Backbone = global.Backbone.noConflict(),
        _ = global._.noConflict();

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

            function Application_startPresenter(view, presenter, $container, args) {
                view.setPresenter(presenter);
                presenter.start.apply(presenter, _.union($container, args));
            }

            // TODO use eventbus for route change handling
            function Application_routeOnChange() {
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
            this.eventBus = $({});
            this.bindable = [];
        },

        on: function () {
            this.eventBus.on.apply(this.eventBus, arguments);
        },
        off: function () {
            this.eventBus.off.apply(this.eventBus, arguments);
        },
        trigger: function () {
            this.eventBus.trigger.apply(this.eventBus, arguments);
        },

        template: function () {
            return '<div></div>';
        },

        _requireWidget: function ($placeholder) {
            this.loadCouner++;
            require([$placeholder.data('type')], function (Widget) {
                this._onloadWidget(Widget, $placeholder);
            }.bind(this));
        },
        _onloadWidget: function (Widget, $placeholder) {
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
                this._viewReady();
            }.bind(this));

            widget.render();
        },

        _viewReady: function () {
            if (this.loadCouner == 0) {
                this.trigger('ready');
                this.init();
            }
        },

        init: function () {
        },

        render: function () {
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
            this._viewReady();
        },

        setParent: function ($container) {
            $container.contents().detach();
            $container.append(this.$el);
        },

        setPresenter: function (presenter) {
            this.presenter = presenter;
        }
    });


    tomato.Binding = tomato.Class.create({
        constructor: function (view, model) {
            this.view = view;
            this.model = model;
            _.each(this.view.bindable, function (item) {
                this.model.on('change:' + item.attribute, function (model, value) {
                    item.widget.setValue(value);
                });
            }, this)
        },
        flush: function () {
            _.each(this.view.bindable, function (item) {
                this.model.set(item.attribute, item.widget.getValue());
            }, this);
            return this.model;
        }
    });

    tomato.Model = Backbone.Model;

    define('tomato', function () {
        return tomato;
    });

}(window));
