const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackChunkHash = require("webpack-chunk-hash");

module.exports = function () {
  return {
    entry: {
      main: './src/index.js',
      vendor: 'moment',
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
        names: ['vendor', 'manifest'],
        minChunks: Infinity,
      }),
      new WebpackChunkHash(),
      new HtmlWebpackPlugin(),
    ],

    devtool: 'cheap-module-source-map'
  };
};