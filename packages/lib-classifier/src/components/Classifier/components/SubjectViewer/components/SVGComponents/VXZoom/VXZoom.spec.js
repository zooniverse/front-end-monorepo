import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import { Zoom } from '@vx/zoom'
import {
  data as mockData,
} from '../../ScatterPlotViewer/helpers/mockData'
import VXZoom from './VXZoom'
import ZoomEventLayer from '../ZoomEventLayer'

function StubComponent({ children }) {
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

describe('Component > VXZoom', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <VXZoom
        data={mockData}
        parentHeight={height}
        parentWidth={width}
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
          parentHeight={height}
          parentWidth={width}
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
          parentHeight={height}
          parentWidth={width}
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
          parentHeight={height}
          parentWidth={width}
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
          parentHeight={height}
          parentWidth={width}
          zoomingComponent={StubComponent}
        />
      )
      expect(wrapper.find(Zoom).props().height).to.equal(height)
      expect(wrapper.find(Zoom).props().width).to.equal(width)
    })

    it('should pass along the constrain function set in props', function () {
      const constrainSpy = sinon.spy()
      const wrapper = shallow(
        <VXZoom
          constrain={constrainSpy}
          data={mockData}
          parentHeight={height}
          parentWidth={width}
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
          parentHeight={height}
          parentWidth={width}
          zoomingComponent={StubComponent}
        />
      )

      expect(wrapper.find(StubComponent)).to.have.lengthOf(1)
    })

    it('should pass the Zoom child function return value transformMatrix as a prop', function () {
      const wrapper = mount(
        <VXZoom
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          zoomingComponent={StubComponent}
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
          zoomingComponent={StubComponent}
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

      it('should not scale the transform matrix on mouse wheel', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            zoomingComponent={StubComponent}
          />
        )
        testEventPrevention(wrapper, 'wheel')
      })

      it('should not scale the transform matrix on double click', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            zoomingComponent={StubComponent}
          />
        )
        testEventPrevention(wrapper, 'dblclick')
      })

      it('should not scale the transform matrix when zoom callback is called', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            parentHeight={height}
            parentWidth={width}
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
          testNoZoom(transformMatrixAfterZoomInCall, initialTransformMatrix)
          wrapper.instance().zoom.reset()
        })
        zoomCallback.resetHistory()
      })
    })

    describe('when zooming is enabled', function () {
      function testTransformations(currentTransformMatrix, previousTransformMatrix, zoomValue) {
        expect(currentTransformMatrix.scaleX).to.equal(previousTransformMatrix.scaleX * zoomValue)
        expect(currentTransformMatrix.scaleY).to.equal(previousTransformMatrix.scaleY * zoomValue)
      }

      function testEvent (wrapper, type, event, previousTransformMatrix) {
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
        testTransformations(currentTransformMatrix, previousTransformMatrix, zoomValue)
      }

      function testZoomCallback (wrapper, zoomType) {
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
        testTransformations(zoomedTransformMatrix, previousTransformMatrix, zoomValue)
        zoomCallback.resetHistory()
      }

      it('should scale in the transform matrix on mouse wheel', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            zoomingComponent={StubComponent}
            zooming={true}
          />
        )

        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent(wrapper, 'wheel', null, initialTransformMatrix)
      })

      it('should scale out the transform matrix on mouse wheel', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            zoomingComponent={StubComponent}
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

      it('should scale in the transform matrix on double click', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            zoomingComponent={StubComponent}
            zooming={true}
          />
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent(wrapper, 'dblclick', null, initialTransformMatrix)
      })

      describe('when zoom callback is called', function () {
        it('should scale transform matrix when zooming in', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              setOnZoom={setZoomCallback}
              zoomingComponent={StubComponent}
              zooming={true}
            />
          )

          testZoomCallback(wrapper, 'zoomin')
        })

        it('should scale transform matrix when zooming out', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              setOnZoom={setZoomCallback}
              zoomingComponent={StubComponent}
              zooming={true}
            />
          )
          // zoom in first
          zoomCallback('zoomin')
          zoomCallback('zoomin')

          testZoomCallback(wrapper, 'zoomout')
        })

        it('should scale transform matrix when resetting zoom', function () {
          const wrapper = mount(
            <VXZoom
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              setOnZoom={setZoomCallback}
              zoomingComponent={StubComponent}
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

  describe('panning', function () {
    describe('when panning is disabled', function () {
      it('should not translate the SVG position', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            panning={true}
            parentHeight={height}
            parentWidth={width}
            zoomingComponent={StubComponent}
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
      it('should translate the SVG position', function () {
        const wrapper = mount(
          <VXZoom
            data={mockData}
            panning={true}
            parentHeight={height}
            parentWidth={width}
            zoomingComponent={StubComponent}
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
            panning={true}
            parentHeight={height}
            parentWidth={width}
            zoomingComponent={StubComponent}
            zoomConfiguration={zoomConfiguration}
            zooming={true}
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
            panning={true}
            parentHeight={height}
            parentWidth={width}
            zoomingComponent={StubComponent}
            zoomConfiguration={zoomConfiguration}
            zooming={true}
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