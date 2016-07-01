# complete-sass-workflow
> A complete workflow for your SASS project

## Installation

```
npm install
```

## Tasks

### `dev`
```
npm run dev
```
- Watch `*.scss` files and compile them to `./public/css/styles.css`
- Parse previously generated file and add vendor-prefixed CSS properties using the Can I Use database
- Desktop notification when finished

### `dist`
```
npm run dist
```
- Compile `*.scss` file to `./public/css/styles.css`
- Parse previously generated file and add vendor-prefixed CSS properties using the Can I Use database
- Minify `styles.css` to `styles.min.css`
- Add banner 
- Desktop notification when finished

## Dependencies

- grunt
- grunt-autoprefixer
- grunt-banner
- grunt-contrib-cssmin
- grunt-contrib-sass
- grunt-contrib-watch
- grunt-notify