import { mount } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import SingleImageViewer from '../../SingleImageViewer'
import SVGPanZoom from './SVGPanZoom'

describe('Components > SVGPanZoom', function () {
  let wrapper
  let onDrag
  let onPan
  let onZoom
  
  beforeEach(function () {
    const img = {
      getBoundingClientRect () {
        return {
          height: 100,
          width: 200
        }
      }
    }
    wrapper = mount(
      <SVGPanZoom
        img={img}
        naturalHeight={200}
        naturalWidth={400}
        setOnDrag={callback => { onDrag = callback }}
        setOnPan={callback => { onPan = callback }}
        setOnZoom={callback => { onZoom = callback }}
      >
        <svg />
      </SVGPanZoom>
    )
  })
  
  it('should enable zoom in', function () {
    onZoom('zoomin', 1)
    wrapper.update()
    const viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('18.5 9.5 363 181')
  })

  it('should enable zoom out', function () {
    onZoom('zoomin', 1)
    wrapper.update()
    let viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('18.5 9.5 363 181')
    onZoom('zoomout', -1)
    wrapper.update()
    viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('0 0 400 200')
  })

  it('should enable horizontal panning', function () {
    onPan(-1, 0)
    wrapper.update()
    const viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('10 0 400 200')
  })

  it('should enable vertical panning', function () {
    onPan(0, -1)
    wrapper.update()
    const viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('0 -10 400 200')
  })

  it('should should pan horizontally on drag', function () {
    onDrag({}, { x: -15, y: 0 })
    wrapper.update()
    const viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('10 0 400 200')
  })

  it('should should pan vertically on drag', function () {
    onDrag({}, { x: 0, y: -15 })
    wrapper.update()
    const viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('0 10 400 200')
  })

  it('should should zoom out on wheel scroll up', function () {
    let fakeEvent = { deltaY: 10, preventDefault: sinon.stub(), stopPropagation: sinon.stub() }
    wrapper.simulate('wheel', fakeEvent)
    let viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('18.5 9.5 363 181')
    fakeEvent = { deltaY: -10, preventDefault: sinon.stub(), stopPropagation: sinon.stub() }
    wrapper.simulate('wheel', fakeEvent)
    viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('0 0 400 200')
  })

  it('should should zoom in on wheel scroll down', function () {
    let viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('0 0 400 200')
    const fakeEvent = { deltaY: 10, preventDefault: sinon.stub(), stopPropagation: sinon.stub() }
    wrapper.simulate('wheel', fakeEvent)
    viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('18.5 9.5 363 181')
  })

  it('should reset pan with new src', function () {
    onPan(-1, 0)
    wrapper.update()
    let viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('10 0 400 200')

    wrapper.setProps({ naturalHeight: 400, naturalWidth: 200, src: 'http://placekitten.com/200/400' })
    wrapper.update()
    viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('0 0 200 400')
  })

  it('should reset zoom with new src', function () {
    onZoom('zoomin', 1)
    wrapper.update()
    let viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('18.5 9.5 363 181')

    wrapper.setProps({ naturalHeight: 400, naturalWidth: 200, src: 'http://placekitten.com/200/400' })
    wrapper.update()
    viewBox = wrapper.find('svg').prop('viewBox')
    expect(viewBox).to.equal('0 0 200 400')
  })
})
