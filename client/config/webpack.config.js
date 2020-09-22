const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle.js',
    },
    resolve: {
        modules: [path.join(__dirname, '../', 'src'), 'node_modules', path.join(__dirname, '../', 'assets/img')],
        alias: {
            react: path.join(__dirname, '../', 'node_modules', 'react'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.(svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: 'images/[hash]-[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 25000,
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, '../', 'src/index.html'),
        }),
    ],
    devServer: {
        historyApiFallback: true
    }
};
