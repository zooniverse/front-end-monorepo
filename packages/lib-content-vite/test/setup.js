// import '@testing-library/jest-dom'
import { JSDOM } from 'jsdom'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

global.expect = expect
global.it = it
global.describe = describe
global.before = beforeAll
global.after = afterAll

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://localhost'
})
const { window } = jsdom

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

window.IntersectionObserver = IntersectionObserver
window.ResizeObserver = ResizeObserver
window.scrollTo = () => true

global.dom = jsdom
global.window = window
global.self = global.window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
copyProps(window, global)
