const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

let babelLoader = {
    test: /\.js$/,
    exclude: /node_modules\/(?!(@polymer)\/).*/,
    use: {
        loader: "babel-loader",
        options: {
            babelrc: true,
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        targets: {
                            ie: 11
                        }
                    }
                ]
            ],
            plugins: [
                [
                    "@babel/plugin-transform-runtime",
                    {
                        corejs: false,
                        helpers: false,
                        regenerator: true,
                        useESModules: false
                    }
                ]
            ]
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
        path: path.resolve(__dirname, 'dist')
    }
};