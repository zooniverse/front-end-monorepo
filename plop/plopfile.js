const appGenerator = require('./generators/app')
const componentGenerator = require('./generators/component')

module.exports = function (plop) {
  plop.addHelper('cwd', p => process.cwd())
  plop.setGenerator('Component', componentGenerator(plop))
  plop.setGenerator('App', appGenerator(plop))
}
