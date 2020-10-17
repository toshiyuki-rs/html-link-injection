var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "html-webpack-plugin", "./option-validator", "./option"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HtmlLinkInjection = void 0;
    const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
    const option_validator_1 = require("./option-validator");
    const option_1 = require("./option");
    /**
     * link injection for html-webpack-plugin
     */
    class HtmlLinkInjection {
        /**
         * constructor
         */
        constructor(option = undefined) {
            if (option) {
                this.option = option_validator_1.OptionValidator.validate(option);
            }
        }
        /**
         * plugin iname
         */
        static get pluginName() {
            return 'html-link-injection';
        }
        /**
         * get html-webpack-plugin's processed options.
         */
        static getHtmlWebpackPluginOptions(htmlPlugin) {
            return htmlPlugin.options;
        }
        /**
         * filter entry name with  html-webpack-plugin's filter.
         */
        static filterEntriesByHtmlWebpackPlugin(htmlPlugin, options, entryNames) {
            return htmlPlugin.filterChunks(entryNames, options.chunks, options.excludeChunks);
        }
        /**
         * sort entry names with html-webpack-plugin's sort.
         */
        static sortEntriesByHtmlWebpackPlugin(htmlPlugin, options, compilation, entryNames) {
            return htmlPlugin.sortEntryChunks(entryNames, options.chunksSortMode, compilation);
        }
        /**
         * entry names by html-webpack-plugin
         */
        static getEntryNamesByHtmlWebpackPlugin(compilation, htmlPlugin) {
            const entryNames = Array.from(compilation.entrypoints.keys());
            const options = HtmlLinkInjection.getHtmlWebpackPluginOptions(htmlPlugin);
            let filteredEntryNames;
            filteredEntryNames = HtmlLinkInjection.filterEntriesByHtmlWebpackPlugin(htmlPlugin, options, entryNames);
            let result;
            result = HtmlLinkInjection.sortEntriesByHtmlWebpackPlugin(htmlPlugin, options, compilation, filteredEntryNames);
            return result;
        }
        /**
         * create link item from entry name link item
         */
        static createProcessedLinkItemFromEntryNameLinkItem(href, entryNameLinkItem) {
            const result = {
                href
            };
            for (let key in entryNameLinkItem) {
                if (typeof entryNameLinkItem[key] === 'string') {
                    result[key] = entryNameLinkItem[key];
                }
            }
            return result;
        }
        /**
         * create location - index mapping
         */
        static createLocationIndexMapping(tags, locations) {
            const result = {
                head: {},
                body: {}
            };
            if (!locations) {
                locations = [
                    option_1.InjectionLocation.BeforeMeta,
                    option_1.InjectionLocation.BeforeCssHead,
                    option_1.InjectionLocation.BeforeCssBody,
                    option_1.InjectionLocation.BeforeScriptHead,
                    option_1.InjectionLocation.BeforeScriptBody,
                    option_1.InjectionLocation.AfterMeta,
                    option_1.InjectionLocation.AfterCssHead,
                    option_1.InjectionLocation.AfterCssBody,
                    option_1.InjectionLocation.AfterScriptHead,
                    option_1.InjectionLocation.AfterScriptBody
                ];
            }
            const paramBefore = {};
            const paramBoforeParam = [
                [option_1.InjectionLocation.BeforeMeta, [tags.headTags, 'meta', 'head']],
                [option_1.InjectionLocation.BeforeCssHead, [tags.headTags, 'css', 'head']],
                [option_1.InjectionLocation.BeforeCssBody, [tags.bodyTags, 'css', 'body']],
                [option_1.InjectionLocation.BeforeScriptHead, [tags.headTags, 'script', 'head']],
                [option_1.InjectionLocation.BeforeScriptBody, [tags.bodyTags, 'script', 'body']]
            ];
            paramBoforeParam.forEach(elem => {
                paramBefore[elem[0]] = elem[1];
            });
            const paramAfter = {};
            const paramAfterParam = [
                [option_1.InjectionLocation.AfterMeta, [tags.headTags, 'meta', 'head']],
                [option_1.InjectionLocation.AfterCssHead, [tags.headTags, 'css', 'head']],
                [option_1.InjectionLocation.AfterCssBody, [tags.bodyTags, 'css', 'body']],
                [option_1.InjectionLocation.AfterScriptHead, [tags.headTags, 'script', 'head']],
                [option_1.InjectionLocation.AfterScriptBody, [tags.bodyTags, 'script', 'body']]
            ];
            paramAfterParam.forEach(elem => {
                paramAfter[elem[0]] = elem[1];
            });
            locations.forEach(loc => {
                let idx;
                let locNumberMap;
                if (loc in paramBefore) {
                    idx = HtmlLinkInjection.findIndexFirstTagInTags(paramBefore[loc][1], paramBefore[loc][0]);
                    if (idx == -1) {
                        idx = 0;
                    }
                    locNumberMap = result[paramBefore[loc][2]];
                    locNumberMap[loc] = idx;
                }
                if (loc in paramAfter) {
                    idx = HtmlLinkInjection.findIndexLastTagInTags(paramAfter[loc][1], paramAfter[loc][0]);
                    if (idx == -1) {
                        idx = paramAfter[loc][0].length;
                    }
                    else {
                        idx++;
                    }
                    locNumberMap = result[paramAfter[loc][2]];
                    locNumberMap[loc] = idx;
                }
            });
            return result;
        }
        /**
         * find minimum index at which tag name equals tag name in tags.
         */
        static findIndexFirstTagInTags(tagName, tags) {
            let result = -1;
            for (let idx = 0; idx < tags.length; idx++) {
                if (tags[idx].tagName.toUpperCase() == tagName.toUpperCase()) {
                    result = idx;
                    break;
                }
            }
            return result;
        }
        /**
         * find maximum index at which tag name equals tag name in tags.
         */
        static findIndexLastTagInTags(tagName, tags) {
            let result = -1;
            for (let idx = 0; idx < tags.length; idx++) {
                if (tags[tags.length - idx - 1].tagName == tagName) {
                    result = idx;
                    break;
                }
            }
            return result;
        }
        /**
         * create tag object
         */
        static createTagObject(link) {
            const tagAttribute = link;
            return html_webpack_plugin_1.default.createHtmlTagObject('link', tagAttribute);
        }
        /**
         * create a link item from href and entry name link item.
         * add the link item into location link item dictionary
         */
        static addHtmlTagObjectWithEntryNameLinkItem(loc, href, entryNameLinkItem, linkItems) {
            let items = linkItems[loc];
            if (!items) {
                items = [];
                linkItems[loc] = items;
            }
            const linkItem = HtmlLinkInjection.createProcessedLinkItemFromEntryNameLinkItem(href, entryNameLinkItem);
            const tagObj = HtmlLinkInjection.createTagObject(linkItem);
            items.push(tagObj);
        }
        /**
         * merge processed link tags into head body tags
         */
        static mergeTags(processedLinkTags, tags) {
            const locationSet = new Set();
            const locations = [];
            for (let key0 in processedLinkTags) {
                for (let key1 in processedLinkTags[key0]) {
                    if (!(key1 in locationSet)) {
                        locationSet.add(key1);
                        locations.push(key1);
                    }
                }
            }
            const locIndexMap = HtmlLinkInjection.createLocationIndexMapping(tags, locations);
            const headBodyInjectionOrder = {
                head: [
                    option_1.InjectionLocation.AfterScriptHead,
                    option_1.InjectionLocation.BeforeScriptHead,
                    option_1.InjectionLocation.AfterCssHead,
                    option_1.InjectionLocation.BeforeCssHead,
                    option_1.InjectionLocation.AfterMeta,
                    option_1.InjectionLocation.BeforeMeta
                ],
                body: [
                    option_1.InjectionLocation.AfterScriptBody,
                    option_1.InjectionLocation.BeforeScriptBody,
                    option_1.InjectionLocation.AfterCssBody,
                    option_1.InjectionLocation.BeforeCssBody
                ]
            };
            const keyMap0 = {
                head: ['headTags'],
                body: ['bodyTags']
            };
            const mergeOrder0 = [
                'linkItems',
                'entryNames'
            ];
            for (let key0 in keyMap0) {
                const order = headBodyInjectionOrder[key0];
                order.forEach(loc => {
                    mergeOrder0.forEach(processedKey => {
                        const items = processedLinkTags[processedKey][loc];
                        if (items) {
                            tags[keyMap0[key0]].splice(locIndexMap[key0][loc], 0, ...items);
                        }
                    });
                });
            }
        }
        /**
         * link item ooptions
         */
        get optionLinkItems() {
            const result = [];
            const option = this.option;
            if (option) {
                if ('link' in option) {
                    if (!Array.isArray(option.link)) {
                        result.push(option.link);
                    }
                    else {
                        result.push(...option.link);
                    }
                }
            }
            return result;
        }
        /**
         * called by webpack
         */
        apply(compiler) {
            compiler.hooks.compilation.tap(HtmlLinkInjection.pluginName, function (compilation, compiationParam) {
                const hooks = html_webpack_plugin_1.default.getHooks(compilation);
                const proc = this.createLinkInjectionProc(compilation);
                hooks.afterTemplateExecution.tapAsync(HtmlLinkInjection.pluginName, proc);
            }.bind(this));
        }
        /**
         * setup link item for processint from ooption
         */
        setupLinkItemForProcess() {
            const linkItems = this.optionLinkItems;
            let result = {
                entryNames: {},
                linkItems: {}
            };
            linkItems.forEach(elem => {
                const loc = elem.injectionLocation || option_1.InjectionLocation.AfterCssHead;
                const attr = elem.attributes || {};
                if (typeof elem.href === 'function') {
                    const linkItem = Object.assign(Object.assign({}, attr), { entryNameToHref: elem.href });
                    let linkItems;
                    if (!(loc in result.entryNames)) {
                        linkItems = [];
                        result.entryNames[loc] = linkItems;
                    }
                    else {
                        linkItems = result.entryNames[loc];
                    }
                    linkItems.push(linkItem);
                }
                else {
                    let linkItems;
                    if (!(loc in result.linkItems)) {
                        linkItems = [];
                        result.linkItems[loc] = linkItems;
                    }
                    else {
                        linkItems = result.linkItems[loc];
                    }
                    linkItems.push(Object.assign({ href: elem.href }, attr));
                }
            });
            return result;
        }
        /**
         * process link items with compilation
         */
        processLinkItems(entryNames, optionLinkItems) {
            const result = {};
            result.entryNames = this.optionEntryNamesToHtmlTagObjects(entryNames, optionLinkItems.entryNames);
            result.linkItems = {};
            for (let loc in optionLinkItems.linkItems) {
                result.linkItems[loc] = optionLinkItems.linkItems[loc].map(elem => HtmlLinkInjection.createTagObject(elem));
            }
            return result;
        }
        /**
         * create link item from option entry names
         */
        optionEntryNamesToHtmlTagObjects(entryNames, optionEntryNames) {
            const result = {};
            const thisPlugin = this;
            for (let loc in optionEntryNames) {
                const hrefs = thisPlugin.entryToHref(entryNames, optionEntryNames[loc]);
                hrefs.forEach(href => {
                    HtmlLinkInjection.addHtmlTagObjectWithEntryNameLinkItem(loc, href, optionEntryNames[loc], result);
                });
            }
            return result;
        }
        /**
         * entry name to href by procedure
         */
        entryToHref(entryNames, entryToHref) {
            const result = [];
            entryNames.forEach(elem => {
                const res = entryToHref(elem);
                if (res) {
                    result.push(res);
                }
            });
            return result;
        }
        /**
         * insert link tag object
         */
        insertLinkTagObject(compilation, param) {
            const links = [];
            const option = this.option;
            if (option) {
                if ('link' in option) {
                    if (!Array.isArray(option.link)) {
                        links.push(option.link);
                    }
                    else {
                        links.push(...option.link);
                    }
                }
            }
            const entryAndLinkItemsForProcess = this.setupLinkItemForProcess();
            const entryNames = HtmlLinkInjection.getEntryNamesByHtmlWebpackPlugin(compilation, param.plugin);
            const entryNameLinkItems = this.processLinkItems(entryNames, entryAndLinkItemsForProcess);
            HtmlLinkInjection.mergeTags(entryNameLinkItems, param);
        }
        /**
         * create link injection procedure
         */
        createLinkInjectionProc(compilation) {
            const result = function (param, cb) {
                this.injectLink(compilation, param);
                cb(null, param);
            }.bind(this);
            return result;
        }
        /**
         * inject link tag
         */
        injectLink(compilation, param) {
            this.insertLinkTagObject(compilation, param);
        }
    }
    exports.HtmlLinkInjection = HtmlLinkInjection;
});
// vi: se ts=2 sw=2 et:
//# sourceMappingURL=plugin.js.map