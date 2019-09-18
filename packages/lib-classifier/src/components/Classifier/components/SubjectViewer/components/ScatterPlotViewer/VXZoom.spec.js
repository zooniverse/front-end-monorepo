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
  
  describe('zooming', function () {
    let onWheelSpy, onDoubleClickSpy

    function testBothAxes(updatedTransformMatrix, initialTransformMatrix, zoomValue) {
      expect(updatedTransformMatrix.scaleX).to.equal(initialTransformMatrix.scaleX * zoomValue)
      expect(updatedTransformMatrix.scaleY).to.equal(initialTransformMatrix.scaleY * zoomValue)
    }

    function testXAxis(updatedTransformMatrix, initialTransformMatrix, zoomValue) {
      expect(updatedTransformMatrix.scaleX).to.equal(initialTransformMatrix.scaleX * zoomValue)
      expect(updatedTransformMatrix.scaleY).to.equal(initialTransformMatrix.scaleY)
    }

    function testYAxis(updatedTransformMatrix, initialTransformMatrix, zoomValue) {
      expect(updatedTransformMatrix.scaleX).to.equal(initialTransformMatrix.scaleX)
      expect(updatedTransformMatrix.scaleY).to.equal(initialTransformMatrix.scaleY * zoomValue)
    }

    function testNoZoom(updatedTransformMatrix, initialTransformMatrix) {
      expect(updatedTransformMatrix).to.deep.equal(initialTransformMatrix)
    }

    describe('when zooming prop is false', function () {
      function testEventPrevention(wrapper, type) {
        const event = { preventDefault: sinon.spy() }
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)
        wrapper.find(ZoomEventLayer).simulate(type, event)
        expect(event.preventDefault).to.have.been.called()
        const updatedTransformMatrix = wrapper.instance().zoom.transformMatrix
        testNoZoom(updatedTransformMatrix, initialTransformMatrix)
      }

      it('should not scale the axes on mouse wheel', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            wrappedComponent={StubComponent}
          />
        )
        testEventPrevention(wrapper, 'wheel')
      })

      it('should not scale the axes on double click', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            wrappedComponent={StubComponent}
          />
        )
        testEventPrevention(wrapper, 'dblclick')
      })

      it('should not scale the axes when zoom callback is called', function () {
        const zoomCallback = sinon.stub()
        const wrapper = mount(
          <VXZoom
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            setOnZoom={zoomCallback}
            wrappedComponent={StubComponent}
          />
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom

        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        zoomCallback('zoomin')
        const transformMatrixAfterZoomInCall = wrapper.instance().zoom.transformMatrix
        testNoZoom(transformMatrixAfterZoomInCall, initialTransformMatrix)

        zoomCallback('zoomout')
        const transformMatrixAfterZoomOutCall = wrapper.instance().zoom.transformMatrix
        testNoZoom(transformMatrixAfterZoomOutCall, initialTransformMatrix)

        zoomCallback('zoomto')
        const transformMatrixAfterZoomToCall = wrapper.instance().zoom.transformMatrix
        testNoZoom(transformMatrixAfterZoomToCall, initialTransformMatrix)
      })
    })

    describe('when zooming prop is true', function () {
      function testTransformations (updatedTransformMatrix, initialTransformMatrix, zoomValue, direction) {
        if (direction === 'both') {
          testBothAxes(updatedTransformMatrix, initialTransformMatrix, zoomValue)
        } else if (direction === 'x') {
          testXAxis(updatedTransformMatrix, initialTransformMatrix, zoomValue)
        } else if (direction === 'y') {
          testYAxis(updatedTransformMatrix, initialTransformMatrix, zoomValue)
        } else if (direction === 'none') {
          testNoZoom(updatedTransformMatrix, initialTransformMatrix)
        }
      }

      function testEvent (wrapper, type, event) {
        const eventMock = event || {
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }

        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        const { direction, zoomInValue, zoomOutValue } = wrapper.props().zoomConfiguration
        const zoomValue = (-eventMock.deltaY > 0) ? zoomInValue : zoomOutValue

        expect(transformMatrix).to.deep.equal(initialTransformMatrix)
        wrapper.find(ZoomEventLayer).simulate(type, eventMock)
        const updatedTransformMatrix = wrapper.instance().zoom.transformMatrix
        testTransformations(updatedTransformMatrix, initialTransformMatrix, zoomValue, direction)
      }

      function testZoomCallback (wrapper, zoomCallback) {
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        const { direction, zoomInValue, zoomOutValue } = wrapper.props().zoomConfiguration

        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        zoomCallback('zoomin')
        const zoomedInTransformMatrix = wrapper.instance().zoom.transformMatrix
        console.log('zoomedIn', zoomedInTransformMatrix)
        // testTransformations(zoomedInTransformMatrix, initialTransformMatrix, zoomInValue, direction)

        zoomCallback('zoomout')
        const zoomedOutTransformMatrix = wrapper.instance().zoom.transformMatrix
        testTransformations(zoomedOutTransformMatrix, initialTransformMatrix, zoomOutValue, direction)

        // zoomCallback('zoomto')
        // const zoomedToTransformMatrix = wrapper.instance().zoom.transformMatrix
        // testNoZoom(zoomedToTransformMatrix, initialTransformMatrix)
      }

      describe.only('with the default configuration of allowing zoom in both directions', function () {
        it('should scale both axes in on mouse wheel', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              wrappedComponent={StubComponent}
              zooming={true}
            />
          )

          testEvent(wrapper, 'wheel')
        })

        it('should scale both axes out on mouse wheel', function () {
          const zoomConfiguration = {
            direction: 'both',
            minZoom: 0.5, // modifying min zoom scale to test zoom out
            maxZoom: 10,
            zoomInValue: 1.2,
            zoomOutValue: 0.8
          }

          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              wrappedComponent={StubComponent}
              zoomConfiguration={zoomConfiguration}
              zooming={true}
            />
          )

          const event = {
            clientX: 50,
            clientY: 50,
            deltaY: -10,
            preventDefault: sinon.spy()
          }

          testEvent(wrapper, 'wheel', event)
        })

        it('should scale both axes on double click', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              wrappedComponent={StubComponent}
              zooming={true}
            />
          )

          testEvent(wrapper, 'dblclick')
        })

        it.only('should scale both axes when zoom callback is called', function () {
          const zoomConfiguration = {
            direction: 'both',
            minZoom: 0.5, // modifying min zoom scale to test zoom out
            maxZoom: 10,
            zoomInValue: 1.2,
            zoomOutValue: 0.8
          }
          const zoomCallback = () => {}
          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              setOnZoom={zoomCallback}
              wrappedComponent={StubComponent}
              zoomConfiguration={zoomConfiguration}
              zooming={true}
            />
          )

          testZoomCallback(wrapper, zoomCallback)
        })
      })

      describe('when only zooming the x-axis', function () {
        const zoomConfiguration = {
          direction: 'x',
          minZoom: 0.5, // modifying min zoom scale to test zoom out
          maxZoom: 10,
          zoomInValue: 1.2,
          zoomOutValue: 0.8
        }

        it('should scale the x-axis in on mouse wheel', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              wrappedComponent={StubComponent}
              zoomConfiguration={zoomConfiguration}
              zooming={true}
            />
          )

          testEvent(wrapper, 'wheel')
        })

        it('should scale the x-axis out on mouse wheel', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              wrappedComponent={StubComponent}
              zoomConfiguration={zoomConfiguration}
              zooming={true}
            />
          )

          const event = {
            clientX: 50,
            clientY: 50,
            deltaY: -10,
            preventDefault: sinon.spy()
          }

          testEvent(wrapper, 'wheel', event)
        })

        it('should scale the x-axis on double click', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              wrappedComponent={StubComponent}
              zoomConfiguration={zoomConfiguration}
              zooming={true}
            />
          )

          testEvent(wrapper, 'dblclick')
        })

        it('should scale the x-axis when zoom callback is called', function () {
          const zoomCallback = sinon.stub()
          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              setOnZoom={zoomCallback}
              wrappedComponent={StubComponent}
              zoomConfiguration={zoomConfiguration}
              zooming={true}
            />
          )

          testZoomCallback(wrapper, zoomCallback)
        })
      })
    })
  })
})
