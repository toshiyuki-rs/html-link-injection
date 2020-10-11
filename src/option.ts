
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
 * link tag
 */
interface LinkItemOption {
  /**
   * href attribute of link tag
   */
  href: string
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
 * option
 */
interface Option {
  /**
   * link tag settting
   */
  link?: LinkItemOption[] | LinkItemOption 
}


export { Option, LinkItemOption, 
  CrossOriginType, ReferencePolicyType, RelType }

// vi: se ts=2 sw=2 et:
