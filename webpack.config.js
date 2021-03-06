var path = require('path');

var DashboardPlugin = require('webpack-dashboard/plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractText = require('extract-text-webpack-plugin');
var HTMLWebpack = require('html-webpack-plugin');
var webpack = require('webpack');

var isProd = process.env.NODE_ENV === 'production';

var DashboardConfig = new DashboardPlugin();

var UglifyJsConfig = new webpack.optimize.UglifyJsPlugin({
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

var OptimizeCssAssetsConfig = new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/,
  cssProcessorOptions: {
    discardComments: {
      removeAll: true
    }
  }
});

var ExtractTextConfig = new ExtractText({
  filename: '[name].min.css',
  disable: !isProd
});

var HTMLConfig = new HTMLWebpack({
  template: path.resolve(__dirname, 'src/index.html'),
  filename: path.resolve(__dirname, 'index.html'),
  inject: 'body',
  hash: isProd
});

var FetchConfig = new webpack.ProvidePlugin({
  'window.fetch': 'exports?self.fetch!whatwg-fetch'
});

var plugins = [HTMLConfig, ExtractTextConfig, FetchConfig];
if (isProd) {
  plugins = plugins.concat([
    OptimizeCssAssetsConfig,
    LoaderOptionsPluginConfig,
    UglifyJsConfig
  ]);
} else {
  plugins.push(DashboardConfig);
}

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/app.jsx')
  ],
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
        use: ExtractTextConfig.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'public/'
          }
        }]
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            parserOptions: {
              ecmaVersion: 2017,
              sourceType: 'module',
              ecmaFeatures: {
                jsx: true
              }
            }
          }
        }]
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: ['transform-async-to-generator']
          }
        }]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'app.bundle.js'
  },
  plugins: plugins,
  devtool: isProd ? undefined : 'cheap-module-eval-source-map',
  target: 'web',
  devServer: {
    historyApiFallback: true,
    host: 'localhost',
    port: 8080
  }
};
