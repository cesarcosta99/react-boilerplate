var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/app.jsx',
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx'],
    alias: {
    }
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ["es2015", "react"]}}
    ]
  },
  output: {
    filename: 'app.bundle.js',
    path: __dirname
  },
  plugins: [HTMLWebpackPluginConfig],
  devtool: 'cheap-module-eval-source-map'
}