const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
  return {
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }]
    },

    plugins: [
      new HtmlWebpackPlugin()
    ],

    devtool: 'cheap-module-source-map'
  }
};