# Custom Elements Benchmark
## What and Why?

As the web progress into a modular component based design, custom elements/web components become inseparable part of it.
Many libraries and frameworks offer very strong wrappers around this technology to ease and simplify the process.

This project implement the same custom element with every framework/library, showing the differences.

[Demo](https://custom-elements-benchmark.netlify.com/)

## Future Tasks
* Add unit testing for each element.
* Create elements with other frameworks/lib's (react might be a good place to start).
* Enhance the build process and webpack configuration.

## Contributing
Each element is built in a seperate package inside the `packages` with his own build/test/dev scripts that can be found in the package.json file.

At the root level there is a script that run all the build scripts and collect all the bundled element files to import them at the index.html scripts array at the end of the file.

Adding new elements is the best way to contribute to the project and ofcourse improving existing code (eg. trying to make a bundled file from stencil because at the moment it exports an entire folder).

## License
MIT

## Inspiration
Rob Dodson's great [Custom-Elements-Everywhere](https://custom-elements-everywhere.com/).