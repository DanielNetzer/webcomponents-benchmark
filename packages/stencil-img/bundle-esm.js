const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

  await fs.ensureDir('./dist/esm');

  await concat('./dist/esm', './dist/stencil-img.bundle.js');

  console.info('Stencil Elements Created Successfully!');

})()
