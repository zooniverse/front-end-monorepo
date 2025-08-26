import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'
import nock from 'nock'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setProjectAnnotations } from '@storybook/react'
import preview from '../.storybook/preview'

setProjectAnnotations(preview) // Attachs Story decorator with Grommet theme

// require all net requests to be mocked.
nock.disableNetConnect()
nock.enableNetConnect('panoptes-uploads.zooniverse.org')

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
window.scrollTo = () => true
window.matchMedia = () => { return { matches: false } }

global.after = afterAll
global.before = beforeAll
global.beforeEach = beforeEach
global.describe = describe
global.expect = expect
global.it = it

global.fetch = fetch
global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
copyProps(window, global)
