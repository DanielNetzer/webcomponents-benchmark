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

module.exports = {
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin([...polyfills])
    ],
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'dist')
    }
};