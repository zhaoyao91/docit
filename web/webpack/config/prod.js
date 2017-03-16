const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.js');

module.exports = function (env) {
  const config = {
    plugins: [
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