module.exports = {
    //多入口文件的写法
    entry: {
        bundle1: "./main1.js",
        bundle2: "./main2.js",
    },
    output: {
        filename: "[name].js"
    }
}