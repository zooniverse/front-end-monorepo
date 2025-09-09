import { JSDOM } from 'jsdom'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://localhost' })
const { window } = jsdom

global.after = afterAll
global.before = beforeAll
global.beforeEach = beforeEach
global.describe = describe
global.expect = expect
global.it = it

global.dom = jsdom
global.window = window
global.self = global.window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
