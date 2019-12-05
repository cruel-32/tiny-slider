const path = require("path");

process.env.NODE_ENV = 'development'

module.exports = {
    entry: "./src/tiny-swiper-react/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname + "/dist"),
        libraryTarget: "umd",
        library:"tinySwiperReact"
    },
    externals : {
        'react' : {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom' : {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
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
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    },
    mode: 'production'
};