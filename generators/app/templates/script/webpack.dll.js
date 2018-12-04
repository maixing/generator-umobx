/**
 * Created by maixing on 2017/6/12.
 */
const webpack       = require('webpack');
const path          = require('path');
const outputPath = path.resolve(__dirname, '../dll');

module.exports = {
    mode: 'development',
    entry: {
        app: [
            'antd',
            'babel-polyfill',
            'classnames',
            'date-utils',
            'echarts',
            'echarts-for-react',
            'es6-promise',
            'history',
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
            'react-intl',
            'react-resize-observer',
            'react-router',
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