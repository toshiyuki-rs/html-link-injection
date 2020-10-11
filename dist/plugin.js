var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "html-webpack-plugin", "./option-validator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HtmlLinkInjection = void 0;
    var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
    var option_validator_1 = require("./option-validator");
    /**
     * link injection for html-webpack-plugin
     */
    var HtmlLinkInjection = /** @class */ (function () {
        /**
         * constructor
         */
        function HtmlLinkInjection(option) {
            if (option === void 0) { option = undefined; }
            if (option) {
                this.option = option_validator_1.OptionValidator.validate(option);
            }
        }
        Object.defineProperty(HtmlLinkInjection, "pluginName", {
            /**
             * plugin iname
             */
            get: function () {
                return 'html-link-injection';
            },
            enumerable: false,
            configurable: true
        });
        /**
         * called by webpack
         */
        HtmlLinkInjection.prototype.apply = function (compiler) {
            var beforeEmitHdlr = function (param, cb) {
            }.bind(this);
            var afterTemplateExecutionHdlr = function (param, cb) {
                this.injectLink(param, cb);
            }.bind(this);
            compiler.hooks.compilation.tap(HtmlLinkInjection.pluginName, function (compilation, compiationParam) {
                var hooks = html_webpack_plugin_1.default.getHooks(compilation);
                hooks.afterTemplateExecution.tapAsync(HtmlLinkInjection.pluginName, afterTemplateExecutionHdlr);
            });
        };
        /**
         * link item to string
         */
        HtmlLinkInjection.prototype.linkItemToString = function (link) {
            var href = "href=\"" + link.href + "\"";
            var crossorigin = '';
            if (link.crossorigin) {
                crossorigin = "crossorigin=\"" + link.crossorigin + "\"";
            }
            var hreflang = '';
            if (link.hreflang) {
                hreflang = "hreflang=\"" + link.hreflang + "\"";
            }
            var media = '';
            if (link.media) {
                media = "media=\"" + link.media + "\"";
            }
            var referencepolicy = '';
            if (link.referencepolicy) {
                referencepolicy = "media=\"" + link.referencepolicy + "\"";
            }
            var rel = '';
            if (link.rel) {
                rel = "rel=\"" + link.rel + "\"";
            }
            var sizes = '';
            if (link.sizes) {
                sizes = "sizes=\"" + link.sizes + "\"";
            }
            var title = '';
            if (link.title) {
                title = "title=\"" + link.title + "\"";
            }
            var type = '';
            if (link.type) {
                type = "type=\"" + link.type + "\"";
            }
            var result = "<link " + href + " " + crossorigin + " " + hreflang + " " + media;
            result += referencepolicy + " " + rel + " " + sizes + " " + title + " " + type + ">";
            return result;
        };
        /**
         * create tag object
         */
        HtmlLinkInjection.prototype.createTagObject = function (link) {
            var tagAttribute = link;
            return html_webpack_plugin_1.default.createHtmlTagObject('link', tagAttribute);
        };
        /**
         * create link tags
         */
        HtmlLinkInjection.prototype.createLinkTags = function () {
            var _this = this;
            var result = [];
            var links = [];
            var option = this.option;
            if (option) {
                if ('link' in option) {
                    if (!Array.isArray(option.link)) {
                        links.push(option.link);
                    }
                    else {
                        links.push.apply(links, option.link);
                    }
                }
            }
            links.forEach(function (elem) {
                result.push(_this.linkItemToString(elem));
            });
            return result;
        };
        HtmlLinkInjection.prototype.insertLinkTagObject = function (param) {
            var _this = this;
            var links = [];
            var option = this.option;
            if (option) {
                if ('link' in option) {
                    if (!Array.isArray(option.link)) {
                        links.push(option.link);
                    }
                    else {
                        links.push.apply(links, option.link);
                    }
                }
            }
            links.forEach(function (elem) {
                param.headTags.push(_this.createTagObject(elem));
            });
        };
        /**
         * inject link tag
         */
        HtmlLinkInjection.prototype.injectLink = function (param, cb) {
            this.insertLinkTagObject(param);
            cb(null, param);
        };
        return HtmlLinkInjection;
    }());
    exports.HtmlLinkInjection = HtmlLinkInjection;
});
// vi: se ts=2 sw=2 et:
//# sourceMappingURL=plugin.js.map