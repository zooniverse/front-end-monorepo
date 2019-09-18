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

const zoomInEventMock = {
  clientX: 50,
  clientY: 50,
  deltaY: -1,
  preventDefault: sinon.spy()
}

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
    let zoomCallback

    function testNoZoom(currentTransformMatrix, previousTransformMatrix) {
      expect(currentTransformMatrix).to.deep.equal(previousTransformMatrix)
    }

    function setZoomCallback(callback) {
      zoomCallback = sinon.stub().callsFake(callback)
    }

    describe('when zooming is disabled', function () {
      function testEventPrevention(wrapper, type) {
        const event = { preventDefault: sinon.spy() }
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)
        wrapper.find(ZoomEventLayer).simulate(type, event)
        expect(event.preventDefault).to.have.been.called()
        const currentTransformMatrix = wrapper.instance().zoom.transformMatrix
        testNoZoom(currentTransformMatrix, initialTransformMatrix)
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
        const wrapper = mount(
          <VXZoom
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            setOnZoom={setZoomCallback}
            wrappedComponent={StubComponent}
          />
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        const zoomTypes = ['zoomin', 'zoomout', 'zoomto']

        zoomTypes.forEach((type) => {
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)
          zoomCallback(type)
          const transformMatrixAfterZoomInCall = wrapper.instance().zoom.transformMatrix
          testNoZoom(transformMatrixAfterZoomInCall, initialTransformMatrix)
          wrapper.instance().zoom.reset()
        })
        zoomCallback.resetHistory()
      })
    })

    describe('when zooming is enabled', function () {
      function testTransformations (currentTransformMatrix, previousTransformMatrix, zoomValue, direction) {
        if (direction === 'both') {
          expect(currentTransformMatrix.scaleX).to.equal(previousTransformMatrix.scaleX * zoomValue)
          expect(currentTransformMatrix.scaleY).to.equal(previousTransformMatrix.scaleY * zoomValue)
        } else if (direction === 'x') {
          expect(currentTransformMatrix.scaleX).to.equal(previousTransformMatrix.scaleX * zoomValue)
          expect(currentTransformMatrix.scaleY).to.equal(previousTransformMatrix.scaleY)
        } else if (direction === 'y') {
          expect(currentTransformMatrix.scaleX).to.equal(previousTransformMatrix.scaleX)
          expect(currentTransformMatrix.scaleY).to.equal(previousTransformMatrix.scaleY * zoomValue)
        }
      }

      function testEvent (wrapper, type, event, previousTransformMatrix) {
        const eventMock = event || {
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }

        const { direction, zoomInValue, zoomOutValue } = wrapper.props().zoomConfiguration
        const zoomValue = (-eventMock.deltaY > 0) ? zoomInValue : zoomOutValue

        wrapper.find(ZoomEventLayer).simulate(type, eventMock)
        const currentTransformMatrix = wrapper.instance().zoom.transformMatrix
        testTransformations(currentTransformMatrix, previousTransformMatrix, zoomValue, direction)
      }

      function testZoomCallback (wrapper, zoomType) {
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        const { direction, zoomInValue, zoomOutValue } = wrapper.props().zoomConfiguration
        const zoomValues = {
          'zoomin': zoomInValue,
          'zoomout': zoomOutValue,
          'zoomto': 1
        }
        const zoomValue = zoomValues[zoomType]

        if (zoomType === 'zoomin') {
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)
        } else {
          // currently zoomed in to test zoom out and reset
          expect(transformMatrix).to.not.deep.equal(initialTransformMatrix)
        }

        const previousTransformMatrix = (zoomType !== 'zoomto') ? transformMatrix : initialTransformMatrix
        zoomCallback(zoomType)
        const zoomedTransformMatrix = wrapper.instance().zoom.transformMatrix
        testTransformations(zoomedTransformMatrix, previousTransformMatrix, zoomValue, direction)
        zoomCallback.resetHistory()
      }

      describe('with the default configuration of allowing zoom in both directions', function () {
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
          const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          testEvent(wrapper, 'wheel', null, initialTransformMatrix)
        })

        it('should scale both axes out on mouse wheel', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              wrappedComponent={StubComponent}
              zooming={true}
            />
          )
          const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          const zoomInEvent = {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          }

          // zooming in first
          wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEvent)
          wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEvent)
          const zoomedInTransformMatrix = wrapper.instance().zoom.transformMatrix

          const zoomOutEvent = {
            clientX: 50,
            clientY: 50,
            deltaY: 10,
            preventDefault: sinon.spy()
          }

          testEvent(wrapper, 'wheel', zoomOutEvent, zoomedInTransformMatrix)
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
          const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          testEvent(wrapper, 'dblclick', null, initialTransformMatrix)
        })

        describe('when zoom callback is called', function () {
          it('should scale both axes when zooming in', function () {
            const wrapper = mount(
              <VXZoom
                data={mockData}
                parentHeight={height}
                parentWidth={width}
                setOnZoom={setZoomCallback}
                wrappedComponent={StubComponent}
                zooming={true}
              />
            )

            testZoomCallback(wrapper, 'zoomin')
          })

          it('should scale both axes when zooming out', function () {
            const wrapper = mount(
              <VXZoom
                data={mockData}
                parentHeight={height}
                parentWidth={width}
                setOnZoom={setZoomCallback}
                wrappedComponent={StubComponent}
                zooming={true}
              />
            )
            // zoom in first
            zoomCallback('zoomin')
            zoomCallback('zoomin')

            testZoomCallback(wrapper, 'zoomout')
          })

          it('should scale both axes when resetting zoom', function () {
            const wrapper = mount(
              <VXZoom
                data={mockData}
                parentHeight={height}
                parentWidth={width}
                setOnZoom={setZoomCallback}
                wrappedComponent={StubComponent}
                zooming={true}
              />
            )

            // zooming in first
            zoomCallback('zoomin')
            testZoomCallback(wrapper, 'zoomto')
          })
        })
      })

      describe('when only zooming the x-axis', function () {
        const zoomConfiguration = {
          direction: 'x',
          minZoom: 1,
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

          const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          testEvent(wrapper, 'wheel', null, initialTransformMatrix)
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

          const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          const zoomInEvent = {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          }

          // zooming in first
          wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEvent)
          wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEvent)
          const zoomedInTransformMatrix = wrapper.instance().zoom.transformMatrix

          const zoomOutEvent = {
            clientX: 50,
            clientY: 50,
            deltaY: 10,
            preventDefault: sinon.spy()
          }

          testEvent(wrapper, 'wheel', zoomOutEvent, zoomedInTransformMatrix)
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
          const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          testEvent(wrapper, 'dblclick', null, initialTransformMatrix)
        })

        describe('when the zoom callback is called', function () {
          it('should scale the x-axis when zooming in', function () {
            const wrapper = mount(
              <VXZoom
                data={mockData}
                parentHeight={height}
                parentWidth={width}
                setOnZoom={setZoomCallback}
                wrappedComponent={StubComponent}
                zoomConfiguration={zoomConfiguration}
                zooming={true}
              />
            )

            testZoomCallback(wrapper, 'zoomin')
          })

          it('should scale the x-axis when zooming out', function () {
            const wrapper = mount(
              <VXZoom
                data={mockData}
                parentHeight={height}
                parentWidth={width}
                setOnZoom={setZoomCallback}
                wrappedComponent={StubComponent}
                zoomConfiguration={zoomConfiguration}
                zooming={true}
              />
            )
            // zoom in first
            zoomCallback('zoomin')
            zoomCallback('zoomin')

            testZoomCallback(wrapper, 'zoomout')
          })

          it('should scale the x-axis when resetting zoom', function () {
            const wrapper = mount(
              <VXZoom
                data={mockData}
                parentHeight={height}
                parentWidth={width}
                setOnZoom={setZoomCallback}
                wrappedComponent={StubComponent}
                zoomConfiguration={zoomConfiguration}
                zooming={true}
              />
            )

            // zooming in first
            zoomCallback('zoomin')
            testZoomCallback(wrapper, 'zoomto')
          })
        })
      })

      describe('when only zooming the y-axis', function () {
        const zoomConfiguration = {
          direction: 'y',
          minZoom: 1,
          maxZoom: 10,
          zoomInValue: 1.2,
          zoomOutValue: 0.8
        }

        it('should scale the y-axis in on mouse wheel', function () {
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

          const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          testEvent(wrapper, 'wheel', null, initialTransformMatrix)
        })

        it('should scale the y-axis out on mouse wheel', function () {
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

          const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          const zoomInEvent = {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          }

          // zooming in first
          wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEvent)
          wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEvent)
          const zoomedInTransformMatrix = wrapper.instance().zoom.transformMatrix

          const zoomOutEvent = {
            clientX: 50,
            clientY: 50,
            deltaY: 10,
            preventDefault: sinon.spy()
          }

          testEvent(wrapper, 'wheel', zoomOutEvent, zoomedInTransformMatrix)
        })

        it('should scale the y-axis on double click', function () {
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
          const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          testEvent(wrapper, 'dblclick', null, initialTransformMatrix)
        })

        describe('when the zoom callback is called', function () {
          it('should scale the y-axis when zooming in', function () {
            const wrapper = mount(
              <VXZoom
                data={mockData}
                parentHeight={height}
                parentWidth={width}
                setOnZoom={setZoomCallback}
                wrappedComponent={StubComponent}
                zoomConfiguration={zoomConfiguration}
                zooming={true}
              />
            )

            testZoomCallback(wrapper, 'zoomin')
          })

          it('should scale the y-axis when zooming out', function () {
            const wrapper = mount(
              <VXZoom
                data={mockData}
                parentHeight={height}
                parentWidth={width}
                setOnZoom={setZoomCallback}
                wrappedComponent={StubComponent}
                zoomConfiguration={zoomConfiguration}
                zooming={true}
              />
            )
            // zoom in first
            zoomCallback('zoomin')
            zoomCallback('zoomin')

            testZoomCallback(wrapper, 'zoomout')
          })

          it('should scale the y-axis when resetting zoom', function () {
            const wrapper = mount(
              <VXZoom
                data={mockData}
                parentHeight={height}
                parentWidth={width}
                setOnZoom={setZoomCallback}
                wrappedComponent={StubComponent}
                zoomConfiguration={zoomConfiguration}
                zooming={true}
              />
            )

            // zooming in first
            zoomCallback('zoomin')
            testZoomCallback(wrapper, 'zoomto')
          })
        })
      })
    })
  })

  describe('panning', function () {
    describe('when panning is disabled', function () {
      it('should not translate the SVG position', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            panning={true}
            parentHeight={height}
            parentWidth={width}
            wrappedComponent={StubComponent}
          />
        )

        const events = ['mousedown', 'mouseup', 'mousemove', 'mouseleave']
        const eventMock = {
          preventDefault: sinon.spy()
        }

        events.forEach((event) => {
          wrapper.find(ZoomEventLayer).simulate(event, eventMock)
          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)
        })
      })
    })

    describe('when panning is enabled', function () {
      describe('with the default configuration allowing pan in both directions', function () {
        it('should translate the SVG position', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              panning={true}
              parentHeight={height}
              parentWidth={width}
              wrappedComponent={StubComponent}
              zooming={true}
            />
          )
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the data boundary constraints
          eventLayer.simulate('dblclick', {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          })
          const zoomedTransformMatrix = wrapper.instance().zoom.transformMatrix

          // Now to simulate the panning
          eventLayer.simulate('mousedown', {
            clientX: 55,
            clientY: 55
          })
          eventLayer.simulate('mousemove', {
            clientX: 60,
            clientY: 60
          })
          eventLayer.simulate('mouseup')

          const pannedTransformMatrix = wrapper.instance().zoom.transformMatrix
          expect(pannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          expect(pannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          expect(pannedTransformMatrix.translateX).to.equal(initialTransformMatrix.translateX - 5)
          expect(pannedTransformMatrix.translateY).to.equal(initialTransformMatrix.translateY - 5)
        })
      })

      describe('when only panning the x-axis', function () {
        it('should translate the SVG position', function () {
          const zoomConfiguration = {
            direction: 'x',
            minZoom: 1,
            maxZoom: 10,
            zoomInValue: 1.2,
            zoomOutValue: 0.8
          }
          const wrapper = mount(
            <VXZoom
              data={mockData}
              panning={true}
              parentHeight={height}
              parentWidth={width}
              wrappedComponent={StubComponent}
              zoomConfiguration={zoomConfiguration}
              zooming={true}
            />
          )
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the data boundary constraints
          eventLayer.simulate('dblclick', {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          })
          const zoomedTransformMatrix = wrapper.instance().zoom.transformMatrix

          // Now to simulate the panning
          eventLayer.simulate('mousedown', {
            clientX: 55,
            clientY: 50
          })
          eventLayer.simulate('mousemove', {
            clientX: 60,
            clientY: 50
          })
          eventLayer.simulate('mouseup')

          const pannedTransformMatrix = wrapper.instance().zoom.transformMatrix
          expect(pannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          expect(pannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          expect(pannedTransformMatrix.translateX).to.equal(initialTransformMatrix.translateX - 5)
          expect(pannedTransformMatrix.translateY).to.equal(initialTransformMatrix.translateY)
        })
      })

      describe('when only panning the y-axis', function () {
        it('should translate the SVG position', function () {
          const zoomConfiguration = {
            direction: 'y',
            minZoom: 1,
            maxZoom: 10,
            zoomInValue: 1.2,
            zoomOutValue: 0.8
          }
          const wrapper = mount(
            <VXZoom
              data={mockData}
              panning={true}
              parentHeight={height}
              parentWidth={width}
              wrappedComponent={StubComponent}
              zoomConfiguration={zoomConfiguration}
              zooming={true}
            />
          )
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the data boundary constraints
          eventLayer.simulate('dblclick', {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          })
          const zoomedTransformMatrix = wrapper.instance().zoom.transformMatrix

          // Now to simulate the panning
          eventLayer.simulate('mousedown', {
            clientX: 50,
            clientY: 55
          })
          eventLayer.simulate('mousemove', {
            clientX: 50,
            clientY: 60
          })
          eventLayer.simulate('mouseup')

          const pannedTransformMatrix = wrapper.instance().zoom.transformMatrix
          expect(pannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          expect(pannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          expect(pannedTransformMatrix.translateX).to.equal(initialTransformMatrix.translateX)
          expect(pannedTransformMatrix.translateY).to.equal(initialTransformMatrix.translateY - 5)
        })
      })
    })
  })

  describe.only('data boundary constraints', function () {
    describe('when zooming', function () {
      it('should not zoom in beyond maximum zoom configuration', function () {
        const zoomConfiguration = {
          direction: 'both',
          minZoom: 1,
          maxZoom: 5,
          zoomInValue: 1.2,
          zoomOutValue: 0.8
        }
        const wrapper = mount(
          <VXZoom
            data={mockData}
            panning={true}
            parentHeight={height}
            parentWidth={width}
            wrappedComponent={StubComponent}
            zoomConfiguration={zoomConfiguration}
            zooming={true}
          />
        )
        const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // multiplying the scale 1.2 nine times is 5.159780352
        let previousTransformMatrix
        for (let i = 0; i < 10; i++) {
          wrapper.find(ZoomEventLayer).simulate('dblclick', zoomInEventMock)
          if (i === 8) {
            previousTransformMatrix = wrapper.instance().zoom.transformMatrix
          }
        }
        const zoomedTransformMatrix = wrapper.instance().zoom.transformMatrix

        expect(zoomedTransformMatrix).to.not.deep.equal(transformMatrix)
        expect(zoomedTransformMatrix.scaleX).to.equal(previousTransformMatrix.scaleX)
        expect(zoomedTransformMatrix.scaleY).to.equal(previousTransformMatrix.scaleY)
        expect(zoomedTransformMatrix.scaleX).to.be.below(zoomConfiguration.maxZoom)
        expect(zoomedTransformMatrix.scaleY).to.be.below(zoomConfiguration.maxZoom)
      })

      it('should not zoom out beyond the minimum zoom configuration', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            panning={true}
            parentHeight={height}
            parentWidth={width}
            wrappedComponent={StubComponent}
            zooming={true}
          />
        )
        const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // zoom in first
        wrapper.find(ZoomEventLayer).simulate('dblclick', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.instance().zoom.transformMatrix
        expect(zoomedInTransformMatrix).to.not.deep.equal(initialTransformMatrix)

        // zoom out by mouse wheel
        // 1 * 1.2 * 0.8 is 0.96
        wrapper.find(ZoomEventLayer).simulate('wheel', {
          clientX: 50,
          clientY: 50,
          deltaY: 10,
          preventDefault: sinon.spy()
        })
        const zoomedOutTransformMatrix = wrapper.instance().zoom.transformMatrix

        expect(zoomedOutTransformMatrix).to.not.deep.equal(transformMatrix)
        expect(zoomedOutTransformMatrix.scaleX).to.equal(initialTransformMatrix.scaleX)
        expect(zoomedOutTransformMatrix.scaleY).to.equal(initialTransformMatrix.scaleY)
      })
    })
  })
})
