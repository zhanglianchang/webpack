let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin(
                {
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }
            ),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    mode: "production",
    entry: ["./src/a.js"],
    output: {
        filename: "bundle.[hash:8].js",
        path: path.resolve(__dirname, "./bundle")
    },
    devServer: {
        contentBase: './bundle',
        port: 2000,
        compress: true,
        open: true,
        // hot: true
    },
    plugins: [
        new CleanWebpackPlugin(
            ['./bundle']
        ),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            // minify: {
            //     "removeAttributeQuotes": "true",
            //     "removeComments": "true",
            //     "removeEmptyAttributes": "true",
            //     "collapseWhitespace": true
            // },
            hash: true
        }),
        new MiniCssExtractPlugin(
            {
                filename: 'main.css'
            }
        )
    ],
    module: {
        rules: [
            {
                test: /.css$/,
                use:
                    [
                        // {
                        //     loader: "style-loader",
                        //     options: {
                        //         insertAt: 'top'
                        //     }
                        // },
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader'
                    ]
            },
            {
                test: /\.less$/,
                use: [
                    // {loader: "style-loader"},
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    resolve: {},

};
