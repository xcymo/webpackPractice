const extractTextPlugin = require("extract-text-webpack-plugin");
const module_ = {
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
}

module.exports = module_;