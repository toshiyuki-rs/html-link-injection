var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "path", "typescript-json-schema", "schema-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OptionValidator = void 0;
    var path_1 = __importDefault(require("path"));
    var tjs = __importStar(require("typescript-json-schema"));
    var schema_utils_1 = __importDefault(require("schema-utils"));
    /**
     * option validator
     */
    var OptionValidator = /** @class */ (function () {
        function OptionValidator() {
        }
        /**
         * initialize schema cache
         */
        OptionValidator.initCache = function () {
            var settings = {
                required: true
            };
            var compilerOption = {
                strictNullChecks: true
            };
            var prog = tjs.getProgramFromFiles([path_1.default.resolve(__dirname, './option')], compilerOption);
            OptionValidator.schemaCache = tjs.generateSchema(prog, 'Option', settings);
        };
        Object.defineProperty(OptionValidator, "schema", {
            /**
             * schema for option
             */
            get: function () {
                if (OptionValidator.schemaCache === undefined) {
                    OptionValidator.initCache();
                }
                return OptionValidator.schemaCache;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * validate option
         */
        OptionValidator.validate = function (option) {
            var result = undefined;
            if (schema_utils_1.default(OptionValidator.schema, option, {
                name: 'Html link injection Option'
            })) {
                result = option;
            }
            return result;
        };
        /**
         * schema cache
         */
        OptionValidator.schemaCache = undefined;
        return OptionValidator;
    }());
    exports.OptionValidator = OptionValidator;
});
// vi: se ts=2 sw=2 et:
//# sourceMappingURL=option-validator.js.map