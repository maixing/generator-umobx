/**
 * Created by maixing on 2017/6/12.
 */
let path = require('path');
let webpack = require('webpack');
let merge = require('webpack-merge');
let webpackConfig = require('./webpack.config.js');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const LessThemePlugin = require('webpack-less-theme-plugin');

require("babel-polyfill");//兼容ie9,10配置
module.exports = merge(webpackConfig, {
    devtool: 'false',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash:8].js',
        publicPath: './',
        chunkFilename: '[name].[chunkhash:8].chunk.js'
    },
    entry: {
        app: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config:{
                                    path:  path.resolve(__dirname, './postcss.config.js')
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                use: {
                    loader: 'json-loader'
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config:{
                                    path:  path.resolve(__dirname, './postcss.config.js')
                                }
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config:{
                                    path:  path.resolve(__dirname, './postcss.config.js')
                                }
                            }
                        },
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                use: [{
                    loader: 'file-loader?name=images/img_[hash:8].[ext]' // creates style nodes from JS strings
                },{
                    loader:'image-webpack-loader?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].[chunkhash:8].css'),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     compress: true,
        // }),
        // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
        new ParallelUglifyPlugin({
            // 缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果返回
            // cacheDir 用于配置缓存存放的目录路径
            cacheDir: '.uglify-cache',
            uglifyJS: {
            output: {
                // 最紧凑的输出
                beautify: true,
                // 删除所有的注释
                comments: true,
            },
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: true,
                // 删除所有的 `console` 语句，可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
            }
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        // }),
        // new webpack.optimize.AggressiveMergingPlugin({ moveToParents: true }), // Merge chunks
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            title: 'Ultra-LSVS',
            template: path.resolve(__dirname, '../src/index.html'),
            inject: true,
            favicon:path.resolve(__dirname, '../src/favicon.ico')
        }),
        new LessThemePlugin({ theme: path.resolve(__dirname, '../src/theme.less') }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "commons",
        //     filename: "[name].js",
        // })
    ],
});