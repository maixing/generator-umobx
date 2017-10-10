let express = require('express');
let webpack = require('webpack');
let webpackConfig = require('./script/webpack.dev');
let path = require('path');
let app = express();
let compiler = webpack(webpackConfig);
let WebpackDevServer = require('webpack-dev-server');


app.use(express.static(path.join(__dirname, '/')));
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
        colors: true,
    },
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
}));
app.use(require('webpack-hot-middleware')(compiler));
app.set('port', process.env.PORT || parseInt(process.env.PORT));
app.listen(app.get('port'), function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Port is ' + app.get('port') + ', please wait to build ...');
});
