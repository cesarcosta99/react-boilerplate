var coreConfig = require('./webpack.core');
var DashboardPlugin = require('webpack-dashboard/plugin');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var DashboardPluginConfig = new DashboardPlugin();

var DefinePluginConfig = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});

var UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true,
    keep_fnames: true
  },
  compress: {
    screw_ie8: true
  },
  comments: false
});

var LoaderOptionsPluginConfig = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false
});

module.exports = function (env) {
  var plugins = [DashboardPluginConfig];

  if (env === 'dev') {
    plugins = [];
  } else if (env === 'prod') {
    plugins = [LoaderOptionsPluginConfig, DefinePluginConfig, UglifyJsPluginConfig];
  }

  return webpackMerge(coreConfig(env), {
    plugins: plugins
  });
};