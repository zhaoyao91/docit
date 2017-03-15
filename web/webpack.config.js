const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const lib = require('./webpack.lib');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: _.assign({
    main: './src/index.js'
  }, lib.getVendorEntries()),

  output: {
    filename: '[chunkhash].[name].js',
    path: path.resolve(__dirname, 'dist/assets'),
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: lib.getVendorEntryKeys().concat('manifest'),
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      title: 'Doc It'
    })
  ],

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-0'],
          plugins: ['syntax-dynamic-import']
        }
      }]
    }]
  },

  devtool: 'cheap-module-source-map'
};