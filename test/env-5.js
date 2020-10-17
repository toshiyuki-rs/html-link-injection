path = require('path')
webpack = require('webpack')
HtmlWebpackPlugin = require('html-webpack-plugin')

HtmlLinkInjection = require('../dist/umd/index').HtmlLinkInjection
memfs = require('memfs')

/**
 * test environment
 */
class Env5 {


  constructor() {
  }
  
  runWebpack() {
    const config = {
      context: __dirname,
      mode: 'development',
      entry: './data/index.js',
      output: {
        path: __dirname,
        filename: 'bundle.js'
      },
      plugins: [
        new HtmlWebpackPlugin(),
        new HtmlLinkInjection()
      ]
    }

    const htmlResult = path.join(config.output.path, 'index.html')

    const compiler = webpack(config)
    const volume = new memfs.Volume()
    const ofsBase = memfs.createFsFromVolume(volume)
    const outputFileSystem  = {
      ...ofsBase,
      join: path.join.bind(path)
    } 
    compiler.outputFileSystem = outputFileSystem

    const result = new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          reject(err)
        } else if (stats.hasErrors()) {
          reject(new Error(stats.toJson().errors[0]))
        } else {
          const vol = volume
          resolve({ stats, volume: vol })
        }
      })
    })
    return result
  } 
}

// vi: se ts=2 sw=2 et:
module.exports = Env5 
