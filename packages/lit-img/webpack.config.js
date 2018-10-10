const {
    resolve
} = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

let babelLoader = {
    test: /\.js$/,
    exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-html|@polymer)\/).*/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    }
};

module.exports = {
    mode: 'production',
    entry: './lit-img.js',
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
        filename: 'lit-img.js',
        path: resolve(__dirname, 'dist')
    }
};