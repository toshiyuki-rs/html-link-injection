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
        define(["require", "exports", "path", "fs", "typescript-json-schema", "schema-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OptionValidator = void 0;
    const path_1 = __importDefault(require("path"));
    const fs_1 = __importDefault(require("fs"));
    const tjs = __importStar(require("typescript-json-schema"));
    const schema_utils_1 = __importDefault(require("schema-utils"));
    /**
     * option validator
     */
    class OptionValidator {
        /**
         * schema cache file path
         */
        static get schemaFileName() {
            return 'option-schema.json';
        }
        /**
         * schema cache path
         */
        static get schemaCacheFile() {
            return path_1.default.join(__dirname, OptionValidator.schemaFileName);
        }
        /**
         * initialize schema cache
         */
        static initCache() {
            let schema = OptionValidator.loadSchemaFromJson();
            if (!schema) {
                schema = OptionValidator.loadSchemaFromTypescript();
            }
            OptionValidator.schemaCache = schema;
        }
        /**
         * load schema from typescript
         */
        static loadSchemaFromTypescript() {
            const settings = {
                required: true
            };
            const compilerOption = {
                strictNullChecks: true
            };
            const prog = tjs.getProgramFromFiles([path_1.default.resolve(__dirname, './option')], compilerOption);
            return tjs.generateSchema(prog, 'Option', settings);
        }
        /**
         * load schema from json file
         */
        static loadSchemaFromJson() {
            const optionSchemaPath = OptionValidator.schemaCacheFile;
            let result;
            try {
                result = require(optionSchemaPath);
            }
            catch (_a) {
            }
            return result;
        }
        /**
         * schema for option
         */
        static get schema() {
            if (OptionValidator.schemaCache === undefined) {
                OptionValidator.initCache();
            }
            return OptionValidator.schemaCache;
        }
        /**
         * validate option
         */
        static validate(option) {
            let result = undefined;
            if (schema_utils_1.default(OptionValidator.schema, option, {
                name: 'Html link injection Option'
            })) {
                result = option;
            }
            return result;
        }
        /**
         * save schema
         */
        static saveSchema() {
            const schema = OptionValidator.schema;
            fs_1.default.writeFile(OptionValidator.schemaCacheFile, JSON.stringify(schema), err => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
    exports.OptionValidator = OptionValidator;
    /**
     * schema cache
     */
    OptionValidator.schemaCache = undefined;
});
// vi: se ts=2 sw=2 et:
//# sourceMappingURL=option-validator.js.map