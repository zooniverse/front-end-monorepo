import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import ZoomingScatterPlot from './ZoomingScatterPlot'
import ScatterPlot from '../ScatterPlot'
import ZoomEventLayer from '../../../SVGComponents/ZoomEventLayer'
import VXZoom from '../../../SVGComponents/VXZoom'
import zooTheme from '@zooniverse/grommet-theme'
import {
  data as mockData,
  parentHeight as height,
  parentWidth as width
} from '../../helpers/mockData'

const zoomInEventMock = {
  clientX: 50,
  clientY: 50,
  deltaY: -1,
  preventDefault: sinon.spy()
}

describe('Component > ZoomingScatterPlot', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <ZoomingScatterPlot
        data={mockData}
        parentHeight={height}
        parentWidth={width}
      />
    )
    expect(wrapper).to.be.ok()
  })

  it('should render the ScatterPlot component as a child', function () {
    const wrapper = mount(
      <ZoomingScatterPlot
        data={mockData}
        parentHeight={height}
        parentWidth={width}
        theme={zooTheme}
      />
    )
    expect(wrapper.find(ScatterPlot)).to.have.lengthOf(1)
  })

  describe('zooming', function () {
    let zoomCallback

    function setZoomCallback(callback) {
      zoomCallback = sinon.stub().callsFake(callback)
    }

    function testTransformations({ currentTransformMatrix, previousTransformMatrix, zoomValue, direction }) {
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

    function testEvent({ wrapper, type, event, previousTransformMatrix }) {
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
      testTransformations({ currentTransformMatrix, previousTransformMatrix, zoomValue, direction })
    }

    function testZoomCallback({ wrapper, zoomType }) {
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
      testTransformations({
        currentTransformMatrix: zoomedTransformMatrix,
        previousTransformMatrix,
        zoomValue,
        direction
      })
      zoomCallback.resetHistory()
    }

    describe('with the default configuration of allowing zoom in both directions', function () {
      it('should scale both axes in on mouse wheel', function () {
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            zoomingComponent={ScatterPlot}
            {...zoomingScatterPlotWrapper.props()}
          />
        )
        
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'wheel', previousTransformMatrix: initialTransformMatrix })
      })

      it('should scale both axes out on mouse wheel', function () {
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            zoomingComponent={ScatterPlot}
            {...zoomingScatterPlotWrapper.props()}
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

      it('should scale both axes on double click', function () {
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            zoomingComponent={ScatterPlot}
            {...zoomingScatterPlotWrapper.props()}
          />
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'dblclick', previousTransformMatrix: initialTransformMatrix })
      })

      describe('when zoom callback is called', function () {
        it('should scale both axes when zooming in', function () {
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              zoomingComponent={ScatterPlot}
              setOnZoom={setZoomCallback}
              {...zoomingScatterPlotWrapper.props()}
            />
          )
          testZoomCallback({ wrapper, zoomType: 'zoomin' })
        })

        it('should scale both axes when zooming out', function () {
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              zoomingComponent={ScatterPlot}
              setOnZoom={setZoomCallback}
              {...zoomingScatterPlotWrapper.props()}
            />
          )
          // zoom in first
          zoomCallback('zoomin')
          zoomCallback('zoomin')

          testZoomCallback({ wrapper, zoomType: 'zoomout' })
        })

        it('should scale both axes when resetting zoom', function () {
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              zoomingComponent={ScatterPlot}
              setOnZoom={setZoomCallback}
              {...zoomingScatterPlotWrapper.props()}
            />
          )

          // zooming in first
          zoomCallback('zoomin')
          testZoomCallback({ wrapper, zoomType: 'zoomto' })
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
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            zoomingComponent={ScatterPlot}
            zoomConfiguration={zoomConfiguration}
            {...zoomingScatterPlotWrapper.props()}
          />
        )

        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'wheel', previousTransformMatrix: initialTransformMatrix })
      })

      it('should scale the x-axis out on mouse wheel', function () {
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            zoomingComponent={ScatterPlot}
            zoomConfiguration={zoomConfiguration}
            {...zoomingScatterPlotWrapper.props()}
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

      it('should scale the x-axis on double click', function () {
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            zoomingComponent={ScatterPlot}
            zoomConfiguration={zoomConfiguration}
            {...zoomingScatterPlotWrapper.props()}
          />
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'dblclick', previousTransformMatrix: initialTransformMatrix })
      })

      describe('when the zoom callback is called', function () {
        it('should scale the x-axis when zooming in', function () {
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              setOnZoom={setZoomCallback}
              zoomingComponent={ScatterPlot}
              zoomConfiguration={zoomConfiguration}
              {...zoomingScatterPlotWrapper.props()}
            />
          )

          testZoomCallback({ wrapper, zoomType: 'zoomin' })
        })

        it('should scale the x-axis when zooming out', function () {
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              setOnZoom={setZoomCallback}
              zoomingComponent={ScatterPlot}
              zoomConfiguration={zoomConfiguration}
              {...zoomingScatterPlotWrapper.props()}
            />
          )
          // zoom in first
          zoomCallback('zoomin')
          zoomCallback('zoomin')

          testZoomCallback({ wrapper, zoomType: 'zoomout' })
        })

        it('should scale the x-axis when resetting zoom', function () {
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              setOnZoom={setZoomCallback}
              zoomingComponent={ScatterPlot}
              zoomConfiguration={zoomConfiguration}
              {...zoomingScatterPlotWrapper.props()}
            />
          )

          // zooming in first
          zoomCallback('zoomin')
          testZoomCallback({ wrapper, zoomType: 'zoomto' })
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
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            zoomingComponent={ScatterPlot}
            zoomConfiguration={zoomConfiguration}
            {...zoomingScatterPlotWrapper.props()}
          />
        )

        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'wheel', previousTransformMatrix: initialTransformMatrix })
      })

      it('should scale the y-axis out on mouse wheel', function () {
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            zoomingComponent={ScatterPlot}
            zoomConfiguration={zoomConfiguration}
            {...zoomingScatterPlotWrapper.props()}
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

      it('should scale the y-axis on double click', function () {
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            zoomingComponent={ScatterPlot}
            zoomConfiguration={zoomConfiguration}
            {...zoomingScatterPlotWrapper.props()}
          />
        )
        const { initialTransformMatrix, transformMatrix } = wrapper.instance().zoom
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        testEvent({ wrapper, type: 'dblclick', previousTransformMatrix: initialTransformMatrix })
      })

      describe('when the zoom callback is called', function () {
        it('should scale the y-axis when zooming in', function () {
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              setOnZoom={setZoomCallback}
              zoomingComponent={ScatterPlot}
              zoomConfiguration={zoomConfiguration}
              {...zoomingScatterPlotWrapper.props()}
            />
          )

          testZoomCallback({ wrapper, zoomType: 'zoomin' })
        })

        it('should scale the y-axis when zooming out', function () {
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              setOnZoom={setZoomCallback}
              zoomingComponent={ScatterPlot}
              zoomConfiguration={zoomConfiguration}
              {...zoomingScatterPlotWrapper.props()}
            />
          )
          // zoom in first
          zoomCallback('zoomin')
          zoomCallback('zoomin')

          testZoomCallback({ wrapper, zoomType: 'zoomout' })
        })

        it('should scale the y-axis when resetting zoom', function () {
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              setOnZoom={setZoomCallback}
              zoomingComponent={ScatterPlot}
              zoomConfiguration={zoomConfiguration}
              {...zoomingScatterPlotWrapper.props()}
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
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            zoomingComponent={ScatterPlot}
            {...zoomingScatterPlotWrapper.props()}
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
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              zoomingComponent={ScatterPlot}
              {...zoomingScatterPlotWrapper.props()}
            />
          )
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We zoom in a bit so we don't run into the data boundary constraints
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
            clientY: 50
          })
          eventLayer.simulate('mousemove', {
            clientX: 60,
            clientY: 60
          })
          eventLayer.simulate('mouseup')

          const pannedTransformMatrix = wrapper.instance().zoom.transformMatrix
          console.log(pannedTransformMatrix, zoomedTransformMatrix)
          expect(pannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          // expect(pannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
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
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              zoomingComponent={ScatterPlot}
              zoomConfiguration={zoomConfiguration}
              {...zoomingScatterPlotWrapper.props()}
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
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          const wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              panning={true}
              zoomingComponent={ScatterPlot}
              zoomConfiguration={zoomConfiguration}
              {...zoomingScatterPlotWrapper.props()}
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
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            panning={true}
            zoomingComponent={ScatterPlot}
            zoomConfiguration={zoomConfiguration}
            {...zoomingScatterPlotWrapper.props()}
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
        expect(zoomedTransformMatrix.scaleX).to.equal(zoomConfiguration.maxZoom)
        expect(zoomedTransformMatrix.scaleY).to.equal(zoomConfiguration.maxZoom)
        expect(zoomedTransformMatrix.translateX).to.equal(previousTransformMatrix.translateX)
        expect(zoomedTransformMatrix.translateY).to.equal(previousTransformMatrix.translateY)
      })

      it('should not zoom out beyond the minimum zoom configuration and reset the zoom', function () {
        const zoomingScatterPlotWrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />
        )
        const wrapper = mount(
          <VXZoom
            constrain={zoomingScatterPlotWrapper.instance().constrain}
            panning={true}
            zoomingComponent={ScatterPlot}
            {...zoomingScatterPlotWrapper.props()}
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

        expect(zoomedOutTransformMatrix).to.not.deep.equal(zoomedInTransformMatrix)
        expect(zoomedOutTransformMatrix).to.deep.equal(initialTransformMatrix)
      })
    })

    describe('when panning', function () {
      describe('in the x-axis direction', function () {
        let wrapper, eventLayer, isXAxisOutOfBoundsSpy
        before(function () {
          isXAxisOutOfBoundsSpy = sinon.spy(ZoomingScatterPlot.prototype, 'isXAxisOutOfBounds')
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              panning={true}
              zoomingComponent={ScatterPlot}
              {...zoomingScatterPlotWrapper.props()}
            />
          )
          eventLayer = wrapper.find(ZoomEventLayer)
        })

        afterEach(function () {
          isXAxisOutOfBoundsSpy.resetHistory()
          wrapper.instance().zoom.reset()
        })

        after(function () {
          isXAxisOutOfBoundsSpy.restore()
        })

        it('should not pan beyond the data extent minimum', function () {
          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          eventLayer.simulate('mousedown', {
            clientX: 10,
            clientY: 50
          })
          eventLayer.simulate('mousemove', {
            clientX: -250,
            clientY: 50
          })
          eventLayer.simulate('mouseup')

          expect(isXAxisOutOfBoundsSpy.returnValues[0]).to.be.true()
        })

        it('should not pan beyond the data extent maximum', function () {
          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          eventLayer.simulate('mousedown', {
            clientX: 90,
            clientY: 50
          })
          eventLayer.simulate('mousemove', {
            clientX: 250,
            clientY: 50
          })
          eventLayer.simulate('mouseup')

          expect(isXAxisOutOfBoundsSpy.returnValues[0]).to.be.true()
        })
      })

      describe('in the y-axis direction', function () {
        let wrapper, eventLayer, isYAxisOutOfBoundsSpy
        before(function () {
          isYAxisOutOfBoundsSpy = sinon.spy(ZoomingScatterPlot.prototype, 'isYAxisOutOfBounds')
          const zoomingScatterPlotWrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />
          )
          wrapper = mount(
            <VXZoom
              constrain={zoomingScatterPlotWrapper.instance().constrain}
              panning={true}
              zoomingComponent={ScatterPlot}
              {...zoomingScatterPlotWrapper.props()}
            />
          )
          eventLayer = wrapper.find(ZoomEventLayer)
        })

        afterEach(function () {
          isYAxisOutOfBoundsSpy.resetHistory()
          wrapper.instance().zoom.reset()
        })

        after(function () {
          isYAxisOutOfBoundsSpy.restore()
        })

        it('should not pan beyond the data extent minimum', function () {
          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          eventLayer.simulate('mousedown', {
            clientX: 50,
            clientY: 90
          })
          eventLayer.simulate('mousemove', {
            clientX: 50,
            clientY: 250
          })
          eventLayer.simulate('mouseup')

          expect(isYAxisOutOfBoundsSpy.returnValues[0]).to.be.true()
        })

        it('should not pan beyond the data extent maximum', function () {
          const { transformMatrix, initialTransformMatrix } = wrapper.instance().zoom
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          eventLayer.simulate('mousedown', {
            clientX: 50,
            clientY: 10
          })
          eventLayer.simulate('mousemove', {
            clientX: 50,
            clientY: -250
          })
          eventLayer.simulate('mouseup')

          expect(isYAxisOutOfBoundsSpy.returnValues[0]).to.be.true()
        })
      })
    })
  })
})
