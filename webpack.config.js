let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let webpack = require("webpack");

module.exports = {
    entry: ["./src/a.js"],
    output: {
        filename: "build.[hash:8].js",
        path: path.resolve("./build")
    },
    devServer: {
        contentBase: './build',
        port: 3001,
        compress: true,
        open: true,
        hot: true
    },
    module: {
        rules: [{test: '/\.css$/', use: [{loader: 'style-loader'}, {loader: 'css-loader'}]}]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(
            ['./build']
        ),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                "removeAttributeQuotes": "true",
                "removeComments": "true",
                "removeEmptyAttributes": "true",
                "collapseWhitespace": true
            },
            hash: true
        })
    ],
    resolve: {},
    mode: "development"
};
