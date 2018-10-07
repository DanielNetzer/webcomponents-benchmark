const {
    resolve,
    join
} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const ANGULAR_DIST = './packages/ae-img/dist';
const VANILLA_DIST = './packages/vwc-img/dist';
const VUE_DIST = './packages/vwcw-img/dist';
const STENCIL_DIST = './packages/stencil-img/dist';

const elements = [{
        from: resolve(`${ANGULAR_DIST}/*.{js,map}`),
        to: join(resolve('dist'), 'elements'),
        flatten: true
    },
    {
        from: resolve(`${VANILLA_DIST}/*.{js,map}`),
        to: join(resolve('dist'), 'elements'),
        flatten: true
    },
    {
        from: resolve(`${VUE_DIST}/vwcw-img.min.js`),
        to: join(resolve('dist'), 'elements'),
        flatten: true
    },
    {
        from: resolve(`${STENCIL_DIST}`),
        to: join(resolve('dist'), 'elements')
    }
];

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

module.exports = {
    mode: 'production',
    entry: './index.js',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CopyWebpackPlugin([...polyfills, ...elements]),
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico'
        })
    ]
};