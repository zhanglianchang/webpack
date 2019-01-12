let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
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
        })
    ],
    module: {
        rules: [
            {
                test: /.css$/,
                use:
                    [
                        {
                            loader: "style-loader",
                            options: {
                                insertAt: 'top'
                            }
                        },
                        'css-loader'
                    ]
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    resolve: {},

};
