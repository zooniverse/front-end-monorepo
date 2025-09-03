import chai from 'chai'
import chaiDom from 'chai-dom'
import sinonChai from 'sinon-chai'
import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'
import nock from 'nock'
import { afterAll, beforeAll, beforeEach, describe, it, vi } from 'vitest'
import { expect } from 'chai'
import { setProjectAnnotations } from '@storybook/react'
import preview from '../.storybook/preview'

chai.use(chaiDom)
chai.use(sinonChai)

// Vitest uses chai assertion syntax
global.after = afterAll
global.before = beforeAll
global.beforeEach = beforeEach
global.describe = describe
global.it = it

/* expect is an exception to the rest of FEM's Vitest config. This is "expect" from the actual
   chai library because lib-classifier extensively uses sinonChai and chaiDom, and the only way to
   use sinonChai and chaiDom is to attach them to chai itself, rather than Vitest's implementation.
*/
global.expect = expect

// Attachs Story decorator with Grommet theme
setProjectAnnotations(preview)

// require all net requests to be mocked.
nock.disableNetConnect()
nock.enableNetConnect('panoptes-uploads.zooniverse.org')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://localhost'
})
const { window } = jsdom

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop)
      }),
      {}
    )
  Object.defineProperties(target, props)
}

/* Mock these pointer events for draggable components, and hover states manipulated by Javascript */
const pointers = new Set()

window.Element.prototype.setPointerCapture = vi.fn(pointerId => {
  pointers.add(pointerId)
})

window.HTMLElement.prototype.hasPointerCapture = vi.fn(pointerId => {
  return pointers.has(pointerId)
})

window.HTMLElement.prototype.releasePointerCapture = vi.fn(pointerId => {
  pointers.delete(pointerId)
})

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
window.matchMedia = () => {
  return { matches: false }
}

global.fetch = fetch
global.window = window
global.document = window.document
// global.Image = window.Image
global.navigator = {
  userAgent: 'node.js'
}
window.cancelAnimationFrame = () => true // Required for '@visx'

copyProps(window, global)
