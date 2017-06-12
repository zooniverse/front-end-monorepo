# Zoo Grommet

A wrapper for the Grommet React library, incorporating a Zooniverse theme.

## How to use

Install the package:

```
npm install --save zoo-grommet
```

And include the stylus file in your project:

```
@import node_modules/zoo-grommet/stylus/zooniverse
```

## How does it work?

The zoo-grommet package exposes the main `index.js` file from `grommet`, which is required in as a dependency. It also includes a script to convert the existing SCSS from Grommet to Stylus, as used by Panoptes-Front-End and other Zoo projects.

## Contributing

### Working with the Stylus files

Grommet's original style sheets were written in SCSS. Since the Zooniverse primarily uses Stylus, there's a bash script that will take those SCSS files from `node_modules/grommet/scss/grommet-core` and convert them to Stylus. 

These might change as Grommet gets updated, so they may need to be updated. Running the `bin/convert-sass.sh` script will do the conversion again, and output them into the `stylus/grommet-core` directory. The conversion script uses sass2stylus.com, so it won't work without an Internet connection.

### Publishing to NPM

Tagging a commit with a version number will make Travis redeploy it to NPM automagically.
