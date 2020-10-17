path = require('path')
require('mocha')

OptionValidator = require('../dist/umd/option-validator.js').OptionValidator

describe('test for parsing option with javascript.', function() {
  before(function(done) {
    this.timeout(6000)
    // setTimeout(done, 3500)
    OptionValidator.initCache()
    done()
  })
  beforeEach(function (done) {
    done()
  })
  it ('expect parse valid option', function(done) {
    const testData = {
      link: { href: './css' }
    }
    if (OptionValidator.validate(testData) !== void 0) {
      done(0) 
    } else {
      done(new Error('option validation did not work well.'))
    }
  })
  it ('expect not to parse invalid option', function(done) {
    const testData = {
      link: { src: './css' }
    }

    try {
      OptionValidator.validate(testData)
      done(new Error('Option interface definition may be wrong.'))
    } catch (error) {
      done(0) 
    }
  })
  it ('expect parse empty option', function(done) {
    const testData = {
    }

    if (OptionValidator.validate(testData) !== void 0) {
      done(0)
    } else {
      done(new Error('Validator must accept empty option.'))
    }
  })


})

// vi: se ts=2 sw=2 et:
