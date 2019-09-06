import React from 'react'
import { mount, shallow } from 'enzyme'
import * as d3 from 'd3'
import sinon from 'sinon'
import { Zoom } from '@vx/zoom'
import { MARGIN, PADDING, PAN_DISTANCE } from './helpers/constants'
import mockData from '../LightCurveViewer/mockData'
import VXZoom from './VXZoom'
import ZoomEventLayer from '../SVGComponents/ZoomEventLayer'

function StubComponent ({ children }) {
  return (
    <svg height='100px' width='100px'>
      <rect fill='#fff'></rect>
      {children}
    </svg>
  )
}

const width = 1000
const height = 1000

describe.only('Component > VXZoom', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <VXZoom
        data={mockData}
        parentHeight={height}
        parentWidth={width}
        wrappedComponent={StubComponent}
      />
    )
    expect(wrapper).to.be.ok()
  })

  describe('instantiation', function () {
    it('should initialize state with the data extent calculation', function () {
      const dataExtent = {
        x: d3.extent(mockData.x),
        y: d3.extent(mockData.y)
      }
      const wrapper = shallow(
        <VXZoom
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          wrappedComponent={StubComponent}
        />
      )
      expect(wrapper.state().dataExtent).to.deep.equal(dataExtent)
    })

    it('should initialize state with the x and y range based on the parent container width and height', function () {
      const width = 1000
      const height = 1000
      const wrapper = shallow(
        <VXZoom
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          wrappedComponent={StubComponent}
        />
      )

      expect(wrapper.state().xRange[0]).to.equal(PADDING)
      expect(wrapper.state().xRange[1]).to.equal(width - MARGIN)
      expect(wrapper.state().yRange[0]).to.equal(height - PADDING)
      expect(wrapper.state().yRange[1]).to.equal(MARGIN)
    })

    it('should call props.setOnZoom callback', function () {
      const setOnZoomSpy = sinon.spy()
      shallow(
        <VXZoom
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          setOnZoom={setOnZoomSpy}
          wrappedComponent={StubComponent}
        />
      )
      expect(setOnZoomSpy).to.have.been.calledOnce()
    })
  })

  describe('VX Zoom wrapping component', function () {
    it('should set the zoom static variable with the Zoom component child function return value', function () {
      const wrapper = mount(
        <VXZoom
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          wrappedComponent={StubComponent}
        />
      )

      expect(wrapper.instance().zoom).to.be.an('object')
      expect(wrapper.instance().zoom).to.not.be.null()
    })

    it('should set scale min and max using props', function () {
      const zoomConfiguration = {
        direction: 'both',
        minZoom: -10,
        maxZoom: 100,
        zoomInValue: 1.2,
        zoomOutValue: 0.8
      }

      const wrapper = shallow(
        <VXZoom
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          wrappedComponent={StubComponent}
          zoomConfiguration={zoomConfiguration}
        />
      )

      expect(wrapper.find(Zoom).props().scaleXMin).to.equal(zoomConfiguration.minZoom)
      expect(wrapper.find(Zoom).props().scaleXMax).to.equal(zoomConfiguration.maxZoom)
      expect(wrapper.find(Zoom).props().scaleYMin).to.equal(zoomConfiguration.minZoom)
      expect(wrapper.find(Zoom).props().scaleYMax).to.equal(zoomConfiguration.maxZoom)
    })

    it('should set the height and width using props', function () {
      const wrapper = shallow(
        <VXZoom
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          wrappedComponent={StubComponent}
        />
      )
      expect(wrapper.find(Zoom).props().height).to.equal(height)
      expect(wrapper.find(Zoom).props().width).to.equal(width)
    })
  })

  describe('wrapped component', function () {
    it('should render the wrapped component', function () {
      const wrapper = mount(
        <VXZoom
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          wrappedComponent={StubComponent}
        />
      )

      expect(wrapper.find(StubComponent)).to.have.lengthOf(1)
    })

    it('should pass the component state as props', function () {
      const wrapper = mount(
        <VXZoom
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          wrappedComponent={StubComponent}
        />
      )

      expect(wrapper.find(StubComponent).props().dataExtent).to.equal(wrapper.state().dataExtent)
      expect(wrapper.find(StubComponent).props().xRange).to.equal(wrapper.state().xRange)
      expect(wrapper.find(StubComponent).props().yRange).to.equal(wrapper.state().yRange)
    })

    it('should pass the Zoom child function return value transformMatrix as a prop', function () {
      const wrapper = mount(
        <VXZoom
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          wrappedComponent={StubComponent}
        />
      )

      expect(wrapper.find(StubComponent).props().transformMatrix).to.equal(wrapper.instance().zoom.transformMatrix)
    })

    it('should render ZoomEventLayer as a child', function () {
      const wrapper = mount(
        <VXZoom
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          wrappedComponent={StubComponent}
        />
      )

      expect(wrapper.find(StubComponent).find(ZoomEventLayer)).to.have.lengthOf(1)
    })
  })
})
