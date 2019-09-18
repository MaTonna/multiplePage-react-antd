const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');

// 多入口配置
const jsFileMap = {};

glob.sync('**/*.[jt]s?(x)', {
  cwd: path.join(__dirname, '../src/pages')
}).forEach((item) => {
  const finename = item.replace(/\.[tj]sx?$/, '')
  jsFileMap[finename] = `./src/pages/${finename}`;
});
const htdocsSrc = path.join(__dirname, '../static');
// path.join(__dirname, '../../htdocs/static'),
module.exports = {
  entry: jsFileMap,
  output: {
    path: htdocsSrc,
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'happypack/loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name].[ext]',
          outputPath: '../static/',
          publicPath: '/'
        }
      }
    ]
  },
  node: {
    fs: "empty"
  },
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, '../src/models'),
      '@routes': path.resolve(__dirname, '../src/routes'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@services': path.resolve(__dirname, '../src/services'),
      '@layouts': path.resolve(__dirname, '../src/layouts'),
      '@img': path.resolve(__dirname, '../src/img'),
      '@modals': path.resolve(__dirname, '../src/modals')
    },
    extensions: ['.jsx', '.tsx', '.js', '.ts']
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      PropTypes: 'prop-types',
      dva: 'dva',
      moment: 'moment'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../libs'),
        to: htdocsSrc
      },
    ]),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '../'),
      manifest: require('./vendor-manifest.json'),
      name: 'vendor'
    }),
    new ProgressBarPlugin(),
    new HappyPack({
      loaders: ['babel-loader?cacheDirectory=false']
    })
  ]
};
