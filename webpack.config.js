const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        contentBase: __dirname + "/dist",
        port: 3000
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'assets', to: 'assets' }
            ],
        }),
        new HtmlWebpackPlugin({
            title: 'Three.js Webpack Boilerplate',
            template: 'src/index.html'
        })
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
}