var DashboardPlugin = require('webpack-dashboard/plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var DashboardPluginConfig = new DashboardPlugin();

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, 'src/index.html'),
  filename: path.resolve(__dirname, 'index.html'),
  inject: 'body',
  hash: false
});

module.exports = {
  entry: path.resolve(__dirname, 'src/app.jsx'),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
    }
  },
  module: {
    rules: [
      {test: /\.jsx?$/, include: path.resolve(__dirname, 'src'), loader: 'babel-loader', options: {presets: ['es2015', 'react']}}
    ]
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'app.bundle.js'
  },
  plugins: [DashboardPluginConfig, HTMLWebpackPluginConfig],
  devtool: 'cheap-module-eval-source-map',
  target: 'web'
}