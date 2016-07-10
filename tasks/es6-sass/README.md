# JavaScript
> A complete workflow for your ES6 and SASS project

## Installation

```
npm install
```

Set up your environment by editing variables inside `Gruntfile.js` file  (inputs/outputs)

> You can configure ESLint by editing `eslint.json` file

## Tasks

### `dev`
```
npm run dev
```
- Watch `*.js` and `*.scss` files
- Parse previously generated `css` file and add vendor-prefixed CSS properties using the Can I Use database
- Validate `.js` files with ESLint
- Transpile `.js` files with Babel
- Desktop notification when finished

### `dist`
```
npm run dist
```
- Compile `*.scss` files
- Parse previously generated `css` file and add vendor-prefixed CSS properties using the Can I Use database
- Validate `.js` files with ESLint
- Transpile `.js` files with Babel
- Uglify JavaScript and CSS
- Add banner 
- Desktop notification when finished

## Dependencies

- babel-plugin-transform-es2015-object-super
- babel-preset-es2015
- babel-preset-stage-0
- babelify
- grunt-autoprefixer
- grunt-contrib-cssmin
- grunt-contrib-sass
- grunt
- grunt-banner
- grunt-browserify
- grunt-contrib-uglify
- grunt-contrib-watch
- grunt-eslint
- grunt-notify
- load-grunt-tasks
- grunt-concurrent