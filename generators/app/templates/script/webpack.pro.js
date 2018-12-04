/**
 * Created by maixing on 2017/6/12.
 */
let path                    = require("path");
let webpack                 = require("webpack");
let merge                   = require("webpack-merge");
let webpackConfig           = require("./webpack.config.js");
let HtmlWebpackPlugin       = require("html-webpack-plugin");
let BundleAnalyzerPlugin    = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
let ParallelUglifyPlugin    = require("webpack-parallel-uglify-plugin");
let MiniCssExtractPlugin    = require("mini-css-extract-plugin");
let OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let UglifyJsPlugin          = require("uglifyjs-webpack-plugin");
let serverConfig            = require("../resource/serverconfig/server.json");
let themeConfig             = require("../src/theme.js");
let modulConfig             = require("../src/app/Modul.js");
let theme                   = themeConfig();

require("babel-polyfill");

theme["@icon-url"] = `"${serverConfig.pro.serverBaseUrl + serverConfig.pro.context + serverConfig.fonts}"`;

let proConfig = {
    devtool: false,
    mode: "production",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].[chunkhash:8].js",
        publicPath: "./",
        chunkFilename: "chunk/[name].[chunkhash:8].chunk.js"
    },
    entry: {
    },
    resolve: {
        modules: [path.resolve(__dirname, "../node_modules"), path.resolve(__dirname, "../src"), __dirname],
        extensions: [".js", ".json", ".jsx", ".css", ".less", ".scss"]
    },
    node: {
        process: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.resolve(__dirname, "./postcss.config.js")
                            }
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                type: "javascript/auto",
                exclude: /node_modules/,
                use: {
                    loader: "json-loader"
                }
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, "../node_modules/antd"),
                include: [
                    path.resolve(__dirname, "../node_modules/antd"),
                    path.resolve(__dirname, "../src")
                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.resolve(__dirname, "./postcss.config.js")
                            }
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: theme
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                type: "javascript/auto",
                use: [
                    {
                        loader: "file-loader?name=images/img_[hash:8].[ext]" // creates style nodes from JS strings
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            gifsicle: { interlaced: false },
                            optipng: { optimizationLevel: 7 },
                            pngquant: { quality: "65-90", speed: 4 },
                            mozjpeg: { progressive: true, quality: 65 },
                            webp: { quality: 75 },
                            disable: true
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader?name=fonts/[name].[ext]' // creates style nodes from JS strings
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            name: "vender",
            minSize: 10,
            minChunks: 5,
            cacheGroups: {
                common: {
                    name: "common",
                    chunks: "all",
                    minChunks: 4,
                    reuseExistingChunk: true,
                    enforce: true
                },
                antd: {
                    name: "antd",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/antd]/,
                    minChunks: 3,
                    reuseExistingChunk: true,
                    enforce: true
                },
                echarts: {
                    name: "echarts",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/echarts]/,
                    minChunks: 3,
                    reuseExistingChunk: true,
                    enforce: true
                },
                styles: {
                    name: "styles",
                    test: /(\.less|\.css)$/,
                    chunks: "all",
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                parallel: 10,
                uglifyOptions: {
                    ie8: true,
                    warnings: true,
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        drop_console: false,
                        passes: 2
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        minimize: true,
        mangleWasmImports: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[name].[chunkhash:8].css"
        }),
        new webpack.DefinePlugin({
            production: true
        })
    ]
};
modulConfig.map((item, index) => {
    proConfig.entry[item.entry] = ["babel-polyfill", path.resolve(__dirname, "../src/app/" + item.entry + "Entry.js")];
    proConfig.plugins.push(
        new HtmlWebpackPlugin({
            title: item.title,
            template: path.resolve(__dirname, "../src/app/view/" + item.view + ".html"),
            filename: "../dist/" + item.view + ".html",
            inject: true,
            chunks: [item.view, "vender", "commons"],
            chunksSortMode: "auto",
            favicon: path.resolve(__dirname, "../src/favicon.ico"),
            minify: {
                removeAttributeQuotes: true
            }
        })
    );
});
module.exports = merge(webpackConfig, proConfig);
