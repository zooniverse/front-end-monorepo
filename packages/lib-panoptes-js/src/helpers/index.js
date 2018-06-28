// Borrowed from https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser top answer
// Testing if in browser or node environments

const isBrowser = new Function('try {return this===window;}catch(e){ return false;}')

const isNode = new Function('try {return this===global;}catch(e){return false;}')

module.exports = { isBrowser, isNode }
