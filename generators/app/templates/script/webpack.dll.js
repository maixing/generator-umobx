/**
 * Created by maixing on 2017/6/12.
 */
const webpack = require('webpack');
const path = require('path');
const outputPath = path.resolve(__dirname, '../dll');
console.log(outputPath);
module.exports = {
    entry: {
        app: [
            'antd',
            'babel-polyfill',
            'bluebird',
            'classnames',
            'date-utils',
            'draft-js',
            'draftjs-to-html',
            'echarts',
            'echarts-for-react',
            'es6-promise',
            'history',
            'html-to-draftjs',
            'intl',
            'js-cookie',
            'lodash',
            'lodash.clonedeep',
            'md5',
            'moment',
            'normalizr',
            'react',
            'react-custom-scrollbars',
            'react-dnd',
            'react-dnd-html5-backend',
            'react-dom',
            'react-draft-wysiwyg',
            'react-intl',
            'react-progress-2',
            'react-resizable',
            'react-resize-observer',
            'react-router',
            'rx',
            'socket.io-client',
        ]
    },

    output: {
        path: path.join(__dirname, '../dll'),
        filename: '[name].js',
        library: '[name]'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../dll/[name]-manifest.json'),
            name: '[name]',
            context:__dirname
        }),
    ],
};