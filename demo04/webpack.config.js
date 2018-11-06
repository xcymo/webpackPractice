const path = require("path");
const uglify = require("uglifyjs-webpack-plugin");
const htmlPlugin = require("html-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const glob = require("glob"); // 扫描文件
const purifycssPlugin = require("purifycss-webpack");

var myIP = "192.168.2.180"
var website = {
    publicPath: "http://" + myIP + ":4567/"
}
module.exports = {
    entry: {
        entry: './src/entry.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        publicPath: website.publicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ['style-css', 'css-loader', 'postcss-loader']
                use: extractTextPlugin.extract({
                    fallback: "style-loader",//此项配置是为了预防use中的loader出错而准备的后路，若出错，则使用此项loader
                    // use: "css-loader!postcss-loader"
                    use: [{
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                        "postcss-loader"
                    ]
                })
            }, {
                test: /\.(png|jpg|gif|jpeg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        outputPath: "images/" //配置生成图片的文件夹
                    }
                }]
            }, {
                test: /\.(htm|html)$/i,
                use: ["html-withimg-loader"]//配置html中img路径
            }, {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'less-loader']
                })
            }, {
                test: /\.(jsx|js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // new uglify(),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: "./src/index.html"
        }),
        new extractTextPlugin("css/xcy.css"),  //分离css配置
        new purifycssPlugin({                   //去除无用的css
            paths: glob.sync(path.join(__dirname, "src/*.html"))
        })
    ],
    devServer: {
        host: myIP,
        port: 4567,
        compress: true,
        contentBase: path.resolve(__dirname, "dist")
    }
}