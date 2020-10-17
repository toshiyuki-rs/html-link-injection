import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { Option, InjectionLocation, LinkItemOption, ProcessedLinkItem, EntryNameLinkItem } from './option';
/**
 * link injection for html-webpack-plugin
 */
declare class HtmlLinkInjection {
    /**
     * plugin iname
     */
    static get pluginName(): string;
    /**
     * get html-webpack-plugin's processed options.
     */
    static getHtmlWebpackPluginOptions(htmlPlugin: HtmlWebpackPlugin): HtmlWebpackPlugin.ProcessedOptions;
    /**
     * filter entry name with  html-webpack-plugin's filter.
     */
    static filterEntriesByHtmlWebpackPlugin(htmlPlugin: HtmlWebpackPlugin, options: HtmlWebpackPlugin.ProcessedOptions, entryNames: string[]): any;
    /**
     * sort entry names with html-webpack-plugin's sort.
     */
    static sortEntriesByHtmlWebpackPlugin(htmlPlugin: HtmlWebpackPlugin, options: HtmlWebpackPlugin.ProcessedOptions, compilation: webpack.compilation.Compilation, entryNames: string[]): any;
    /**
     * entry names by html-webpack-plugin
     */
    static getEntryNamesByHtmlWebpackPlugin(compilation: webpack.compilation.Compilation, htmlPlugin: HtmlWebpackPlugin): any;
    /**
     * create link item from entry name link item
     */
    static createProcessedLinkItemFromEntryNameLinkItem(href: string, entryNameLinkItem: EntryNameLinkItem): ProcessedLinkItem;
    /**
     * create location - index mapping
     */
    static createLocationIndexMapping(tags: {
        headTags: HtmlWebpackPlugin.HtmlTagObject[];
        bodyTags: HtmlWebpackPlugin.HtmlTagObject[];
    }, locations: InjectionLocation[] | null): {
        head: {
            [key in InjectionLocation]: number;
        };
        body: {
            [key in InjectionLocation]: number;
        };
    };
    /**
     * find minimum index at which tag name equals tag name in tags.
     */
    static findIndexFirstTagInTags(tagName: string, tags: HtmlWebpackPlugin.HtmlTagObject[]): number;
    /**
     * find maximum index at which tag name equals tag name in tags.
     */
    static findIndexLastTagInTags(tagName: string, tags: HtmlWebpackPlugin.HtmlTagObject[]): number;
    /**
     * create tag object
     */
    static createTagObject(link: ProcessedLinkItem): HtmlWebpackPlugin.HtmlTagObject;
    /**
     * create a link item from href and entry name link item.
     * add the link item into location link item dictionary
     */
    static addHtmlTagObjectWithEntryNameLinkItem(loc: InjectionLocation, href: string, entryNameLinkItem: EntryNameLinkItem, linkItems: {
        [key in InjectionLocation]: HtmlWebpackPlugin.HtmlTagObject[];
    }): void;
    /**
     * merge processed link tags into head body tags
     */
    static mergeTags(processedLinkTags: {
        entryNames: {
            [key in InjectionLocation]: HtmlWebpackPlugin.HtmlTagObject[];
        };
        linkItems: {
            [key in InjectionLocation]: HtmlWebpackPlugin.HtmlTagObject[];
        };
    }, tags: {
        headTags: HtmlWebpackPlugin.HtmlTagObject[];
        bodyTags: HtmlWebpackPlugin.HtmlTagObject[];
    }): void;
    /**
     * option
     */
    option?: Option;
    /**
     * link item ooptions
     */
    get optionLinkItems(): LinkItemOption[];
    /**
     * constructor
     */
    constructor(option?: Option);
    /**
     * called by webpack
     */
    apply(compiler: webpack.Compiler): void;
    /**
     * setup link item for processint from ooption
     */
    setupLinkItemForProcess(): {
        entryNames: {
            [key in InjectionLocation]: EntryNameLinkItem[];
        };
        linkItems: {
            [key in InjectionLocation]: ProcessedLinkItem[];
        };
    };
    /**
     * process link items with compilation
     */
    processLinkItems(entryNames: string[], optionLinkItems: {
        entryNames: {
            [key in InjectionLocation]: EntryNameLinkItem[];
        };
        linkItems: {
            [key in InjectionLocation]: ProcessedLinkItem[];
        };
    }): {
        entryNames: {
            [key in InjectionLocation]: HtmlWebpackPlugin.HtmlTagObject[];
        };
        linkItems: {
            [key in InjectionLocation]: HtmlWebpackPlugin.HtmlTagObject[];
        };
    };
    /**
     * create link item from option entry names
     */
    optionEntryNamesToHtmlTagObjects(entryNames: string[], optionEntryNames: {
        [key in InjectionLocation]: EntryNameLinkItem[];
    }): {
        [key in InjectionLocation]: HtmlWebpackPlugin.HtmlTagObject[];
    };
    /**
     * entry name to href by procedure
     */
    entryToHref(entryNames: string[], entryToHref: ((entry: string) => string)): string[];
    /**
     * insert link tag object
     */
    insertLinkTagObject(compilation: webpack.compilation.Compilation, param: {
        html: string;
        headTags: Array<HtmlWebpackPlugin.HtmlTagObject>;
        bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject>;
        outputName: string;
        plugin: HtmlWebpackPlugin;
    }): void;
    /**
     * create link injection procedure
     */
    createLinkInjectionProc(compilation: webpack.compilation.Compilation): ((param: {
        html: string;
        headTags: Array<HtmlWebpackPlugin.HtmlTagObject>;
        bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject>;
        outputName: string;
        plugin: HtmlWebpackPlugin;
    }, cb: ((err: any, param: {
        html: string;
        headTags: Array<HtmlWebpackPlugin.HtmlTagObject>;
        bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject>;
        outputName: string;
        plugin: HtmlWebpackPlugin;
    }) => void)) => void);
    /**
     * inject link tag
     */
    injectLink(compilation: webpack.compilation.Compilation, param: {
        html: string;
        headTags: Array<HtmlWebpackPlugin.HtmlTagObject>;
        bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject>;
        outputName: string;
        plugin: HtmlWebpackPlugin;
    }): void;
}
export { HtmlLinkInjection };
