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
const STENCIL_DIST = './packages/stencil-img/www';
const POLYMER_DIST = './packages/lit-img/dist';
const SVELTE_DIST = './packages/svelte-img/public';

const elements = [{
        from: resolve(`${ANGULAR_DIST}/*.{js,map}`),
        to: join(resolve('docs'), 'elements'),
        flatten: true
    },
    {
        from: resolve(`${VANILLA_DIST}/*.{js,map}`),
        to: join(resolve('docs'), 'elements'),
        flatten: true
    },
    {
        from: resolve(`${VUE_DIST}/vwcw-img.min.js`),
        to: join(resolve('docs'), 'elements'),
        flatten: true
    },
    {
        from: resolve(`${STENCIL_DIST}/build`),
        to: join(resolve('docs'), 'elements/stencil')
    },
    {
        from: resolve(`${POLYMER_DIST}/lit-img.js`),
        to: join(resolve('docs'), 'elements'),
        flatten: true
    }, {
        from: resolve(`${SVELTE_DIST}/svelte-img.js`),
        to: join(resolve('docs'), 'elements'),
        flatten: true
    }
];

const polyfills = [{
        from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
        to: join(resolve('docs'), 'vendor'),
        flatten: true
    },
    {
        from: resolve(`${webcomponentsjs}/bundles/*.{js,map}`),
        to: join(resolve('docs'), 'vendor', 'bundles'),
        flatten: true
    },
    {
        from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
        to: join(resolve('docs'), 'vendor'),
        flatten: true
    }
];

const style = {
    from: resolve('./styles.css'),
    to: join(resolve('docs'))
}

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: __dirname + '/docs'
    },
    devServer: {
        contentBase: './docs'
    },
    plugins: [
        new CopyWebpackPlugin([...polyfills, ...elements, style]),
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico'
        })
    ]
};