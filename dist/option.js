(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RelType = exports.ReferencePolicyType = exports.CrossOriginType = void 0;
    /**
     * cross origin
     */
    var CrossOriginType;
    (function (CrossOriginType) {
        CrossOriginType["Anonymouse"] = "anonymous";
        CrossOriginType["UseCredentials"] = "use-credentials";
    })(CrossOriginType || (CrossOriginType = {}));
    exports.CrossOriginType = CrossOriginType;
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
    exports.ReferencePolicyType = ReferencePolicyType;
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
    exports.RelType = RelType;
});
// vi: se ts=2 sw=2 et:
//# sourceMappingURL=option.js.map