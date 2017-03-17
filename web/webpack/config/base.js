const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');
const commonChunks = require('../common_chunks');

module.exports = function () {
  return {
    entry: _.assign({
      main: './src/index.js',
    }, commonChunks),

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
        names: _.keys(commonChunks),
        minChunks: Infinity,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity,
      }),
      new HtmlWebpackPlugin(),
    ],

    devtool: 'cheap-module-source-map'
  };
};