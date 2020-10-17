
/**
 * cross origin
 */
enum CrossOriginType {
  Anonymouse = 'anonymous',
  UseCredentials = 'use-credentials' 

}

/**
 * reference policy
 */
enum ReferencePolicyType {
  NoReferrer = 'no-referrer',
  NoReferrerWhenCrssOrigin = 'no-referrer-when-downgrade',
  Origin = 'origin',
  OriginWhenCrossOrigin = 'origin-when-cross-origin',
  UnsafeUrl = 'unsafe-url'
}

/**
 * rel
 */
enum RelType {
  Alternate = 'alternate',
  Author = 'author',
  DnsPrefetch = 'dns-prefetch',
  Help = 'help',
  Icon = 'icon',
  License = 'license',
  Next = 'next',
  PingBack = 'pingback',
  Preconnect = 'preconnect',
  Prefetch = 'prefetch',
  Preload = 'preload',
  Perender = 'prerender',
  Prev = 'prev',
  Search = 'search',
  StyleSheet = 'stylesheet'
}

/**
 * link injection location
 *
 */
enum InjectionLocation { 
  /**
   * inject link item before meta by html-webpack-plugin
   */
  BeforeMeta = "beforMeta", 
  /**
   * inject link item after meta by html-webpack-plugin 
   */
  AfterMeta = "afterMeta", 
  /**
   * inject link item before css by html-webpack-plugin in head tag
   */
  BeforeCssHead = "beforeCssHead",
  /**
   * inject link item after css by html-webpack-plugin in head tag
   */
  AfterCssHead = "afterCssHead", 
  /**
   * inject link item before css by html-webpack-plugin in body tag
   */
  BeforeCssBody = "beforeCssBody",
  /**
   * inject link item after css by html-webpack-plugin in body tag
   */
  AfterCssBody = "afterCssBody", 
  /**
   * inject link item before script html-webpack-plugin in head tag
   */
  BeforeScriptHead = "beforeScriptHead", 
  /**
   * inject link item after script by html-webpack-plugin in head tag
   */
  AfterScriptHead = "afterScriptHead",
  /**
   * inject link item before script by html-webpack-plugin in body tag
   */
  BeforeScriptBody = "beforeScriptBody", 
  /**
   * inject link item after script by html-webpack-plugin in body tag
   */
  AfterScriptBody = "afterScriptBody"
}



/**
 * link tag attributes
 */
interface LinkAttributes {

  /**
   * crossorigin attribute of link tag
   */
  crossorigin?: CrossOriginType,
  /**
   * hreflang attribute of link tag
   */
  hreflang?: string,
  /**
   * media attribute of link tag
   */
  media?: string,
  /**
   * referencepolicy attribute of link tag
   */
  referencepolicy?: ReferencePolicyType
  /**
   * rel attribute of link tag
   */
  rel?: RelType
  /**
   * size attribute of link tag
   */
  sizes?: string 
  /**
   * title attribute of link tag
   */
  title?: string
  /**
   * type attribute of link tag
   */
  type?: string 
}


/**
 * link tag
 */
interface LinkItemOption extends LinkAttributes {
  /**
   * href attribute or entry filter
   */
  href: string | ((entryName: string) => string | null | undefined)

  /**
   * location
   */
  injectionLocation?: InjectionLocation

}

interface ProcessedLinkItem extends LinkAttributes {
  /**
   * href attribute
   */
  href: string
}


/**
 * create href from entry name
 */
interface EntryNameLinkItem extends LinkAttributes {
  entryToHref: ((entryName: string) => string | null | undefined)
}


/**
 * option
 */
interface Option {
  /**
   * link tag settting
   */
  link?: LinkItemOption[] | LinkItemOption 
}


export {
  Option,
  LinkItemOption, 
  CrossOriginType,
  ReferencePolicyType,
  RelType,
  InjectionLocation,
  LinkAttributes,
  ProcessedLinkItem,
  EntryNameLinkItem
}

// vi: se ts=2 sw=2 et:
