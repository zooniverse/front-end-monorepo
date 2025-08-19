/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import { JSDOM } from 'jsdom'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setProjectAnnotations } from '@storybook/react'
import preview from '../.storybook/preview'

setProjectAnnotations(preview) // Attachs Story decorator with Grommet theme

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://localhost'})
const { window } = jsdom

global.after = afterAll
global.before = beforeAll
global.beforeEach = beforeEach
global.describe = describe
global.expect = expect
global.it = it

function copyProps (src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
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

class IntersectionObserver {
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

const mockMediaMatcher = {
  addListener() {
    return true
  },
  removeListener() {
    return true
  },
  matches: true
}

window.IntersectionObserver = IntersectionObserver
window.ResizeObserver = ResizeObserver
window.scrollTo = () => true
window.matchMedia = () => mockMediaMatcher

global.window = window
global.document = window.document
global.Image = window.Image
global.navigator = {
  userAgent: 'node.js'
}
global.cancelAnimationFrame = () => true // Required for '@tippyjs'
copyProps(window, global)
