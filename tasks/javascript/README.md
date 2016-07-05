# JavaScript
> A complete workflow for your JavaScript project

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
- Concat all files
- Desktop notification when finished

### `dist`
```
npm run dist
```
- Watch `*.js` files
- Validate files with ESLint
- Concat all files
- Uglify JavaScript
- Add banner 
- Desktop notification when finished

## Dependencies

- grunt
- grunt-banner
- grunt-contrib-watch
- grunt-contrib-concat
- grunt-contrib-uglify
- grunt-eslint
- grunt-notify