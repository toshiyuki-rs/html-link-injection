import path from 'path'
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
   * initialize schema cache
   */
  static initCache() {
    const settings: tjs.PartialArgs = {
      required: true
    }
    const compilerOption: tjs.CompilerOptions = {
      strictNullChecks: true 
    }
    const prog = tjs.getProgramFromFiles(
      [path.resolve(__dirname, './option')],
      compilerOption)
    OptionValidator.schemaCache = tjs.generateSchema(prog, 'Option', settings)
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
}

export { OptionValidator }
// vi: se ts=2 sw=2 et:
