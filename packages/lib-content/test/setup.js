import { JSDOM } from 'jsdom'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { setProjectAnnotations } from '@storybook/react'

import { initTranslations } from './i18n'

import preview from '../.storybook/preview'
setProjectAnnotations(preview) // Attachs Story decorator with Grommet theme

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://localhost' })
const { window } = jsdom

global.after = afterAll
global.before = beforeAll
global.beforeEach = beforeEach
global.describe = describe
global.expect = expect
global.it = it

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

// Storybook composeStory creates the <I18nextProvider i18n={i18n}> in the
// unit test env, but we must init the i18n instance here for Vitest.
beforeAll(async () => {
  await initTranslations()
})
