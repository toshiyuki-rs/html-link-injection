import * as tjs from 'typescript-json-schema';
import { Option } from './option';
/**
 * option validator
 */
declare class OptionValidator {
    /**
     * schema cache
     */
    private static schemaCache;
    /**
     * schema cache file path
     */
    private static get schemaFileName();
    /**
     * schema cache path
     */
    private static get schemaCacheFile();
    /**
     * initialize schema cache
     */
    static initCache(): void;
    /**
     * load schema from typescript
     */
    static loadSchemaFromTypescript(): object;
    /**
     * load schema from json file
     */
    static loadSchemaFromJson(): object;
    /**
     * schema for option
     */
    static get schema(): tjs.Definition;
    /**
     * validate option
     */
    static validate(option: any): Option | undefined;
    /**
     * save schema
     */
    static saveSchema(): void;
}
export { OptionValidator };
