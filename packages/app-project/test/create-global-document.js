// Creates a global document object using jsdom to allow the use of the
// `mount` method in enzyme.
import { JSDOM } from 'jsdom'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://localhost' })
const { window } = jsdom

function copyProps (src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop)
    }), {})
  Object.defineProperties(target, props)
}

class ResizeObserver {
    disconnect() {
      // do nothing
    }
    observe() {
        // do nothing
    }
    unobserve() {
        // do nothing
    }
}

window.ResizeObserver = ResizeObserver

global.dom = jsdom
global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}

copyProps(window, global)
