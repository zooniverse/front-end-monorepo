import chai from 'chai'
import sinonChai from 'sinon-chai'
import dirtyChai from 'dirty-chai'
import { JSDOM } from 'jsdom'
import nock from 'nock'

chai.use(dirtyChai)
chai.use(sinonChai)
global.expect = chai.expect

nock.disableNetConnect()

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.org/' })
const { window } = jsdom

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop))
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
window.scrollTo = () => true

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
copyProps(window, global)
