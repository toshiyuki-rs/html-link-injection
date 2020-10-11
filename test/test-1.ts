import path from 'path'
import { Env1 } from './env-1'
import memfs from 'memfs'
import 'mocha'

describe('can html-webpack-plugin recognize html-link-injection.', function() {
  it ('expect webpack return no error', async function() {
    const env1 = new Env1()
    const promise = env1.runWebpack()
    const res = await promise 
    if (res.stats.hasErrors()) {
      throw new Error(res.stats.toString())
    }
  })
})

describe('can html-link-injection work well.', function() {
  it ('expect injected link is exists in index.html', async function() {
    const env1 = new Env1()
    const promise = env1.runWebpack()
    const res = await promise 
    if (res.stats.hasErrors()) {
      throw new Error(res.stats.toString())
    } else {
      const htmlPath = res.stats.compilation.assets['index.html'].existsAt
      const contents = (<any>res.volume).readFileSync(htmlPath, 'utf8')
      // console.log(contents)
    }
  })
})


// vi: se ts=2 sw=2 et:
