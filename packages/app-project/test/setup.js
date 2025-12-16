import { JSDOM } from 'jsdom'
// importing fetch from node-fetch and attaching it to the global object so that fetch can be tested with nock.
import fetch from 'node-fetch'
import nock from 'nock'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setProjectAnnotations } from '@storybook/react'
import previewAnnotations from '../.storybook/preview'
import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'

// Attachs Story decorator with Grommet theme
setProjectAnnotations([previewAnnotations, a11yAddonAnnotations])

// require all net requests to be mocked.
nock.disableNetConnect()

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://localhost' })
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


global.after = afterAll
global.before = beforeAll
global.beforeEach = beforeEach
global.describe = describe
global.expect = expect
global.it = it

global.dom = jsdom
global.fetch = fetch
global.window = window
global.document = window.document
global.self = global.window
global.navigator = {
  userAgent: 'node.js'
}

copyProps(window, global)
