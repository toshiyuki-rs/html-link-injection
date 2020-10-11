import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as linkInjection from '../src/index'
import { createFsFromVolume, Volume } from 'memfs'


/**
 * test environment
 */
class Env3 {


  constructor() {
  }
  
  runWebpack(): Promise<{
    stats: webpack.Stats, 
    volume: typeof Volume
  }> {
    const config: webpack.Configuration  = {
      context: __dirname,
      mode: 'development',
      entry: './data/index.js',
      output: {
        path: __dirname,
        filename: 'bundle.js'
      },
      plugins: [
        new HtmlWebpackPlugin(),
        new linkInjection.HtmlLinkInjection(<linkInjection.Option>{
          link: {
            href: 'main.css',
            rel: 'stylesheet' 
          }
        })
      ]
    }

    const htmlResult = path.join(config.output.path, 'index.html')

    const compiler = webpack(config)
    const volume = new Volume()
    const ofsBase = createFsFromVolume(volume)
    const outputFileSystem: any  = {
      ...ofsBase,
      join: path.join.bind(path)
    } 
    compiler.outputFileSystem = <webpack.OutputFileSystem>outputFileSystem

    const result = new Promise<{ stats: webpack.Stats, 
        volume: typeof Volume }>((resolve, reject) => {
      compiler.run((err: Error, stats: webpack.Stats) => {
        if (err) {
          reject(err)
        } else if (stats.hasErrors()) {
          reject(new Error(stats.toJson().errors[0]))
        } else {
          const vol = <typeof Volume>(<any>volume)
          resolve({ stats, volume: vol })
        }
      })
    })
    return result
  } 
}

// vi: se ts=2 sw=2 et:
export { Env3 }
