const path = require("path");
const uglify = require("uglifyjs-webpack-plugin");
const htmlPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        entry: './src/entry.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            }
        ]
    },
    plugins: [
        // new uglify()
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: "./src/index.html"
        })
    ],
    devServer: {
        host: "192.168.0.112",
        port: 4567,
        compress: true,
        contentBase: path.resolve(__dirname, "dist")
    }
}