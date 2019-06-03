# @zooniverse/standard

[Standard](https://github.com/feross/standard) linter, customized for the Zooniverse.

This is a fork of Standard with the following changes:

- ES support
- Accessibility checking on JSX elements

## Install

```bash
$ npm install @zooniverse/standard
```

### Global Install

You _can_ install this package globally, but you'll also need to add its dependencies:

```bash
$ npm install -g @zooniverse/standard babel-eslint eslint-plugin-jsx-a11y
```

## Usage

The best way to use this is to firstly add it to your project:

```bash
$ npm install --save-dev @zooniverse/standard
```

Then, add it to the `scripts` block in your `package.json`:

```json
{
  "scripts": {
    "lint": "zoo-standard"
  }
}
```

## License

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).
