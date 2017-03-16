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
      filename: '[chunkhash].[name].js',
      path: path.resolve(process.cwd(), 'dist'),
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: lib.getVendorEntryKeys().concat('manifest'),
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        sourceMap: true,
      })
    ],
  };

  return webpackMerge(baseConfig(env), config);
};