/**
 * Created by maixing on 2017/6/12.
 */
let path               = require("path");
let webpack            = require("webpack");
let WebpackBar         = require('webpackbar')
let CopyWebpackPlugin  = require("copy-webpack-plugin");

module.exports = {
    entry: {},
    module: {
        rules: [
        ]
    },
    plugins: [
        new WebpackBar({
            minimal: false,
            profile:true,
            name:"任务执行进度"
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, "../resource"), to: path.resolve(__dirname, "../dist/resource") }
        ])
    ]
};
