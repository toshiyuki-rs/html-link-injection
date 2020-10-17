import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { OptionValidator } from './option-validator'
import {
  Option,
  InjectionLocation,
  LinkItemOption,
  ProcessedLinkItem,
  EntryNameLinkItem} from './option'


/**
 * link injection for html-webpack-plugin
 */
class HtmlLinkInjection {

  /**
   * plugin iname
   */
  static get pluginName(): string {
    return 'html-link-injection'
  }

  /**
   * get html-webpack-plugin's processed options.
   */
  static getHtmlWebpackPluginOptions(
    htmlPlugin: HtmlWebpackPlugin): HtmlWebpackPlugin.ProcessedOptions {
    return (<any>htmlPlugin).options
  }
  /**
   * filter entry name with  html-webpack-plugin's filter.
   */
  static filterEntriesByHtmlWebpackPlugin(
    htmlPlugin: HtmlWebpackPlugin,
    options: HtmlWebpackPlugin.ProcessedOptions,
    entryNames: string[])  {
    return (<any>htmlPlugin).filterChunks(
      entryNames, options.chunks, options.excludeChunks)
  }

  /**
   * sort entry names with html-webpack-plugin's sort.
   */
  static sortEntriesByHtmlWebpackPlugin(
    htmlPlugin: HtmlWebpackPlugin,
    options: HtmlWebpackPlugin.ProcessedOptions,
    compilation: webpack.compilation.Compilation,
    entryNames: string[])  {
    return (<any>htmlPlugin).sortEntryChunks(
      entryNames, options.chunksSortMode, compilation);

  }

  /**
   * entry names by html-webpack-plugin
   */
  static getEntryNamesByHtmlWebpackPlugin(
    compilation: webpack.compilation.Compilation,
    htmlPlugin: HtmlWebpackPlugin) {  
    const entryNames = Array.from(compilation.entrypoints.keys())
    const options = HtmlLinkInjection.getHtmlWebpackPluginOptions(htmlPlugin)
    let filteredEntryNames
    filteredEntryNames = HtmlLinkInjection.filterEntriesByHtmlWebpackPlugin(
      htmlPlugin, options, entryNames)
    let result
    result = HtmlLinkInjection.sortEntriesByHtmlWebpackPlugin(
      htmlPlugin, options, compilation, filteredEntryNames)
    return result
  }
  /**
   * create link item from entry name link item
   */
  static createProcessedLinkItemFromEntryNameLinkItem(
    href: string,
    entryNameLinkItem: EntryNameLinkItem): ProcessedLinkItem {
    const result: ProcessedLinkItem = { 
      href
    }
    for (let key in entryNameLinkItem) {
      if (typeof entryNameLinkItem[key] === 'string') {
        result[key] = entryNameLinkItem[key] 
      }
    }
    return result
  }
  /**
   * create location - index mapping
   */
  static createLocationIndexMapping( 
    tags: { 
      headTags: HtmlWebpackPlugin.HtmlTagObject[],
      bodyTags: HtmlWebpackPlugin.HtmlTagObject[]
    },
    locations: InjectionLocation[] | null): {
      head: { [key in InjectionLocation]: number },
      body: { [key in InjectionLocation]: number }
    } {
    const result: {
      head: { [key in InjectionLocation]: number },
      body: { [key in InjectionLocation]: number }
    } = { 
      head: <any>{ },
      body: <any>{ }
    }
    if (!locations) {
      locations = [
        InjectionLocation.BeforeMeta,
        InjectionLocation.BeforeCssHead,
        InjectionLocation.BeforeCssBody,
        InjectionLocation.BeforeScriptHead,
        InjectionLocation.BeforeScriptBody,
        InjectionLocation.AfterMeta,
        InjectionLocation.AfterCssHead,
        InjectionLocation.AfterCssBody,
        InjectionLocation.AfterScriptHead,
        InjectionLocation.AfterScriptBody
      ]
    }
    const paramBefore = { }
    const paramBoforeParam = [
     [InjectionLocation.BeforeMeta, [tags.headTags, 'meta', 'head']],
     [InjectionLocation.BeforeCssHead, [tags.headTags, 'css', 'head']],
     [InjectionLocation.BeforeCssBody, [tags.bodyTags, 'css', 'body']],
     [InjectionLocation.BeforeScriptHead, [tags.headTags, 'script', 'head']],
     [InjectionLocation.BeforeScriptBody, [tags.bodyTags, 'script', 'body']]
    ]
    paramBoforeParam.forEach(elem => {
      paramBefore[<string>elem[0]] = elem[1]
    })
    const paramAfter = {}
    const paramAfterParam = [ 
      [InjectionLocation.AfterMeta, [tags.headTags, 'meta', 'head']],
      [InjectionLocation.AfterCssHead, [tags.headTags, 'css', 'head']],
      [InjectionLocation.AfterCssBody, [tags.bodyTags, 'css', 'body']],
      [InjectionLocation.AfterScriptHead,[tags.headTags, 'script', 'head']],
      [InjectionLocation.AfterScriptBody, [tags.bodyTags, 'script', 'body']]
    ]
    paramAfterParam.forEach(elem => {
      paramAfter[<string>elem[0]] = elem[1]
    }) 
    locations.forEach(loc =>{
      let idx: number
      let locNumberMap: { [key in InjectionLocation]: number } 
      if (loc in paramBefore) {
        idx = HtmlLinkInjection.findIndexFirstTagInTags(
          paramBefore[loc][1],
          paramBefore[loc][0])
        if (idx == -1) {
          idx = 0
        }
        locNumberMap = result[paramBefore[loc][2]]
        locNumberMap[loc] = idx
      }
      if (loc in paramAfter) {
        idx = HtmlLinkInjection.findIndexLastTagInTags(
          paramAfter[loc][1],
          paramAfter[loc][0])
        if (idx == -1) {
          idx = paramAfter[loc][0].length
        } else {
          idx++
        } 
        locNumberMap = result[paramAfter[loc][2]]
        locNumberMap[loc] = idx
      }
    })
    return result
  }

  /**
   * find minimum index at which tag name equals tag name in tags.
   */
  static findIndexFirstTagInTags(
    tagName: string,
    tags: HtmlWebpackPlugin.HtmlTagObject[]): number {
    let result = -1
    for (let idx = 0; idx < tags.length; idx++) {
      if (tags[idx].tagName.toUpperCase() == tagName.toUpperCase()) {
        result = idx
        break
      }
    }
    return result
  }
  /**
   * find maximum index at which tag name equals tag name in tags.
   */
  static findIndexLastTagInTags(
    tagName: string,
    tags: HtmlWebpackPlugin.HtmlTagObject[]): number {
    let result = -1
    for (let idx = 0; idx < tags.length; idx++) {
      if (tags[tags.length - idx - 1].tagName == tagName) {
        result = idx
        break
      }
    }
    return result
  }
  /**
   * create tag object
   */
  static createTagObject(
    link: ProcessedLinkItem): HtmlWebpackPlugin.HtmlTagObject {
    const tagAttribute = <any>link 
    return HtmlWebpackPlugin.createHtmlTagObject(
      'link', <{ [attributeName: string]: string | boolean }>tagAttribute)
  }
  /**
   * create a link item from href and entry name link item.
   * add the link item into location link item dictionary
   */
  static addHtmlTagObjectWithEntryNameLinkItem(
    loc: InjectionLocation,
    href: string,
    entryNameLinkItem : EntryNameLinkItem,
    linkItems: { 
        [key in InjectionLocation] : HtmlWebpackPlugin.HtmlTagObject[] 
    }){

    let items = linkItems[loc]
    if (!items) {
      items = [] 
      linkItems[loc] = items
    }
    const linkItem = 
      HtmlLinkInjection.createProcessedLinkItemFromEntryNameLinkItem(
        href, entryNameLinkItem)
    const tagObj = HtmlLinkInjection.createTagObject(linkItem)
    items.push(tagObj)
  }



  /**
   * merge processed link tags into head body tags
   */
  static mergeTags(
    processedLinkTags: { 
      entryNames: {
        [key in InjectionLocation] : HtmlWebpackPlugin.HtmlTagObject[] },
      linkItems: {
        [key in InjectionLocation] : HtmlWebpackPlugin.HtmlTagObject[] }
    },
    tags: { 
      headTags: HtmlWebpackPlugin.HtmlTagObject[],
      bodyTags: HtmlWebpackPlugin.HtmlTagObject[]
    }) {

    const locationSet: Set<InjectionLocation> = new Set<InjectionLocation>()
    const locations: InjectionLocation[] = []
    for (let key0 in processedLinkTags) {
      for (let key1 in processedLinkTags[key0]) {
        if (!(key1 in locationSet)) {
          locationSet.add(<InjectionLocation>key1)
          locations.push(<InjectionLocation>key1)
        }
      }
    }
    const locIndexMap = HtmlLinkInjection.createLocationIndexMapping(
      tags, locations)
    const headBodyInjectionOrder = {
      head: [ 
        InjectionLocation.AfterScriptHead,
        InjectionLocation.BeforeScriptHead,
        InjectionLocation.AfterCssHead,
        InjectionLocation.BeforeCssHead,
        InjectionLocation.AfterMeta,
        InjectionLocation.BeforeMeta],
      body: [
        InjectionLocation.AfterScriptBody,
        InjectionLocation.BeforeScriptBody,
        InjectionLocation.AfterCssBody,
        InjectionLocation.BeforeCssBody]
    } 
    const keyMap0 = {
      head: ['headTags'],
      body: ['bodyTags']
    }
    const mergeOrder0 = [
      'linkItems',
      'entryNames' 
    ] 


    for (let key0 in keyMap0) {
      const order = headBodyInjectionOrder[key0]
      order.forEach(loc => {

        mergeOrder0.forEach(processedKey => {
          const items = processedLinkTags[processedKey][loc]
          if (items) {
            tags[keyMap0[key0]].splice(
              locIndexMap[key0][loc], 0, ...items)
          }
        })
      })
    }
  }
   
  /**
   * option
   */
  option?: Option 


  /**
   * link item ooptions
   */
  get optionLinkItems() {
    const result: LinkItemOption[] = []
    const option = this.option
    if (option) {
      if ('link' in option) {
        if (!Array.isArray(option.link)) {
          result.push(option.link)
        } else {
          result.push(...option.link)
        }
      }
    }
    return result
  }
   
  /**
   * constructor
   */
  constructor(option: Option = undefined) {
    if (option) {
      this.option = OptionValidator.validate(option)
    }
  }

  /**
   * called by webpack
   */
  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap(
      HtmlLinkInjection.pluginName, function(compilation, compiationParam) {
        const hooks = HtmlWebpackPlugin.getHooks(compilation)
        const proc = this.createLinkInjectionProc(compilation)
        hooks.afterTemplateExecution.tapAsync(
          HtmlLinkInjection.pluginName, proc)
      }.bind(this))
  }


  /**
   * setup link item for processint from ooption
   */ 
  setupLinkItemForProcess(): {
      entryNames: { [key in InjectionLocation] : EntryNameLinkItem[] },
      linkItems: { [key in InjectionLocation] : ProcessedLinkItem[] }
  } {
    const linkItems = this.optionLinkItems
    let result: {
      entryNames: { [key in InjectionLocation] : EntryNameLinkItem[] },
      linkItems: { [key in InjectionLocation] : ProcessedLinkItem[] }
    } = <any>{
      entryNames: {},
      linkItems: {} 
    }
    linkItems.forEach(elem => {
      const loc = elem.injectionLocation || InjectionLocation.AfterCssHead
      const attr = elem.attributes || { }
      if (typeof elem.href === 'function') {
        const linkItem : EntryNameLinkItem = <any>{
          ...attr,
          entryNameToHref: elem.href

        }
        let linkItems: EntryNameLinkItem[]
        if (!(loc in result.entryNames)) {
          linkItems = []
          result.entryNames[loc] = linkItems
        } else {
          linkItems = result.entryNames[loc]
        }
        linkItems.push(linkItem)
      } else {
        let linkItems: ProcessedLinkItem[]
        if (!(loc in result.linkItems)) {
          linkItems = []
          result.linkItems[loc] = linkItems
        } else {
          linkItems = result.linkItems[loc]
        }
        linkItems.push({
          href: elem.href,
          ...attr
        })
      }
    }) 
    return result
  }

  /**
   * process link items with compilation
   */
  processLinkItems(
    entryNames: string[],
    optionLinkItems: {
      entryNames: { [key in InjectionLocation] : EntryNameLinkItem[] },
      linkItems: { [key in InjectionLocation] : ProcessedLinkItem[] }
    }): { 
      entryNames: {
        [key in InjectionLocation] : HtmlWebpackPlugin.HtmlTagObject[] },
      linkItems: {
        [key in InjectionLocation] : HtmlWebpackPlugin.HtmlTagObject[] }
    } {
    const result: { 
      entryNames: {
        [key in InjectionLocation] : HtmlWebpackPlugin.HtmlTagObject[] },
      linkItems: {
        [key in InjectionLocation] : HtmlWebpackPlugin.HtmlTagObject[] }
    } = <any>{ } 
    result.entryNames = this.optionEntryNamesToHtmlTagObjects(
      entryNames, optionLinkItems.entryNames)


    result.linkItems = <any>{}
    for (let loc in optionLinkItems.linkItems) {
      result.linkItems[loc] = optionLinkItems.linkItems[loc].map(
        elem => HtmlLinkInjection.createTagObject(elem))
    } 
    return result
  } 


  /**
   * create link item from option entry names 
   */
  optionEntryNamesToHtmlTagObjects(
    entryNames: string[],
    optionEntryNames: {
      [key in InjectionLocation]: EntryNameLinkItem[]
    }):{
      [key in InjectionLocation]: HtmlWebpackPlugin.HtmlTagObject[]
    } {
    const result: {
      [key in InjectionLocation] : HtmlWebpackPlugin.HtmlTagObject[] } = <any>{}

    const thisPlugin = this
    for (let loc in optionEntryNames) {
      const hrefs = thisPlugin.entryToHref(
        entryNames, optionEntryNames[loc])
      hrefs.forEach(href => {
        HtmlLinkInjection.addHtmlTagObjectWithEntryNameLinkItem(
          <any>loc, href, optionEntryNames[loc],
          result)
        })
    }
    return result
  }

  /**
   * entry name to href by procedure
   */
  entryToHref(
    entryNames: string[],
    entryToHref: ((entry: string)=>string)): string[]  {
    const result: string[] = []

    entryNames.forEach(elem => {
      const res = entryToHref(elem)
      if (res) {
        result.push(res)
      }
    })
    return result
  }
 

  /**
   * insert link tag object
   */
  insertLinkTagObject(
    compilation: webpack.compilation.Compilation,
    param: {
      html: string, 
      headTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      outputName: string, 
      plugin: HtmlWebpackPlugin}) {
    const links: LinkItemOption[] = []
    const option = this.option
    if (option) {
      if ('link' in option) {
        if (!Array.isArray(option.link)) {
          links.push(option.link)
        } else {
          links.push(...option.link)
        }
      }
    }
    const entryAndLinkItemsForProcess = this.setupLinkItemForProcess()
    const entryNames = HtmlLinkInjection.getEntryNamesByHtmlWebpackPlugin(
      compilation, param.plugin)

    const entryNameLinkItems = this.processLinkItems(
      entryNames, entryAndLinkItemsForProcess)

    HtmlLinkInjection.mergeTags(entryNameLinkItems, param) 
  }

  /**
   * create link injection procedure
   */
  createLinkInjectionProc(
    compilation: webpack.compilation.Compilation):
    ((param: {
      html: string, 
      headTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      outputName: string, 
      plugin: HtmlWebpackPlugin},
      cb: ((err: any, param: {
        html: string,
        headTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
        bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
        outputName: string,
        plugin: HtmlWebpackPlugin
      })=> void))=>void) {
    
    const result = function(param: {
      html: string, 
      headTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      outputName: string, 
      plugin: HtmlWebpackPlugin},
      cb: ((err: any, param: {
        html: string,
        headTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
        bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
        outputName: string,
        plugin: HtmlWebpackPlugin
      })=>void)) {
      this.injectLink(compilation, param)
      cb(null, param)
    }.bind(this)
    return result
  }

  /**
   * inject link tag
   */
  injectLink(
    compilation: webpack.compilation.Compilation,
    param: {
      html: string, 
      headTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      outputName: string, 
      plugin: HtmlWebpackPlugin}) {
    this.insertLinkTagObject(compilation, param)
  }
}


export { HtmlLinkInjection }
// vi: se ts=2 sw=2 et:
