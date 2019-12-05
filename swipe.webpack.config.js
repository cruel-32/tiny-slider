const path = require("path");

process.env.NODE_ENV = 'production'

module.exports = {
    entry: "./src/tiny-swiper-react/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname + "/dist"),
        libraryTarget: "commonjs-module",
        library:"tsr"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: "/node_modules",
                use: [
                    "babel-loader",
                ]
            },
            {
                test: /\.(sass|scss)$/,
                exclude: "/node_modules",
                use: [
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    },
    mode: 'production'
};