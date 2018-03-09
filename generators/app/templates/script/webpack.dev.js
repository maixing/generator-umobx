/**
 * Created by maixing on 2017/6/10.
 */
let path = require('path');
let webpack = require('webpack');
let merge = require('webpack-merge');
let webpackConfig = require('./webpack.config.js');
let OpenBrowserPlugin = require('open-browser-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// let Jarvis = require('webpack-jarvis');
const LessThemePlugin = require('webpack-less-theme-plugin');

var fs = require('fs')
const pkgPath = path.resolve(__dirname, '../package.json')
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {}
module.exports = merge(webpackConfig, {
    devtool: 'cheap-source-map', // inline-source-map.cheap-source-map
    performance: { // 关闭hot更新导致文件过大提示
        hints: false // 性能提示[warning,error,false]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'app.js',
        publicPath: '',
    },
    entry: {
        app: ['babel-polyfill', 'webpack-hot-middleware/client?reload=true?http://localhost:' + process.env.PORT, path.resolve(__dirname, '../src/index.js')]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, '../node_modules/antd'),
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                use: [{
                    loader: 'file-loader?name=images/img_[hash:8].[ext]' // creates style nodes from JS strings
                }]
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../src'), __dirname],
        extensions: ['.js', '.json', '.jsx', '.css', '.less', '.scss'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('5fa3b9'),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: '1+1',
            'typeof window': JSON.stringify('object')
        }),
        new webpack.NamedModulesPlugin(),
        //dll配置
        new webpack.DllReferencePlugin({ context: __dirname, manifest: require('../dll/app-manifest.json') }),
        new OpenBrowserPlugin({ url: 'http://localhost:' + process.env.PORT.toString() }),
        new HtmlWebpackPlugin({
            title: 'ultra-react-webpack2-study',
            template: path.resolve(__dirname, '../src/_index.html'),
            favicon: path.resolve(__dirname, '../src/favicon.ico'),
            inject: false,
            minify: {
                html5: true,
                collapseWhitespace: true,
                removeComments: true,
                removeTagWhitespace: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
            },
        }),
        new LessThemePlugin({ theme: path.resolve(__dirname, '../src/theme.less') }),
        // new Jarvis({
        //     port: 1337 // optional: set a port
        // })
    ],
});