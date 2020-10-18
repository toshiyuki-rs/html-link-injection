# To inject link element into html template

This is a plugin for html-webpack-plugin. The plugin insert html link tag into
a html which html-webpack-plugin uses. 

## Configuration

Here is webpack.config.js
``` javascript
const htmlLinkInjection = require('html-link-injection')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// I use to load some css files in webpack config entries.
// You don't have to import this if you use just the 'html-link-injection'.
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  context: __dirname,
  mode: 'development',
  entry: [
    './data/index.js',
    './data/index.css'
    // this entry is processed by html-webpack-plugin and mini-extract-plugin.
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new htmlLinkInjection.HtmlLinkInjection({
      link: {
        href: 'main.css'
        // this is processed by html-link-injection.
      }
    })
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

module.export = config
```

This is the conten of 'index.html' which is genenrated by html-webpack-plugin.

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  <meta name="viewport" content="width-device-width initial-scale=1, shrink-to-fit=no"><link href="index.css" rel="stylesheet"><link href="main.css"></head>
  <body>
  <script src="bundle.js"></script></body>
</html>
```
<!-- vi: se ts=2 sw=2 et: -->
