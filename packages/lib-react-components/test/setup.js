/* eslint-env browser, mocha */
/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true  }] */
import React from 'react'
import chai from 'chai'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'
import { JSDOM } from 'jsdom'
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

chai.use(dirtyChai)
chai.use(sinonChai)
global.React = React
global.expect = chai.expect

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://localhost'})
const { window } = jsdom

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

window.ResizeObserver = ResizeObserver
window.scrollTo = () => true

global.window = window
global.document = window.document
global.Image = window.Image
global.navigator = {
  userAgent: 'node.js'
}
global.cancelAnimationFrame = () => true  // Required for '@tippyjs'
copyProps(window, global)

Enzyme.configure({ adapter: new Adapter() })
