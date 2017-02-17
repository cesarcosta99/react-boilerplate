var coreConfig = require('./webpack.core');
var DashboardPlugin = require('webpack-dashboard/plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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

var OptimizeCssAssetsPluginConfig = new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/,
  cssProcessorOptions: {
    discardComments: {
      removeAll: true
    }
  }
});

module.exports = function (env) {
  var plugins = [DashboardPluginConfig];

  if (env === 'dev') {
    plugins = [];
  } else if (env === 'prod') {
    plugins = [
      OptimizeCssAssetsPluginConfig,
      LoaderOptionsPluginConfig,
      DefinePluginConfig,
      UglifyJsPluginConfig
    ];
  }

  return webpackMerge(coreConfig(env), {
    plugins: plugins
  });
};