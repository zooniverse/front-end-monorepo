import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import SingleImageViewer from '../../SingleImageViewer'
import SVGPanZoom from './SVGPanZoom'

describe('Components > SVGPanZoom', function () {
  let wrapper
  let onPan
  let onZoom
  
  beforeEach(function () {
    wrapper = shallow(
      <SVGPanZoom
        naturalHeight={200}
        naturalWidth={400}
        setOnPan={callback => { onPan = callback }}
        setOnZoom={callback => { onZoom = callback }}
      >
        <SingleImageViewer />
      </SVGPanZoom>
    )
  })
  
  it('should enable zoom in', function () {
    onZoom('zoomin', 1)
    const viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
    expect(viewBox).to.equal('18.5 9.5 363 181')
  })

  it('should enable zoom out', function () {
    onZoom('zoomin', 1)
    let viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
    expect(viewBox).to.equal('18.5 9.5 363 181')
    onZoom('zoomout', -1)
    viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
    expect(viewBox).to.equal('0 0 400 200')
  })

  it('should enable horizontal panning', function () {
    onPan(-1, 0)
    const viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
    expect(viewBox).to.equal('10 0 400 200')
  })

  it('should enable vertical panning', function () {
    onPan(0, -1)
    const viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
    expect(viewBox).to.equal('0 -10 400 200')
  })

  xit('should should pan horizontally on drag', function () {
      const dragMove = wrapper.find('draggable(image)').prop('dragMove')
      dragMove({}, { x: -15, y: 0 })
      const viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
      expect(viewBox).to.equal('10 0 400 200')
  })

  xit('should should pan vertically on drag', function () {
      const dragMove = wrapper.find('draggable(image)').prop('dragMove')
      dragMove({}, { x: 0, y: -15 })
      const viewBox = wrapper.find(SingleImageViewer).prop('viewBox')
      expect(viewBox).to.equal('0 10 400 200')
  })
})