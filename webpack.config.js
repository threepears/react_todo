var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry:  [
            'webpack-dev-server/client?http://127.0.0.1:3000/',
            'webpack/hot/only-dev-server',
            './public/app'
    ],
    output: {
        path: './public',
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'app'],
        extensions: ['', '.css', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'public'),
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
