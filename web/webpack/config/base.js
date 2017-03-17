const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function () {
  return {
    entry: {
      main: './src/index.js',
    },

    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: '[chunkhash].[name].js',
      chunkFilename: '[chunkhash].[name].js',
    },

    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          return module.context && module.context.indexOf('node_modules') !== -1
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity,
      }),
      new HtmlWebpackPlugin(),
    ],

    devtool: 'cheap-module-source-map'
  }
}