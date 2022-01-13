import chai from 'chai'
import chaiDom from 'chai-dom'
import sinonChai from 'sinon-chai'
import dirtyChai from 'dirty-chai'
import { JSDOM } from 'jsdom'

chai.use(chaiDom)
chai.use(dirtyChai)
chai.use(sinonChai)

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  pretendToBeVisual: true, // See: https://github.com/jsdom/jsdom#pretending-to-be-a-visual-browser
  url: 'https://example.org/'
})
const { window } = jsdom

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop)
      }),
      {}
    )
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
global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
copyProps(window, global)
