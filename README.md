# React Boilerplate
A **super simple** way to start using React.

[![Dependencies Status](https://david-dm.org/cesarcosta99/react-boilerplate/status.svg)](https://david-dm.org/cesarcosta99/react-boilerplate)
[![Code Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com)

## Why use it?
This boilerplate provides the whole tooling you need to start developing a React application: Webpack, Babel and a dev server. It also includes ESLint and Sass. Not convinced? It's **production-ready**!

## Install
    $ git clone https://github.com/cesarcosta99/react-boilerplate
    $ npm install
    $ npm start
> **Tip**: you can use [Yarn](https://yarnpkg.com) to install dependencies faster!

After `npm start` the server will be running at [http://localhost:8080](http://localhost:8080).

## Build
The build results in three main files: `index.html`, `app.bundle.js` and `main.min.css`:

    $ npm run build:prod

Optionally you can run a development build that excludes some plugins for development purposes, like not minifying CSS:
    
    $ npm run build:dev

## Guidelines
Below there are some instructions about the tooling:

#### Styleguide
Since there is Babel in the tooling, ES2015 is supported, and by default, ESLint is checking for [standard](https://github.com/feross/standard) style. You can change this by editing `.eslintrc.js`.

#### Dashboard
You can look for any useful information, like what's happening with your build, when you perform `npm start` since it's running [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard).

#### Sass
Since `sass-loader` it's using [sass/libsass](https://github.com/sass/libsass) and it does not provide [url rewriting](https://github.com/sass/libsass/issues/532), all linked assets must be relative to the output.

## Tooling
- [Webpack2](https://webpack.js.org/)
- [Babel](http://babeljs.io/)
- [ESLint](http://eslint.org/)
- [Sass](http://sass-lang.com/)

## Contributing
I'll love any kind of contribution you can provide, feel free to do it.

## License
Licensed under the [MIT License](https://github.com/cesarcosta99/react-boilerplate/blob/master/LICENSE).
