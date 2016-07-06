# JavaScript
> A complete workflow for your ES6 project

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
- Watch `*.js` files
- Validate files with ESLint
- Transpile with Babel
- Desktop notification when finished

### `dist`
```
npm run dist
```
- Watch `*.js` files
- Validate files with ESLint
- Transpile with Babel
- Uglify JavaScript
- Add banner 
- Desktop notification when finished

## Dependencies

- babel-plugin-transform-es2015-object-super
- babel-preset-es2015
- babel-preset-stage-0
- babelify
- grunt
- grunt-banner
- grunt-browserify
- grunt-contrib-uglify
- grunt-contrib-watch
- grunt-eslint
- grunt-notify
- load-grunt-tasks