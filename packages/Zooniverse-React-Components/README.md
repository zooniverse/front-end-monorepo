Zooniverse-React-Components
===========================

Build works against Node 8 and NPM 5.

What the repo name says

`npm i` to install dependencies

Components should be added to the `src/components` folder and an export to `src/index.js`

Any default styles can be added as a stylus file in `src/css`.

`npm version [semver new version]` will run helper preversion and postversion scripts. `preversion` will run the tests. `version` will run `npm run build` which will build the production css and js. `postversion` will push the updated repo and the updated git tag to github.

For now, we will git tag and install via github. 

`npm test` to run mocha tests

## Contributing

If you're using `npm link` to test the library with your app, then you may need to adjust your webpack configuration for compiling of your javascript files in development. Webpack docs do provide a cautionary note about using symlink packages with Webpack: https://webpack.js.org/configuration/module/#rule-conditions. An example webpack configuration:

```
{
  test: /\.jsx?$/,
  include: path.resolve(__dirname, 'src'),
  exclude: path.resolve(__dirname, 'node_modules'),
  use: [
    'babel-loader'
    // 'eslint-loader' uncomment if you want to use eslint while compiling
  ]
}
```
