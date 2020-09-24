import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import { Zoom } from '@vx/zoom'
import {
  lightCurveMockData
} from '../../ScatterPlotViewer/helpers/mockData'
import { VXZoom } from './VXZoom'
import ZoomEventLayer from '../ZoomEventLayer'

function StubComponent ({ children }) {
  return (
    <svg height='100px' width='100px'>
      <rect fill='#fff' />
      {children}
    </svg>
  )
}

const mockData = lightCurveMockData.kepler

const width = 1000
const height = 1000

const zoomInEventMock = {
  clientX: 50,
  clientY: 50,
  deltaY: -1,
  preventDefault: sinon.spy()
}

describe('Component > VXZoom', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <VXZoom
        data={mockData}
        height={height}
        width={width}
        zoomingComponent={StubComponent}
      />
    )
    expect(wrapper).to.be.ok()
  })

  describe('instantiation', function () {
    it('should call props.setOnZoom callback', function () {
      const setOnZoomSpy = sinon.spy()
      shallow(
        <VXZoom
          data={mockData}
          height={height}
          width={width}
          setOnZoom={setOnZoomSpy}
          zoomingComponent={StubComponent}
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
          height={height}
          width={width}
          zoomingComponent={StubComponent}
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
          height={height}
          width={width}
          zoomingComponent={StubComponent}
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
          height={height}
          width={width}
          zoomingComponent={StubComponent}
        />
      )
      expect(wrapper.find(Zoom).props().height).to.equal(height)
      expect(wrapper.find(Zoom).props().width).to.equal(width)
    })

    it('should set the left and top position using props', function () {
      const wrapper = shallow(
        <VXZoom
          data={mockData}
          height={height}
          width={width}
          zoomingComponent={StubComponent}
        />)
        expect(wrapper.find(Zoom).props().left).to.equal(0)
        expect(wrapper.find(Zoom).props().top).to.equal(0)
        wrapper.setProps({ left: 10, top: 10 })
        expect(wrapper.find(Zoom).props().left).to.equal(10)
        expect(wrapper.find(Zoom).props().top).to.equal(10)
    })

    it('should pass along the constrain function set in props', function () {
      const constrainSpy = sinon.spy()
      const wrapper = shallow(
        <VXZoom
          constrain={constrainSpy}
          data={mockData}
          height={height}
          width={width}
          zoomingComponent={StubComponent}
        />
      )
      expect(wrapper.find(Zoom).props().constrain).to.equal(constrainSpy)
    })
  })

  describe('zooming component', function () {
    it('should render the zooming component', function () {
      const wrapper = mount(
        <VXZoom
          data={mockData}
          height={height}
          width={width}
          zoomingComponent={StubComponent}
        />
      )

      expect(wrapper.find(StubComponent)).to.have.lengthOf(1)
    })

    it('should pass the Zoom child function return value transformMatrix as a prop', function () {
      const wrapper = mount(
        <VXZoom
          data={mockData}
          height={height}
          width={width}
          zoomingComponent={StubComponent}
        />
      )

      expect(wrapper.find(StubComponent).props().transformMatrix).to.equal(wrapper.instance().zoom.transformMatrix)
    })

    describe('ZoomEventLayer', function () {
      it('should render ZoomEventLayer as a child', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            width={width}
            zoomingComponent={StubComponent}
          />
        )

        expect(wrapper.find(StubComponent).find(ZoomEventLayer)).to.have.lengthOf(1)
      })

      it('should set the height, width, and left and top positions by props', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            left={20}
            height={height}
            width={width}
            top={40}
            zoomingComponent={StubComponent}
          />
        )

        const zoomEventLayer = wrapper.find(StubComponent).find(ZoomEventLayer)
        expect(zoomEventLayer.props().left).to.equal(20)
        expect(zoomEventLayer.props().top).to.equal(40)
        expect(zoomEventLayer.props().height).to.equal(height)
        expect(zoomEventLayer.props().width).to.equal(width)
      })
    })
  })

  describe('zooming', function () {
    let zoomCallback

    function testNoZoom ({ currentTransformMatrix, previousTransformMatrix }) {
      expect(currentTransformMatrix).to.deep.equal(previousTransformMatrix)
    }

    function setZoomCallback (callback) {
      zoomCallback = sinon.stub().callsFake(callback)
    }

    describe('when zooming is disabled', function () {
      function testEventPrevention ({ wrapper, type, event }) {
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)
        wrapper.find(ZoomEventLayer).simulate(type, event)
        if (event) expect(event.preventDefault).to.have.been.called()
        const currentTransformMatrix = wrapper.instance().zoom.transformMatrix
        testNoZoom(currentTransformMatrix, initialTransformMatrix)
      }

      it('should not scale the transform matrix on mouse wheel', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            width={width}
            zoomingComponent={StubComponent}
          />
        )

        testEventPrevention({ wrapper, type: 'wheel' })
      })

      it('should not scale the transform matrix on double click', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            width={width}
            zoomingComponent={StubComponent}
          />
        )
        testEventPrevention({ wrapper, type: 'dblclick', event: { preventDefault: sinon.spy() } })
      })

      it('should not scale the transform matrix on key down', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            width={width}
            zoomingComponent={StubComponent}
          />
        )
        testEventPrevention({ wrapper, type: 'keydown' })
      })

      it('should not scale the transform matrix when zoom callback is called', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            width={width}
            setOnZoom={setZoomCallback}
            zoomingComponent={StubComponent}
          />
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        const zoomTypes = ['zoomin', 'zoomout', 'zoomto']

        zoomTypes.forEach((type) => {
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)
          zoomCallback(type)
          const transformMatrixAfterZoomInCall = wrapper.instance().zoom.transformMatrix
          testNoZoom({
            currentTransformMatrix: transformMatrixAfterZoomInCall,
            previousTransformMatrix: initialTransformMatrix
          })
          wrapper.instance().zoom.reset()
        })
        zoomCallback.resetHistory()
      })
    })

    describe('when zooming is enabled', function () {
      function testTransformations ({ currentTransformMatrix, previousTransformMatrix, zoomValue }) {
        expect(currentTransformMatrix.scaleX).to.equal(previousTransformMatrix.scaleX * zoomValue)
        expect(currentTransformMatrix.scaleY).to.equal(previousTransformMatrix.scaleY * zoomValue)
      }

      function testEvent ({ wrapper, type, event, previousTransformMatrix }) {
        const eventMock = event || {
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }

        const { zoomInValue, zoomOutValue } = wrapper.props().zoomConfiguration
        const zoomValue = (-eventMock.deltaY > 0) ? zoomInValue : zoomOutValue
        wrapper.find(ZoomEventLayer).simulate(type, eventMock)
        const currentTransformMatrix = wrapper.instance().zoom.transformMatrix
        testTransformations({ currentTransformMatrix, previousTransformMatrix, zoomValue })
      }

      function testZoomCallback ({ wrapper, zoomType }) {
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        const { zoomInValue, zoomOutValue } = wrapper.props().zoomConfiguration
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
        testTransformations({
          currentTransformMatrix: zoomedTransformMatrix,
          previousTransformMatrix,
          zoomValue
        })
        zoomCallback.resetHistory()
      }

      it('should define overflow styles on the document body on mouse enter and on mouse leave', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            width={width}
            zoomingComponent={StubComponent}
            zooming
          />
        )

        expect(document.body.style.overflow).to.be.empty()
        wrapper.find(ZoomEventLayer).simulate('mouseenter')
        expect(document.body.style.overflow).to.equal('hidden')
        wrapper.find(ZoomEventLayer).simulate('mouseleave')
        expect(document.body.style.overflow).to.be.empty()
      })

      it('should scale in the transform matrix on mouse wheel', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            width={width}
            zoomingComponent={StubComponent}
            zooming
          />
        )

        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'wheel', previousTransformMatrix: initialTransformMatrix })
      })

      it('should scale out the transform matrix on mouse wheel', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            width={width}
            zoomingComponent={StubComponent}
            zooming
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

        testEvent({ wrapper, type: 'wheel', event: zoomOutEvent, previousTransformMatrix: zoomedInTransformMatrix })
      })

      it('should scale in the transform matrix on double click', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            width={width}
            zoomingComponent={StubComponent}
            zooming
          />
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'dblclick', previousTransformMatrix: initialTransformMatrix })
      })

      it('should scale in the transform matrix on key down with =', function () {
        const keyDownEvent = {
          key: '=',
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }

        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            onKeyDown={sinon.stub().callsFake(() => wrapper.instance().zoomIn())}
            width={width}
            zoomingComponent={StubComponent}
            zooming
          />
        )

        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'keydown', event: keyDownEvent, previousTransformMatrix: initialTransformMatrix })
      })

      it('should scale in the transform matrix on key down with +', function () {
        const keyDownEvent = {
          key: '+',
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }

        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            onKeyDown={sinon.stub().callsFake(() => wrapper.instance().zoomIn())}
            width={width}
            zoomingComponent={StubComponent}
            zooming
          />
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'keydown', event: keyDownEvent, previousTransformMatrix: initialTransformMatrix })
      })

      it('should scale out the transform matrix on key down with -', function () {
        const zoomInEvent = {
          key: '+',
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }
        const keyDownEvent = {
          key: '-',
          clientX: 50,
          clientY: 50,
          deltaY: 1,
          preventDefault: sinon.spy()
        }

        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            onKeyDown={sinon.stub().callsFake((event) => {
              if (event.key === '+') wrapper.instance().zoomIn()
              if (event.key === '-') wrapper.instance().zoomOut()
            })}
            width={width}
            zoomingComponent={StubComponent}
            zooming
          />
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // zooming in first so we don't hit the minimum constraint
        wrapper.find(ZoomEventLayer).simulate('keydown', zoomInEvent)
        wrapper.find(ZoomEventLayer).simulate('keydown', zoomInEvent)
        const previousTransformMatrix = wrapper.instance().zoom.transformMatrix

        testEvent({ wrapper, type: 'keydown', event: keyDownEvent, previousTransformMatrix })
      })

      it('should scale out the transform matrix on key down with _', function () {
        const zoomInEvent = {
          key: '+',
          clientX: 50,
          clientY: 50,
          deltaY: -1,
          preventDefault: sinon.spy()
        }
        const keyDownEvent = {
          key: '_',
          clientX: 50,
          clientY: 50,
          deltaY: 1,
          preventDefault: sinon.spy()
        }

        const wrapper = mount(
          <VXZoom
            data={mockData}
            height={height}
            onKeyDown={sinon.stub().callsFake((event) => {
              if (event.key === '+') wrapper.instance().zoomIn()
              if (event.key === '_') wrapper.instance().zoomOut()
            })}
            width={width}
            zoomingComponent={StubComponent}
            zooming
          />
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // zooming in first so we don't hit the minimum constraint
        wrapper.find(ZoomEventLayer).simulate('keydown', zoomInEvent)
        wrapper.find(ZoomEventLayer).simulate('keydown', zoomInEvent)
        const previousTransformMatrix = wrapper.instance().zoom.transformMatrix

        testEvent({ wrapper, type: 'keydown', event: keyDownEvent, previousTransformMatrix })
      })

      describe('when zoom callback is called', function () {
        it('should scale transform matrix when zooming in', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              height={height}
              width={width}
              setOnZoom={setZoomCallback}
              zoomingComponent={StubComponent}
              zooming
            />
          )

          testZoomCallback({ wrapper, zoomType: 'zoomin' })
        })

        it('should scale transform matrix when zooming out', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              height={height}
              width={width}
              setOnZoom={setZoomCallback}
              zoomingComponent={StubComponent}
              zooming
            />
          )
          // zoom in first
          zoomCallback('zoomin')
          zoomCallback('zoomin')

          testZoomCallback({ wrapper, zoomType: 'zoomout' })
        })

        it('should scale transform matrix when resetting zoom', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              height={height}
              width={width}
              setOnZoom={setZoomCallback}
              zoomingComponent={StubComponent}
              zooming
            />
          )

          // zooming in first
          zoomCallback('zoomin')
          testZoomCallback({ wrapper, zoomType: 'zoomto' })
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
            height={height}
            width={width}
            zoomingComponent={StubComponent}
            zooming
          />
        )

        const events = ['keydown', 'mousedown', 'mouseup', 'mousemove', 'mouseleave']
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
      xit('should translate the SVG position using mouse events', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            panning
            height={height}
            width={width}
            zoomingComponent={StubComponent}
            zooming
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
        // visx switched to typescript and are type checking the event
        // Enzyme's SyntheticEvent fails their type check, so these tests fail
        // because the handler for the event is never called
        // So we can't actually test the outcome of panning.
        // TODO: Add SyntheticEvent to their allowed types?
        // expect(pannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
        // expect(pannedTransformMatrix.translateX).to.equal(initialTransformMatrix.translateX - 5)
        // expect(pannedTransformMatrix.translateY).to.equal(initialTransformMatrix.translateY - 5)
      })

      describe('keydown', function () {
        let wrapper
        beforeEach(function () {
          wrapper = mount(
            <VXZoom
              data={mockData}
              panning
              height={height}
              onKeyDown={sinon.stub().callsFake((event) => {
                if (event.key === 'ArrowRight') wrapper.instance().onPan(1, 0)
                if (event.key === 'ArrowLeft') wrapper.instance().onPan(-1, 0)
                if (event.key === 'ArrowUp') wrapper.instance().onPan(0, -1)
                if (event.key === 'ArrowDown') wrapper.instance().onPan(0, 1)
              })}
              width={width}
              zoomingComponent={StubComponent}
              zooming
            />
          )
        })

        it('should translate the SVG position using ArrowRight', function () {
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the zoom boundary constraints
          eventLayer.simulate('dblclick', {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          })
          const zoomedTransformMatrix = wrapper.instance().zoom.transformMatrix
          // Now to simulate the panning
          eventLayer.simulate('keydown', {
            key: 'ArrowRight'
          })
          const rightPannedTransformMatrix = wrapper.instance().zoom.transformMatrix
          expect(rightPannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          expect(rightPannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          expect(rightPannedTransformMatrix.translateX).to.equal(zoomedTransformMatrix.translateX - 20)
          expect(rightPannedTransformMatrix.translateY).to.equal(zoomedTransformMatrix.translateY)
        })

        it('should translate the SVG position using ArrowDown', function () {
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the zoom boundary constraints
          eventLayer.simulate('dblclick', {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          })
          const zoomedTransformMatrix = wrapper.instance().zoom.transformMatrix

          eventLayer.simulate('keydown', {
            key: 'ArrowDown'
          })
          const downPannedTransformMatrix = wrapper.instance().zoom.transformMatrix
          expect(downPannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          expect(downPannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          expect(downPannedTransformMatrix.translateX).to.equal(zoomedTransformMatrix.translateX)
          expect(downPannedTransformMatrix.translateY).to.equal(zoomedTransformMatrix.translateY - 20)
        })

        it('should translate the SVG position using ArrowLeft', function () {
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the zoom boundary constraints
          eventLayer.simulate('dblclick', {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          })
          const zoomedTransformMatrix = wrapper.instance().zoom.transformMatrix

          eventLayer.simulate('keydown', {
            key: 'ArrowLeft'
          })
          const leftPannedTransformMatrix = wrapper.instance().zoom.transformMatrix
          expect(leftPannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          expect(leftPannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          expect(leftPannedTransformMatrix.translateX).to.equal(zoomedTransformMatrix.translateX + 20)
          expect(leftPannedTransformMatrix.translateY).to.equal(zoomedTransformMatrix.translateY)
        })

        it('should translate the SVG position using ArrowUp', function () {
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the zoom boundary constraints
          eventLayer.simulate('dblclick', {
            clientX: 50,
            clientY: 50,
            deltaY: -1,
            preventDefault: sinon.spy()
          })
          const zoomedTransformMatrix = wrapper.instance().zoom.transformMatrix

          eventLayer.simulate('keydown', {
            key: 'ArrowUp',
          })

          const upPannedTransformMatrix = wrapper.instance().zoom.transformMatrix
          expect(upPannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          expect(upPannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          expect(upPannedTransformMatrix.translateX).to.equal(zoomedTransformMatrix.translateX)
          expect(upPannedTransformMatrix.translateY).to.equal(zoomedTransformMatrix.translateY + 20)
        })
      })
    })
  })

  describe('data boundary constraints', function () {
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
            panning
            height={height}
            width={width}
            zoomingComponent={StubComponent}
            zoomConfiguration={zoomConfiguration}
            zooming
          />
        )
        const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // multiplying the scale 1.2 nine times is 5.159780352,
        // so the eighth double click event is the last one before the max zoom boundary is hit.
        let eightTimesZoomedMatrix
        for (let i = 0; i < 10; i++) {
          wrapper.find(ZoomEventLayer).simulate('dblclick', zoomInEventMock)
          if (i === 8) { // eighth event
            eightTimesZoomedMatrix = wrapper.instance().zoom.transformMatrix
          }
        }
        const zoomedTransformMatrix = wrapper.instance().zoom.transformMatrix

        expect(zoomedTransformMatrix).to.not.deep.equal(transformMatrix)
        expect(zoomedTransformMatrix.scaleX).to.be.below(zoomConfiguration.maxZoom)
        expect(zoomedTransformMatrix.scaleY).to.be.below(zoomConfiguration.maxZoom)
        expect(zoomedTransformMatrix.scaleX).to.equal(eightTimesZoomedMatrix.scaleX)
        expect(zoomedTransformMatrix.scaleY).to.equal(eightTimesZoomedMatrix.scaleY)
        expect(zoomedTransformMatrix.translateX).to.equal(eightTimesZoomedMatrix.translateX)
        expect(zoomedTransformMatrix.translateY).to.equal(eightTimesZoomedMatrix.translateY)
      })

      it('should not zoom out beyond the minimum zoom configuration and reset the zoom', function () {
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
            panning
            height={height}
            width={width}
            zoomingComponent={StubComponent}
            zoomConfiguration={zoomConfiguration}
            zooming
          />
        )
        const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // zoom in first
        wrapper.find(ZoomEventLayer).simulate('dblclick', zoomInEventMock)
        wrapper.find(ZoomEventLayer).simulate('dblclick', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.instance().zoom.transformMatrix
        expect(zoomedInTransformMatrix).to.not.deep.equal(initialTransformMatrix)

        // zoom out by mouse wheel
        // 1 * 1.2 * 1.2 * 0.8 is 1.152 then * 0.8 is 0.9216
        wrapper.find(ZoomEventLayer).simulate('wheel', {
          clientX: 50,
          clientY: 50,
          deltaY: 10,
          preventDefault: sinon.spy()
        })
        const firstZoomedOutTransformMatrix = wrapper.instance().zoom.transformMatrix
        wrapper.find(ZoomEventLayer).simulate('wheel', {
          clientX: 50,
          clientY: 50,
          deltaY: 10,
          preventDefault: sinon.spy()
        })
        const secondZoomedOutTransformMatrix = wrapper.instance().zoom.transformMatrix

        expect(secondZoomedOutTransformMatrix.scaleX).to.be.above(zoomConfiguration.minZoom)
        expect(secondZoomedOutTransformMatrix.scaleY).to.be.above(zoomConfiguration.minZoom)
        expect(secondZoomedOutTransformMatrix).to.not.deep.equal(zoomedInTransformMatrix)
        // The default vx behavior is to return the previous transform matrix
        expect(secondZoomedOutTransformMatrix).to.deep.equal(firstZoomedOutTransformMatrix)
      })
    })
  })
})
