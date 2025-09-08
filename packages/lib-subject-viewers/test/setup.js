import { JSDOM } from 'jsdom'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setProjectAnnotations } from '@storybook/react'
import preview from '../.storybook/preview'

// Attachs Story decorator with Grommet theme

setProjectAnnotations(preview)

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://localhost' })
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

window.scrollTo = () => true

global.dom = jsdom
global.window = window
global.self = global.window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}

window.requestAnimationFrame = () => true // Referenced in Cube.jsx
// window.devicePixelRatio

copyProps(window, global)
