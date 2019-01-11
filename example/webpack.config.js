const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = [
    {
        devtool: 'source-map',
        entry: './browser.js',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: "babel-loader"
                }
            ]
        },
        plugins: [
            // new BundleAnalyzerPlugin()
            new HtmlWebpackPlugin({
                hash: true,
                title: 'My Awesome application',
                myPageHeader: 'Hello World',
                template: './index.html',
                path: path.join(__dirname, "./dist/"),
                filename: 'index.html' 
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000,
            // index: 'index.html',
            open: 'Google Chrome'
        }
    }
];

module.exports = config;
