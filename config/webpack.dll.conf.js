const path = require('path')
const webpack = require('webpack')
const htdocsPath = '../static';
module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'prop-types',
      'moment',
    ]
  },
  output: {
    path: path.resolve(__dirname, `${htdocsPath}/libs`),
    filename: '[name].dll.js',
    library: '[name]'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, '../')
    })
  ]
};
