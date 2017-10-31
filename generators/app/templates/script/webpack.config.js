/**
 * Created by maixing on 2017/6/12.
 */
let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
require("babel-polyfill");//兼容ie9,10配置
module.exports = {
    entry: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/,path.resolve(__dirname, "../plugin")],
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=fonts/[name].[ext]' // creates style nodes from JS strings
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, "../resource"), to: path.resolve(__dirname, '../dist/resource') },
        ]),
    ],
};