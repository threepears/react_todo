var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry:  [
            'webpack-dev-server/client?http://127.0.0.1:8080/',
            'webpack/hot/only-dev-server',
            './app'
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'app'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
