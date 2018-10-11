const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/ae-img/runtime.js',
    './dist/ae-img/polyfills.js',
    './dist/ae-img/scripts.js',
    './dist/ae-img/main.js'
  ];

  await fs.ensureDir('dist');
  await concat(files, 'dist/ae-img.js');
  await fs.remove('dist/ae-img');
})();
