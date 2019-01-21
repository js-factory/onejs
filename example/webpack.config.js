const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
    new HtmlWebpackPlugin({
        hash: true,
        title: 'My Awesome application',
        myPageHeader: 'Hello World',
        template: './index.html',
        path: path.join(__dirname, "./dist/"),
        filename: 'index.html'
    })
];

const dServer = process.env.PERF ? {} : {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        // index: 'index.html',
        open: 'Google Chrome'
    }
};

if (process.env.PERF) { plugins.push(new BundleAnalyzerPlugin()); }

const config = [
    {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            main: './browser.js',
            onejs: '../index.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: "babel-loader"
                }
            ]
        },
        plugins: plugins,
        ...dServer
    }
];

module.exports = config;
