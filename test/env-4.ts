import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {
  HtmlLinkInjection, 
  Option as LinkInjectionOption } from '../src/index'
import { createFsFromVolume, Volume } from 'memfs'


/**
 * test environment
 */
class Env4 {


  constructor() {
  }
  
  runWebpack(
    entry: string | string[],
    options: LinkInjectionOption): Promise<{
    stats: webpack.Stats, 
    volume: typeof Volume
  }> {
    const inputDir = __dirname
    const outputDir = path.join(__dirname, 'output') 
    const config: webpack.Configuration  = {
      context: inputDir,
      mode: 'development',
      entry,
      output: {
        path: outputDir,
        filename: 'bundle.js'
      },
      plugins: [
        new HtmlWebpackPlugin(
          {
            meta: {
              viewport: 'width-device-width initial-scale=1, shrink-to-fit=no'
            }
          }
        ),
        new HtmlLinkInjection(options),
        new MiniCssExtractPlugin()
      ],
      module: {
        rules: [
          {
            test: /\.css$/,
            use:[ 
              {
                loader: MiniCssExtractPlugin.loader
              },
              'css-loader'
            ] 
          }
        ]
      }
    }
    const htmlResult = path.join(config.output.path, 'index.html')

    const compiler = webpack(config)
    const volume = new Volume()

    const ioFsBase = createFsFromVolume(volume)

    const ioFileSystem: any  = {
      ...ioFsBase,
      join: path.join.bind(path)
    } 
    compiler.outputFileSystem = <webpack.OutputFileSystem>ioFileSystem

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
export { Env4 }
