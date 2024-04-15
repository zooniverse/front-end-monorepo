/* eslint-env browser, mocha */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import chai from 'chai'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'

// Creates a global document object using jsdom for RTL rendered components
import { JSDOM } from 'jsdom'

chai.use(dirtyChai)
chai.use(sinonChai)
global.expect = chai.expect

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop))
  Object.defineProperties(target, props)
}

class ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

class IntersectionObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://localhost'
})
const { window } = jsdom

window.IntersectionObserver = IntersectionObserver
window.ResizeObserver = ResizeObserver
window.scrollTo = () => true

global.dom = jsdom
global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
copyProps(window, global)
