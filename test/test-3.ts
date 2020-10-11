import path from 'path'
import { Env3 } from './env-3'
import memfs from 'memfs'
import 'mocha'

describe('can html-link-injection work well.', function() {
  it ('expect injected link is exists in index.html', async function() {
    const env3 = new Env3()
    const promise = env3.runWebpack()
    const res = await promise 
    if (res.stats.hasErrors()) {
      throw new Error(res.stats.toString())
    } else {
      const htmlPath = res.stats.compilation.assets['index.html'].existsAt
      const contents = (<any>res.volume).readFileSync(htmlPath, 'utf8')
      if (contents.indexOf('main.css') == -1) {
        throw new Error('plugin did not inject link tag.')
      }
    }
  })
})


// vi: se ts=2 sw=2 et:
