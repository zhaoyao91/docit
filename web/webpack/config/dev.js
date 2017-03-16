const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const lib = require('../lib.js');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.js');

module.exports = function (env) {
  const config = {
    entry: _.assign({
      main: './src/index.js'
    }, lib.getVendorEntries()),

    output: {
      filename: '[name].js',
      path: path.resolve(process.cwd(), 'dist'),
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: lib.getVendorEntryKeys().concat('manifest'),
      }),
    ],
  };

  return webpackMerge(baseConfig(env), config);
};