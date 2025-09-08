import { JSDOM } from 'jsdom'
import { setProjectAnnotations } from '@storybook/react'
import preview from '../.storybook/preview'

// Attachs Story decorator with Grommet theme
setProjectAnnotations(preview)

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://localhost' })
const { window } = jsdom

window.scrollTo = () => true

global.dom = jsdom
global.window = window
global.self = global.window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
