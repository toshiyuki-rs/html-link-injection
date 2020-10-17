import path from 'path';
import fs from 'fs';
import * as tjs from 'typescript-json-schema';
import validateOptions from 'schema-utils';
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
        return path.join(__dirname, OptionValidator.schemaFileName);
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
        const prog = tjs.getProgramFromFiles([path.resolve(__dirname, './option')], compilerOption);
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
        if (validateOptions(OptionValidator.schema, option, {
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
        fs.writeFile(OptionValidator.schemaCacheFile, JSON.stringify(schema), err => {
            if (err) {
                console.log(err);
            }
        });
    }
}
/**
 * schema cache
 */
OptionValidator.schemaCache = undefined;
export { OptionValidator };
// vi: se ts=2 sw=2 et:
//# sourceMappingURL=option-validator.js.map