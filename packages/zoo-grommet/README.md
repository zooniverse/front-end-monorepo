# Zoo Grommet

A Zooniverse theme from the [Grommet](https://grommet.github.io/) React component library.

## How to use

Install the package:

```
npm install --save zoo-grommet
```

And include the CSS file in your project:

```
@import "~zoo-grommet/dist/zoo-grommet.css"
```

Note for webpack users: make sure you have your css-loaders configured and add to the css-loader options: 
```
options: {
  includePaths: [path.resolve(__dirname, 'node_modules/zoo-grommet/dist')]
}
```

Grommet components are imported from the library as normal, e.g.

```
import Box from 'grommet/components/Box';
```

### Publishing to NPM

Run [`npm version`](https://docs.npmjs.com/cli/version) and push to GitHub including tags. New versions will be deployed via [Travis](https://travis-ci.org/zooniverse/zoo-grommet).
