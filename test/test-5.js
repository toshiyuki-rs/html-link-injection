path = require('path')
Env5 = require('./env-5')
require('mocha')

describe('can dist-package work well-1.', function() {
  it ('expect webpack return no error', async function() {
    const env = new Env5()
    const promise = env.runWebpack()
    const res = await promise 
    if (res.stats.hasErrors()) {
      throw new Error(res.stats.toString())
    }
  })
})

describe('can dist-package work well-2.', function() {
  it ('expect injected link is exists in index.html', async function() {
    const env = new Env5()
    const promise = env.runWebpack()
    const res = await promise 
    if (res.stats.hasErrors()) {
      throw new Error(res.stats.toString())
    } else {
      const htmlPath = res.stats.compilation.assets['index.html'].existsAt
      const contents = res.volume.readFileSync(htmlPath, 'utf8')
    }
  })
})


// vi: se ts=2 sw=2 et:
