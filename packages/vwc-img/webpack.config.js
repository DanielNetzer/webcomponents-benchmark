const {
    resolve,
    join
} = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [{
        from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
        to: join(resolve('dist'), 'vendor'),
        flatten: true
    },
    {
        from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
        to: join(resolve('dist'), 'vendor', 'bundles'),
        flatten: true
    },
    {
        from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
        to: join(resolve('dist'), 'vendor'),
        flatten: true
    }
];

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
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico'
        })
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