import path from 'path'
import fs from 'fs'
import * as tjs from 'typescript-json-schema'
import validateOptions from 'schema-utils'
import { Option } from './option'

/**
 * option validator
 */
class OptionValidator {
  
  /**
   * schema cache
   */
  private static schemaCache : tjs.Definition | undefined = undefined

  /**
   * schema cache file path
   */
  private static get schemaFileName(): string {
    return 'option-schema.json'
  }
  /**
   * schema cache path
   */
  private static get schemaCacheFile(): string {
    return path.join(__dirname, OptionValidator.schemaFileName)
  }

  /**
   * initialize schema cache
   */
  static initCache() {
    let schema = OptionValidator.loadSchemaFromJson()
    if (!schema) {
      schema = OptionValidator.loadSchemaFromTypescript()
    }
    OptionValidator.schemaCache = schema
  }

  /**
   * load schema from typescript
   */
  static loadSchemaFromTypescript(): object {
    const settings: tjs.PartialArgs = {
      required: true
    }
    const compilerOption: tjs.CompilerOptions = {
      strictNullChecks: true 
    }
    const prog = tjs.getProgramFromFiles(
      [path.resolve(__dirname, './option')],
      compilerOption)
    return tjs.generateSchema(prog, 'Option', settings)
  } 

  /**
   * load schema from json file
   */
  static loadSchemaFromJson(): object  {
    const optionSchemaPath = OptionValidator.schemaCacheFile 
    let result
    try {
      result = require(optionSchemaPath)
    } catch {
    }
    return result
  }

  /**
   * schema for option
   */
  static get schema() {
    if (OptionValidator.schemaCache === undefined) {
      OptionValidator.initCache()
    }
    return OptionValidator.schemaCache
  }

  /**
   * validate option
   */
  static validate(option: any): Option | undefined {

    let result = undefined
    if (validateOptions(OptionValidator.schema, option, {
      name: 'Html link injection Option'
    })) {
      result = <Option>option
    }
    return result
  }
  /**
   * save schema
   */
  static saveSchema() {
    const schema = OptionValidator.schema 
    fs.writeFile(OptionValidator.schemaCacheFile,
      JSON.stringify(schema),
      err => {
        if (err) {
          console.log(err)
        }
      })
  }
}

export { OptionValidator }
// vi: se ts=2 sw=2 et:
