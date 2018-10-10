const {
    resolve
} = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

let babelLoader = {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    }
};

module.exports = {
    mode: 'production',
    entry: './vwc-img.js',
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [babelLoader]
    },
    output: {
        filename: 'vwc-img.js',
        path: resolve(__dirname, 'dist')
    }
};