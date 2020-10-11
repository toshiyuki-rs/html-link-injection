import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { OptionValidator } from './option-validator'
import { Option, LinkItemOption } from './option'


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
   * option
   */
  option?: Option 
  
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
    const beforeEmitHdlr = function(param: {
      html: string, 
      outputName: string, 
      plugin: HtmlWebpackPlugin},
      cb: (err: any,
        param: {
          html: string,
          outputName: string,
          plugin: HtmlWebpackPlugin
        }) => void) {

    }.bind(this)

    const afterTemplateExecutionHdlr = function(param: {
      html: string,
      headTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      outputName: string,
      plugin: HtmlWebpackPlugin },
      cb: (err: any,
        param: {
          html: string,
          headTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
          bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
          outputName: string,
          plugin: HtmlWebpackPlugin
        }) => void) {
      this.injectLink(param, cb)
    }.bind(this)

    compiler.hooks.compilation.tap(
      HtmlLinkInjection.pluginName, (compilation, compiationParam)=> {
        const hooks = HtmlWebpackPlugin.getHooks(compilation)
        hooks.afterTemplateExecution.tapAsync(
          HtmlLinkInjection.pluginName, afterTemplateExecutionHdlr)
      })
  }

  /**
   * link item to string
   */
  linkItemToString(link: LinkItemOption): string {
    let href = `href="${link.href}"` 
    let crossorigin = ''
    if (link.crossorigin) {
      crossorigin = `crossorigin="${link.crossorigin}"`
    } 
    let hreflang = ''
    if (link.hreflang) {
      hreflang = `hreflang="${link.hreflang}"`
    }
    let media = ''
    if (link.media) {
      media = `media="${link.media}"`
    }
    let referencepolicy = ''
    if (link.referencepolicy) {
      referencepolicy = `media="${link.referencepolicy}"`
    }
    let rel = ''
    if (link.rel) {
      rel = `rel="${link.rel}"`
    }
    let sizes = ''
    if (link.sizes) {
      sizes = `sizes="${link.sizes}"`
    }
    let title = ''
    if (link.title) {
      title = `title="${link.title}"`
    }
    let type = ''
    if (link.type) {
      type = `type="${link.type}"`
    }
    let result = `<link ${href} ${crossorigin} ${hreflang} ${media}`
    result += `${referencepolicy} ${rel} ${sizes} ${title} ${type}>`
    return result
  }

  /**
   * create tag object
   */
  createTagObject(link: LinkItemOption): HtmlWebpackPlugin.HtmlTagObject {
    const tagAttribute = <any>link 
    return HtmlWebpackPlugin.createHtmlTagObject(
      'link', <{ [attributeName: string]: string | boolean }>tagAttribute)

  }

  /**
   * create link tags
   */
  createLinkTags(): string[] {
    let result: string[] = []

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
    links.forEach(elem => {
      result.push(this.linkItemToString(elem))
    })
    return result
  }

  insertLinkTagObject(
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
    links.forEach(elem => {
      param.headTags.push(this.createTagObject(elem))
    })
 
  }

  /**
   * inject link tag
   */
  injectLink(param: {
    html: string, 
    headTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
    bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
    outputName: string, 
    plugin: HtmlWebpackPlugin},
    cb: (err: any, param: {
      html: string,
      headTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      bodyTags: Array<HtmlWebpackPlugin.HtmlTagObject> 
      outputName: string,
      plugin: HtmlWebpackPlugin
    }) => void) {
    this.insertLinkTagObject(param)
    cb(null, param)
  }
}


export { HtmlLinkInjection }
// vi: se ts=2 sw=2 et:
