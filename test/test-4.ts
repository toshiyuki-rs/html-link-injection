import path from 'path'
import { Env4 } from './env-4'
import memfs from 'memfs'
import 'mocha'
import {
  Option as LinkInjectionOption,
  InjectionLocation,
} from '../src/index'


function createTestParam1(): {
    option: LinkInjectionOption,
    comparator: (contents: string) => boolean
  }[] {
 
  const linkData = ""
  const result = [
    {
      option: {
        link: {
          href: 'loc-test.css',
          injectionLocation: InjectionLocation.BeforeMeta
        }
      },
      comparator: (contents: string)=> {
        return contents.indexOf('loc-test.css') < contents.indexOf('viewport')
      }
    },
    {
      option: { 
        link: {
          href: 'loc-test.css',
          injectionLocation: InjectionLocation.AfterMeta, 
        }
      },
      comparator: (contents: string)=> {
        return contents.indexOf('loc-test.css') > contents.indexOf('viewport')
      }
    },
    {
      option: {
        link: {
          href: 'loc-test.css',
          injectionLocation: InjectionLocation.BeforeCssHead,
        }
      }, 
      comparator: (contents: string)=> {
        return contents.indexOf('loc-test.css') < contents.indexOf('main.css')
      }
    },
    {
      option: {
        link: {
          href: 'loc-test.css',
          injectionLocation: InjectionLocation.AfterCssHead,
        }
      },
      comparator: (contents: string)=> {
        const idx = contents.indexOf('loc-test.css')
        return idx > contents.indexOf('main.css')
          && idx < contents.indexOf('<body>')
      }
    },
    {
      option: {
        link: {
          href: 'loc-test.css',
          injectionLocation: InjectionLocation.BeforeCssBody,
        }
      },
      comparator: (contents: string)=> {
        const idx = contents.indexOf('loc-test.css')
        return idx > contents.indexOf('main.css')
          && idx > contents.indexOf('<body>')
      }
    },
    {
      option: {
        link: {
          href: 'loc-test.css',
          injectionLocation: InjectionLocation.AfterCssBody, 
        }
      },
      comparator: (contents: string)=> {
        const idx = contents.indexOf('loc-test.css')
        return idx > contents.indexOf('main.css')
          && idx > contents.indexOf('<body>')
      }
    },
    {
      option: {
        line: {
          href: 'loc-test.css',
          injectionLocation: InjectionLocation.BeforeScriptHead,
        }
      },
      comparator: (contents: string)=> {
        const idx = contents.indexOf('loc-test.css')
        return idx < contents.indexOf('bundle.js')
          && idx < contents.indexOf('<body>')
      }
    },
    {
      option: {
        link: {
          href: 'loc-test.css',
          injectionLocation: InjectionLocation.AfterScriptHead,
        }
      },
      comparator: (contents: string)=> {
        const idx = contents.indexOf('loc-test.css')
        return idx < contents.indexOf('/head')
      }

    },
    {
      option: {
        link: {
          href: 'loc-test.css',
          injectionLocation: InjectionLocation.BeforeScriptBody, 
        }
      },
      comparator: (contents: string)=> {
        const idx = contents.indexOf('loc-test.css')
        return idx < contents.indexOf('bundle.js')
      }
    },
    {
      option: {
        link: {
          href: 'loc-test.css',
          injectionLocation: InjectionLocation.AfterScriptBody
        }
      },
      comparator: (contents: string)=> {
        const idx = contents.indexOf('loc-test.css')
        return idx > contents.indexOf('bundle.js')
      }
    }
  ]
  return <any>result 
}



describe('can control insersion location.', function() {
  it ('expect injected link is exists in index.html', async function() {
    const env4 = new Env4()
    
    let testParams:{
      option: LinkInjectionOption,
      comparator: (
        contents: string) => boolean
    }[] = createTestParam1()  
 
    testParams.forEach(async (param, idx) => {
      const promise = env4.runWebpack('./data/4/index-0.js', param.option)
      const res = await promise 
      if (res.stats.hasErrors()) {
        throw new Error(`${idx} - ${res.stats.toString()}`)
      } else {
        const htmlPath = res.stats.compilation.assets['index.html'].existsAt
        const contents = (<any>res.volume).readFileSync(htmlPath, 'utf8')
        if (!param.comparator(contents)) { 
          throw new Error(
            `${idx} - plugin did not inject link tag into intended location.`)
        }
      }
    })
  })
})


// vi: se ts=2 sw=2 et:
