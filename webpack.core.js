var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = function (env) {
  var extractSass = new ExtractTextPlugin({
    filename: '[name].min.css',
    disable: env !== 'dev' && env !== 'prod'
  });

  var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    filename: path.resolve(__dirname, 'index.html'),
    inject: 'body',
    hash: (env === 'prod') ? true : false
  });

  return {
    entry: path.resolve(__dirname, 'src/app.jsx'),
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
      }
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src/scss'),
          use: extractSass.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, 'src'),
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
              options: {
                parserOptions: {
                  ecmaVersion: 2015,
                  sourceType: 'module',
                  ecmaFeatures: {
                      jsx: true
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015', 'react']
              }
            }
          ]
        }
      ]
    },
    output: {
      path: path.resolve(__dirname),
      filename: 'app.bundle.js'
    },
    plugins: [HTMLWebpackPluginConfig, extractSass],
    devtool: 'cheap-module-eval-source-map',
    target: 'web'
  };
};