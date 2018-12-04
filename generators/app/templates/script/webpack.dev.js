/**
 * Created by maixing on 2017/6/10.
 */
const merge                 = require("webpack-merge");
const path                  = require("path");
const webpack               = require("webpack");
const webpackConfig         = require("./webpack.config.js");
const OpenBrowserPlugin     = require("open-browser-webpack-plugin");
const HtmlWebpackPlugin     = require("html-webpack-plugin");
const portfinder            = require("portfinder");
const LessThemePlugin       = require("webpack-less-theme-plugin");
const FriendlyErrorsPlugin  = require("friendly-errors-webpack-plugin");
const HappyPack             = require("happypack");
const os                    = require("os");
const happyThreadPool       = HappyPack.ThreadPool({ size: os.cpus().length });

require("babel-polyfill"); //兼容ie9,10配置

const devConfig = merge(webpackConfig, {
  devtool: "cheap-eval-source-map",
  mode: 'development',
  performance: {
    hints: false
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
    host: "0.0.0.0",
    port: parseInt(process.env.PORT),
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=js'
      },
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css'
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=less'
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "../node_modules/antd"),
        use: [{
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        },
        {
          loader: "less-loader"
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        use: [{
          loader: "file-loader?name=images/img_[hash:8].[ext]" // creates style nodes from JS strings
        }]
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'happypack/loader?id=font'
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
      production: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DllReferencePlugin({ context: __dirname, manifest: require("../dll/app-manifest.json") }),
    new OpenBrowserPlugin({ url: "http://localhost:" + process.env.PORT}),
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
    new HappyPack({
      id: 'js',
      threads: 4,
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true'
      }],
      threadPool: happyThreadPool,
      verbose:true
    }),
    new HappyPack({
      id: 'css',
      threads: 4,
      loaders: [{
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      }],
      threadPool: happyThreadPool,
      verbose:false
    }),
    new HappyPack({
      id: 'less',
      threads: 4,
      loaders: [{
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "less-loader"
      }],
      threadPool: happyThreadPool,
      verbose:false
    }),
    new HappyPack({
      id: 'image',
      threads: 4,
      loaders: [{
        loader: "file-loader?name=images/img_[hash:8].[ext]" // creates style nodes from JS strings
      }],
      threadPool: happyThreadPool,
      verbose:false
    }),
    new HappyPack({
      id: 'font',
      threads: 4,
      loaders: [{
        loader: 'file-loader?name=fonts/[name].[ext]' // creates style nodes from JS strings
      }],
      threadPool: happyThreadPool,
      verbose:false
    }),
    new LessThemePlugin({ theme: path.resolve(__dirname, "../src/theme.less") })
  ]
});
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = parseInt(process.env.PORT);
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      devConfig.devServer.port = port;
      devConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`程序已经启动，访问地址为: http://localhost:${port}`]
          }
        })
      );
      resolve(devConfig);
    }
  });
});
