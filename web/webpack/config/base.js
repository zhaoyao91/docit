const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
  return {
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

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Doc It'
      })
    ],

    devtool: 'cheap-module-source-map'
  }
};