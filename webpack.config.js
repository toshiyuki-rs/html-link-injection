const path = require('path')
const MiniCssExtract = require('mini-css-extract-plugin')
const HtmlWebpack = require('html-webpack-plugin')

const config = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpack(),
    new MiniCssExtract()
  ],
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          MiniCssExtract.loader,
          'css-loader',
          'less-loader'
        ] 
      }
    ]
  }
}
module.exports = config
// vi: se ts=2 sw=2 et:
