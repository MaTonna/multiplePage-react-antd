const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const files = ["index", "login"];
const htmlPluginArr = [];
// 按照templete.html模板动态生成index.html、login.html
const htdocsPath = "../static";
// const htdocsPath = "../../htdocs/static";
files.forEach(file => {
  htmlPluginArr.push(
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      // favicon: `favicon.ico`,
      template: `./template.html`,
      filename: `${htdocsPath}/${file}.html`,
      chunks: [file]
    })
  );
});
module.exports = {
  entry: {
    index: ["./src/pages/index"],
    login: ["./src/pages/login"],
    common: ["./src/pages/common"],
  },
  output: {
    publicPath: 'http://localhost:9000/',
    path: path.resolve(__dirname, htdocsPath),
    filename: "js/[name].js",
    chunkFilename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        exclude: '/node_modules',
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "less-loader",
            options: {
              importLoaders: 1,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "img/[name].[ext]",
          outputPath: htdocsPath,
          publicPath: "/"
        }
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom",
      PropTypes: "prop-types",
      moment: "moment"
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, htdocsPath),
      manifest: require("./vendor-manifest.json"),
      name: "vendor"
    }),
    ...htmlPluginArr
  ],
  resolve: {
    alias: {
      "@models": path.resolve(__dirname, "../src/models"),
      "@routes": path.resolve(__dirname, "../src/routes"),
      "@components": path.resolve(__dirname, "../src/components"),
      "@styles": path.resolve(__dirname, "../src/styles"),
      "@img": path.resolve(__dirname, "../src/img"),
      "@api": path.resolve(__dirname, "../src/api"),
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@webim": path.resolve(__dirname, "../src/webim"),
      "@utils": path.resolve(__dirname, "../src/utils")
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 3000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 1,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        venders: false,
        default: false
      }
    }
  }
};
