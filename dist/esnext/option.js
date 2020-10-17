/**
 * cross origin
 */
var CrossOriginType;
(function (CrossOriginType) {
    CrossOriginType["Anonymouse"] = "anonymous";
    CrossOriginType["UseCredentials"] = "use-credentials";
})(CrossOriginType || (CrossOriginType = {}));
/**
 * reference policy
 */
var ReferencePolicyType;
(function (ReferencePolicyType) {
    ReferencePolicyType["NoReferrer"] = "no-referrer";
    ReferencePolicyType["NoReferrerWhenCrssOrigin"] = "no-referrer-when-downgrade";
    ReferencePolicyType["Origin"] = "origin";
    ReferencePolicyType["OriginWhenCrossOrigin"] = "origin-when-cross-origin";
    ReferencePolicyType["UnsafeUrl"] = "unsafe-url";
})(ReferencePolicyType || (ReferencePolicyType = {}));
/**
 * rel
 */
var RelType;
(function (RelType) {
    RelType["Alternate"] = "alternate";
    RelType["Author"] = "author";
    RelType["DnsPrefetch"] = "dns-prefetch";
    RelType["Help"] = "help";
    RelType["Icon"] = "icon";
    RelType["License"] = "license";
    RelType["Next"] = "next";
    RelType["PingBack"] = "pingback";
    RelType["Preconnect"] = "preconnect";
    RelType["Prefetch"] = "prefetch";
    RelType["Preload"] = "preload";
    RelType["Perender"] = "prerender";
    RelType["Prev"] = "prev";
    RelType["Search"] = "search";
    RelType["StyleSheet"] = "stylesheet";
})(RelType || (RelType = {}));
/**
 * link injection location
 *
 */
var InjectionLocation;
(function (InjectionLocation) {
    /**
     * inject link item before meta by html-webpack-plugin
     */
    InjectionLocation["BeforeMeta"] = "beforMeta";
    /**
     * inject link item after meta by html-webpack-plugin
     */
    InjectionLocation["AfterMeta"] = "afterMeta";
    /**
     * inject link item before css by html-webpack-plugin in head tag
     */
    InjectionLocation["BeforeCssHead"] = "beforeCssHead";
    /**
     * inject link item after css by html-webpack-plugin in head tag
     */
    InjectionLocation["AfterCssHead"] = "afterCssHead";
    /**
     * inject link item before css by html-webpack-plugin in body tag
     */
    InjectionLocation["BeforeCssBody"] = "beforeCssBody";
    /**
     * inject link item after css by html-webpack-plugin in body tag
     */
    InjectionLocation["AfterCssBody"] = "afterCssBody";
    /**
     * inject link item before script html-webpack-plugin in head tag
     */
    InjectionLocation["BeforeScriptHead"] = "beforeScriptHead";
    /**
     * inject link item after script by html-webpack-plugin in head tag
     */
    InjectionLocation["AfterScriptHead"] = "afterScriptHead";
    /**
     * inject link item before script by html-webpack-plugin in body tag
     */
    InjectionLocation["BeforeScriptBody"] = "beforeScriptBody";
    /**
     * inject link item after script by html-webpack-plugin in body tag
     */
    InjectionLocation["AfterScriptBody"] = "afterScriptBody";
})(InjectionLocation || (InjectionLocation = {}));
export { CrossOriginType, ReferencePolicyType, RelType, InjectionLocation };
// vi: se ts=2 sw=2 et:
//# sourceMappingURL=option.js.map