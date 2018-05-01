const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: '[name].js',
    path: __dirname + '/lib',
    library: 'react-tree',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: true
        }
      },
      sourceMap: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
