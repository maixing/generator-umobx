/**
 * Created by maixing on 2017/6/10.
 */
const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

const webpackConfig = require("./webpack.config.js");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const portfinder = require("portfinder");
const LessThemePlugin = require("webpack-less-theme-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");


const devConfig = merge(webpackConfig, {
  devtool: "cheap-source-map", // inline-source-map.cheap-source-map
  performance: {
    hints: false // 性能提示[warning,error,false]
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "app.js",
    publicPath: ""
  },
  entry: {
    app: ["babel-polyfill", path.resolve(__dirname, "../src/index.js")]
  },
  devServer: {
    clientLogLevel: "warning",
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: "localhost",
    port: process.env.PORT,
    open: false,
    overlay: { warnings: false, errors: true },
    publicPath: "",
    quiet: true
  },
  node: {
    setImmediate: false,
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "../node_modules/antd"),
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        use: [
          {
            loader: "file-loader?name=images/img_[hash:8].[ext]" // creates style nodes from JS strings
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "../node_modules"), path.resolve(__dirname, "../src"), __dirname],
    extensions: [".js", ".json", ".jsx", ".css", ".less", ".scss"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify("5fa3b9"),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: "1+1",
      "typeof window": JSON.stringify("object")
    }),
    new webpack.NamedModulesPlugin(),
    //dll配置
    new webpack.DllReferencePlugin({ context: __dirname, manifest: require("../dll/app-manifest.json") }),
    new OpenBrowserPlugin({ url: "http://localhost:" + process.env.PORT.toString() }),
    new HtmlWebpackPlugin({
      title: "ultra-react-webpack2-study",
      template: path.resolve(__dirname, "../src/_index.html"),
      favicon: path.resolve(__dirname, "../src/favicon.ico"),
      inject: false,
      minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new LessThemePlugin({ theme: path.resolve(__dirname, "../src/theme.less") })
  ]
});
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      devConfig.devServer.port = port;
      devConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`程序已经启动，访问地址为: http://localhost::${port}`]
          }
        })
      );
      resolve(devConfig);
    }
  });
});
