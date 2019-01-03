import React from 'react'
import sinon from 'sinon'
import defaultOptions from './defaultOptions'

const { createAnchorForNewTab, sanitizeForMarkdown } = defaultOptions

describe('defaultOptions functions', function () {
  describe('createAnchorForNewTab', function () {
    let createAnchorForNewTabSpy
    const type = 'a'
    const props = { href: "+tab+https://www.zooniverse.org/" }
    const children = ["tabbed link"]

    before(function () {
      createAnchorForNewTabSpy = sinon.spy(defaultOptions, 'createAnchorForNewTab')
    })

    afterEach(function () {
      createAnchorForNewTabSpy.resetHistory()
    })

    it('should return a React component', function () {
      const component = createAnchorForNewTab(type, props, children)
      expect(React.Component.isPrototypeOf(component)).to.be.true
    })

    it('should return a React component with a href prop equal to the href without the +tab+ prefix', function () {
      const component = createAnchorForNewTab(type, props, children)
      expect(component.props.href).to.equal('https://www.zooniverse.org/')
    })

    it('should return a React component with a rel prop', function () {
      const component = createAnchorForNewTab(type, props, children)
      expect(component.props.rel).to.equal('noopener nofollow')
    })

    it('should return a React component with a target prop', function () {
      const component = createAnchorForNewTab(type, props, children)
      expect(component.props.target).to.equal('_blank')
    })

    it('should return a React component with any other added props', function () {
      const mergedProps = {
        className: 'myClass',
        ...props
      }
      const component = createAnchorForNewTab(type, mergedProps, children)
      expect(component.props.className).to.equal('myClass')
    })
  })
})