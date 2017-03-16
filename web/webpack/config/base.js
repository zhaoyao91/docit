const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
  return {
    entry: {
      main: ['./src/index.js'],
      core: ['./src/core.js'],
      babel: ['babel-polyfill']
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
        names: ['main', 'core', 'babel', 'manifest'],
      }),
      new HtmlWebpackPlugin()
    ],

    devtool: 'cheap-module-source-map'
  };
};