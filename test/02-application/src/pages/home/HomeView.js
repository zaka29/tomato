define([
    'tomato'
], function (tomato) {

    return tomato.View.extend({

        template: function () {
            return '<!--suppress HtmlUnknownTarget --><div>Home</div><div><a href="#details/1">Details</a></div>';
        }

    });

});