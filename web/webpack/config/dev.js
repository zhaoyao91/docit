const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.js');

module.exports = function (env) {
  const config = {
      devServer: {
      historyApiFallback: true
    }
  };

  return webpackMerge(baseConfig(env), config);
};