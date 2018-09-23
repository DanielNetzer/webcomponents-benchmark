const {
    resolve
} = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


let babelLoader = {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    }
};

module.exports = {
    mode: 'production',
    // devtool: 'inline-source-map',
    entry: './vwc-img.js',
    plugins: [
        new CopyWebpackPlugin([...polyfills]),
        new CleanWebpackPlugin(['dist'])
    ],
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [babelLoader]
    },
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'dist')
    }
};