import { shallow } from 'enzyme'
import React from 'react'
import getViewerComponent from './getViewerComponent'

describe('Helper > getViewerComponent', function () {
  it('should return null if passed an unknown location type', function () {
    const result = getViewerComponent({ 'foo/bar': 'baz' })
    expect(result).to.equal(null)
  })

  it('should return a viewer for images', function () {
    const result = shallow(getViewerComponent({ 'image/png': 'baz' }))
    result.length.should.equal(1)
  })
})
