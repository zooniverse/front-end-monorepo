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

Version numbers are linked the Grommet version number. To reconvert the Grommet style files, run the `bin/convert-sass.sh` script, which will then convert the `grommet-core` files into the `stylus/grommet-core` directory.

Note that the conversion script uses an online conversion service, and won't work without an Internet connection.
