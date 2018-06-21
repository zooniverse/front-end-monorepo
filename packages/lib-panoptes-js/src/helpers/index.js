// Borrowed from https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser top answer
// Testing if in browser or node environments

// eslint-disable-next-line no-new-func
const isBrowser = new Function('try {return this===window;}catch(e){ return false;}')

// eslint-disable-next-line no-new-func
const isNode = new Function('try {return this===global;}catch(e){return false;}')

module.exports = { isBrowser, isNode }
