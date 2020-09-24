import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import ZoomingScatterPlot from './ZoomingScatterPlot'
import ScatterPlot from '../ScatterPlot'
import ZoomEventLayer from '../../../SVGComponents/ZoomEventLayer'
import zooTheme from '@zooniverse/grommet-theme'
import {
  randomSingleSeriesData,
  parentHeight as height,
  parentWidth as width
} from '../../helpers/mockData'

const mockData = randomSingleSeriesData.data

const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  fieldGuide: {},
  subjectViewer: SubjectViewerStore.create({}),
  workflowSteps: {
    activeStepTasks: []
  }
}

const zoomInEventMock = {
  clientX: 50,
  clientY: 50,
  deltaY: -1,
  preventDefault: sinon.spy()
}

const zoomOutEventMock = {
  clientX: 50,
  clientY: 50,
  deltaY: 10,
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
      />,
      { 
        wrappingComponent: Provider,
        wrappingComponentProps: {
          classifierStore: mockStore
        }
      }
    )
    expect(wrapper.find(ScatterPlot)).to.have.lengthOf(1)
  })

  describe('zooming', function () {
    function testTransformations ({ currentTransformMatrix, previousTransformMatrix, zoomValue, direction }) {
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

    describe('with the default configuration of allowing zoom in both directions', function () {
      it('should scale both axes in', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )

        const { initialTransformMatrix, transformMatrix, zoomConfiguration } = wrapper.find(ScatterPlot).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)

        const zoomedInTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
        testTransformations({
          currentTransformMatrix: zoomedInTransformMatrix,
          previousTransformMatrix: initialTransformMatrix,
          zoomValue: zoomConfiguration.zoomInValue,
          direction: 'both'
        })
      })

      it('should scale both axes out', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )

        const { initialTransformMatrix, transformMatrix, zoomConfiguration } = wrapper.find(ScatterPlot).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // zooming in first
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

        wrapper.find(ZoomEventLayer).simulate('wheel', zoomOutEventMock)
        const zoomedOutTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

        testTransformations({
          currentTransformMatrix: zoomedOutTransformMatrix,
          previousTransformMatrix: zoomedInTransformMatrix,
          zoomValue: zoomConfiguration.zoomOutValue,
          direction: 'both'
        })
      })

      it('should reset the scale when zooming out beyond the minimum scale', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )
        const { initialTransformMatrix } = wrapper.find(ScatterPlot).props()

        // zooming in first
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
        expect(zoomedInTransformMatrix.scaleX).to.not.equal(initialTransformMatrix.scaleX)
        expect(zoomedInTransformMatrix.scaleY).to.not.equal(initialTransformMatrix.scaleY)

        wrapper.find(ZoomEventLayer).simulate('wheel', zoomOutEventMock)
        const zoomedOutTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
        expect(zoomedOutTransformMatrix.scaleX).to.equal(initialTransformMatrix.scaleX)
        expect(zoomedOutTransformMatrix.scaleY).to.equal(initialTransformMatrix.scaleY)
      })
    })

    describe('when only zooming the x-axis', function () {
      let zoomConfig
      before(function () {
        zoomConfig = {
          direction: 'x',
          minZoom: 1,
          maxZoom: 10,
          zoomInValue: 1.2,
          zoomOutValue: 0.8
        }
      })

      it('should scale the x-axis in', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
            zoomConfiguration={zoomConfig}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )

        const { initialTransformMatrix, transformMatrix, zoomConfiguration } = wrapper.find(ScatterPlot).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

        testTransformations({
          currentTransformMatrix: zoomedInTransformMatrix,
          previousTransformMatrix: initialTransformMatrix,
          zoomValue: zoomConfiguration.zoomInValue,
          direction: 'x'
        })
      })

      it('should scale the x-axis out', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
            zoomConfiguration={zoomConfig}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )

        const { initialTransformMatrix, transformMatrix, zoomConfiguration } = wrapper.find(ScatterPlot).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // zooming in first
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

        wrapper.find(ZoomEventLayer).simulate('wheel', zoomOutEventMock)
        const zoomedOutTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

        testTransformations({
          currentTransformMatrix: zoomedOutTransformMatrix,
          previousTransformMatrix: zoomedInTransformMatrix,
          zoomValue: zoomConfiguration.zoomOutValue,
          direction: 'x'
        })
      })

      it('should reset the x-scale when zooming out beyond the minimum', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
            zoomConfiguration={zoomConfig}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )

        const { initialTransformMatrix, zoomConfiguration } = wrapper.find(ScatterPlot).props()
        // zooming in first
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
        expect(zoomedInTransformMatrix.scaleX).to.not.equal(initialTransformMatrix.scaleX)
        expect(zoomedInTransformMatrix.scaleY).to.equal(initialTransformMatrix.scaleY)

        wrapper.find(ZoomEventLayer).simulate('wheel', zoomOutEventMock)
        const zoomedOutTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
        expect(zoomedOutTransformMatrix.scaleX).to.equal(initialTransformMatrix.scaleX)
        expect(zoomedOutTransformMatrix.scaleY).to.equal(initialTransformMatrix.scaleY)

        testTransformations({
          currentTransformMatrix: zoomedInTransformMatrix,
          previousTransformMatrix: zoomedOutTransformMatrix,
          zoomValue: zoomConfiguration.zoomInValue,
          direction: 'x'
        })
      })
    })

    describe('when only zooming the y-axis', function () {
      let zoomConfig
      before(function () {
        zoomConfig = {
          direction: 'y',
          minZoom: 1,
          maxZoom: 10,
          zoomInValue: 1.2,
          zoomOutValue: 0.8
        }
      })

      it('should scale the y-axis in', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
            zoomConfiguration={zoomConfig}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )

        const { initialTransformMatrix, transformMatrix, zoomConfiguration } = wrapper.find(ScatterPlot).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

        testTransformations({
          currentTransformMatrix: zoomedInTransformMatrix,
          previousTransformMatrix: initialTransformMatrix,
          zoomValue: zoomConfiguration.zoomInValue,
          direction: 'y'
        })
      })

      it('should scale the y-axis out', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
            zoomConfiguration={zoomConfig}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )

        const { initialTransformMatrix, transformMatrix, zoomConfiguration } = wrapper.find(ScatterPlot).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // zooming in first
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

        wrapper.find(ZoomEventLayer).simulate('wheel', zoomOutEventMock)
        const zoomedOutTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

        testTransformations({
          currentTransformMatrix: zoomedOutTransformMatrix,
          previousTransformMatrix: zoomedInTransformMatrix,
          zoomValue: zoomConfiguration.zoomOutValue,
          direction: 'y'
        })
      })

      it('should reset the y-scale when zooming out beyond the minimum', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
            zoomConfiguration={zoomConfig}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )

        const { initialTransformMatrix, zoomConfiguration } = wrapper.find(ScatterPlot).props()
        // zooming in first
        wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
        expect(zoomedInTransformMatrix.scaleX).to.equal(initialTransformMatrix.scaleX)
        expect(zoomedInTransformMatrix.scaleY).to.not.equal(initialTransformMatrix.scaleY)

        wrapper.find(ZoomEventLayer).simulate('wheel', zoomOutEventMock)
        const zoomedOutTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
        expect(zoomedOutTransformMatrix.scaleX).to.equal(initialTransformMatrix.scaleX)
        expect(zoomedOutTransformMatrix.scaleY).to.equal(initialTransformMatrix.scaleY)

        testTransformations({
          currentTransformMatrix: zoomedInTransformMatrix,
          previousTransformMatrix: zoomedOutTransformMatrix,
          zoomValue: zoomConfiguration.zoomInValue,
          direction: 'y'
        })
      })
    })
  })

  describe('panning', function () {
    describe('when panning is disabled', function () {
      it('should not translate the SVG position', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            panning={false}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )

        const events = ['mousedown', 'mouseup', 'mousemove', 'mouseleave']
        const eventMock = {
          preventDefault: sinon.spy()
        }

        events.forEach((event) => {
          wrapper.find(ZoomEventLayer).simulate(event, eventMock)
          const { transformMatrix, initialTransformMatrix } = wrapper.find(ScatterPlot).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)
        })
      })
    })

    describe('when panning is enabled', function () {
      describe('with the default configuration allowing pan in both directions', function () {
        it('should translate the SVG position', function () {
          const wrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />,
            {
              wrappingComponent: Provider,
              wrappingComponentProps: {
                classifierStore: mockStore
              }
            }
          )

          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.find(ScatterPlot).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We zoom in a bit so we don't run into the data boundary constraints
          eventLayer.simulate('dblclick', zoomInEventMock)
          const zoomedTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

          // Now to simulate the panning
          eventLayer.simulate('mousedown', {
            clientX: 50,
            clientY: 50
          })
          eventLayer.simulate('mousemove', {
            clientX: 55,
            clientY: 55
          })
          eventLayer.simulate('mouseup')

          const pannedTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
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
      })

      describe('when only panning the x-axis', function () {
        xit('should translate the SVG position', function () {
          const zoomConfiguration = {
            direction: 'x',
            minZoom: 1,
            maxZoom: 10,
            zoomInValue: 1.2,
            zoomOutValue: 0.8
          }
          const wrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              zoomConfiguration={zoomConfiguration}
            />,
            {
              wrappingComponent: Provider,
              wrappingComponentProps: {
                classifierStore: mockStore
              }
            }
          )

          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.find(ScatterPlot).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the data boundary constraints
          eventLayer.simulate('dblclick', zoomInEventMock)
          const zoomedTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

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

          const pannedTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
          expect(pannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          // visx switched to typescript and are type checking the event
          // Enzyme's SyntheticEvent fails their type check, so these tests fail
          // because the handler for the event is never called
          // So we can't actually test the outcome of panning.
          // TODO: Add SyntheticEvent to their allowed types?
          // expect(pannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          // expect(pannedTransformMatrix.translateX).to.equal(initialTransformMatrix.translateX - 5)
          // expect(pannedTransformMatrix.translateY).to.equal(initialTransformMatrix.translateY)
        })
      })

      describe('when only panning the y-axis', function () {
        xit('should translate the SVG position', function () {
          const zoomConfiguration = {
            direction: 'y',
            minZoom: 1,
            maxZoom: 10,
            zoomInValue: 1.2,
            zoomOutValue: 0.8
          }
          const wrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              zoomConfiguration={zoomConfiguration}
            />,
            {
              wrappingComponent: Provider,
              wrappingComponentProps: {
                classifierStore: mockStore
              }
            }
          )
          const eventLayer = wrapper.find(ZoomEventLayer)

          const { transformMatrix, initialTransformMatrix } = wrapper.find(ScatterPlot).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          // We enable zooming and zoom in a bit so we don't run into the data boundary constraints
          eventLayer.simulate('dblclick', zoomInEventMock)
          const zoomedTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

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

          const pannedTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
          expect(pannedTransformMatrix).to.not.deep.equal(initialTransformMatrix)
          // visx switched to typescript and are type checking the event
          // Enzyme's SyntheticEvent fails their type check, so these tests fail
          // because the handler for the event is never called
          // So we can't actually test the outcome of panning.
          // TODO: Add SyntheticEvent to their allowed types?
          // expect(pannedTransformMatrix).to.not.deep.equal(zoomedTransformMatrix)
          // expect(pannedTransformMatrix.translateX).to.equal(initialTransformMatrix.translateX)
          // expect(pannedTransformMatrix.translateY).to.equal(initialTransformMatrix.translateY - 5)
        })
      })
    })
  })

  describe('data boundary constraints', function () {
    describe('when zooming', function () {
      let zoomConfig
      before(function () {
        zoomConfig = {
          direction: 'both',
          minZoom: 1,
          maxZoom: 5,
          zoomInValue: 1.2,
          zoomOutValue: 0.8
        }
      })
      it('should not zoom in beyond maximum zoom configuration', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
            zoomConfiguration={zoomConfig}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )

        const { transformMatrix, initialTransformMatrix } = wrapper.find(ScatterPlot).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // multiplying the scale 1.2 nine times is 5.159780352
        let previousTransformMatrix
        for (let i = 0; i < 10; i++) {
          wrapper.find(ZoomEventLayer).simulate('dblclick', zoomInEventMock)
          if (i === 8) {
            previousTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
          }
        }
        const zoomedTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

        expect(zoomedTransformMatrix).to.not.deep.equal(transformMatrix)
        expect(zoomedTransformMatrix.scaleX).to.equal(zoomConfig.maxZoom)
        expect(zoomedTransformMatrix.scaleY).to.equal(zoomConfig.maxZoom)
        expect(zoomedTransformMatrix.translateX).to.equal(previousTransformMatrix.translateX)
        expect(zoomedTransformMatrix.translateY).to.equal(previousTransformMatrix.translateY)
      })

      it('should not zoom out beyond the minimum zoom configuration and reset the zoom', function () {
        const wrapper = mount(
          <ZoomingScatterPlot
            data={mockData}
            parentHeight={height}
            parentWidth={width}
            theme={zooTheme}
            zoomConfiguration={zoomConfig}
          />,
          {
            wrappingComponent: Provider,
            wrappingComponentProps: {
              classifierStore: mockStore
            }
          }
        )

        const { transformMatrix, initialTransformMatrix } = wrapper.find(ScatterPlot).props()
        expect(transformMatrix).to.deep.equal(initialTransformMatrix)

        // zoom in first
        wrapper.find(ZoomEventLayer).simulate('dblclick', zoomInEventMock)
        const zoomedInTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
        expect(zoomedInTransformMatrix).to.not.deep.equal(initialTransformMatrix)

        // zoom out by mouse wheel
        // 1 * 1.2 * 0.8 is 0.96
        wrapper.find(ZoomEventLayer).simulate('wheel', {
          clientX: 50,
          clientY: 50,
          deltaY: 10,
          preventDefault: sinon.spy()
        })
        const zoomedOutTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix

        expect(zoomedOutTransformMatrix).to.not.deep.equal(zoomedInTransformMatrix)
        expect(zoomedOutTransformMatrix).to.deep.equal(initialTransformMatrix)
      })
    })

    describe('when panning', function () {
      describe('in the x-axis direction', function () {
        let wrapper, eventLayer, isXAxisOutOfBoundsSpy
        before(function () {
          isXAxisOutOfBoundsSpy = sinon.spy(ZoomingScatterPlot.prototype, 'isXAxisOutOfBounds')
        })

        beforeEach(function () {
          wrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              panning
              theme={zooTheme}
            />,
            {
              wrappingComponent: Provider,
              wrappingComponentProps: {
                classifierStore: mockStore
              }
            }
          )

          eventLayer = wrapper.find(ZoomEventLayer)
        })

        afterEach(function () {
          isXAxisOutOfBoundsSpy.resetHistory()
        })

        after(function () {
          isXAxisOutOfBoundsSpy.restore()
        })

        xit('should not pan beyond the data extent minimum', function () {
          const { transformMatrix, initialTransformMatrix } = wrapper.find(ScatterPlot).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          eventLayer.simulate('mousedown', {
            clientX: 50,
            clientY: 50
          })
          eventLayer.simulate('mousemove', {
            clientX: -2000,
            clientY: 50
          })
          eventLayer.simulate('mouseup')

          // visx switched to typescript and are type checking the event
          // Enzyme's SyntheticEvent fails their type check, so these tests fail
          // because the handler for the event is never called
          // So we can't actually test the outcome of panning.
          // TODO: Add SyntheticEvent to their allowed types?
          expect(isXAxisOutOfBoundsSpy.returnValues[0]).to.be.true()
        })

        xit('should not pan beyond the data extent maximum', function () {
          const { transformMatrix, initialTransformMatrix } = wrapper.find(ScatterPlot).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          eventLayer.simulate('mousedown', {
            clientX: 50,
            clientY: 50
          })
          eventLayer.simulate('mousemove', {
            clientX: 2000,
            clientY: 50
          })
          eventLayer.simulate('mouseup')

          // visx switched to typescript and are type checking the event
          // Enzyme's SyntheticEvent fails their type check, so these tests fail
          // because the handler for the event is never called
          // So we can't actually test the outcome of panning.
          // TODO: Add SyntheticEvent to their allowed types?
          expect(isXAxisOutOfBoundsSpy.returnValues[0]).to.be.true()
        })
      })

      describe('in the y-axis direction', function () {
        let wrapper, eventLayer, isYAxisOutOfBoundsSpy
        before(function () {
          isYAxisOutOfBoundsSpy = sinon.spy(ZoomingScatterPlot.prototype, 'isYAxisOutOfBounds')
        })

        beforeEach(function () {
          wrapper = mount(
            <ZoomingScatterPlot
              data={mockData}
              panning
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
            />,
            {
              wrappingComponent: Provider,
              wrappingComponentProps: {
                classifierStore: mockStore
              }
            }
          )

          eventLayer = wrapper.find(ZoomEventLayer)
        })

        afterEach(function () {
          isYAxisOutOfBoundsSpy.resetHistory()
        })

        after(function () {
          isYAxisOutOfBoundsSpy.restore()
        })

        xit('should not pan beyond the data extent minimum', function () {
          const { transformMatrix, initialTransformMatrix } = wrapper.find(ScatterPlot).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          eventLayer.simulate('mousedown', {
            clientX: 50,
            clientY: 50
          })
          eventLayer.simulate('mousemove', {
            clientX: 50,
            clientY: -2000
          })
          eventLayer.simulate('mouseup')

          // visx switched to typescript and are type checking the event
          // Enzyme's SyntheticEvent fails their type check, so these tests fail
          // because the handler for the event is never called
          // So we can't actually test the outcome of panning.
          // TODO: Add SyntheticEvent to their allowed types?
          expect(isYAxisOutOfBoundsSpy.returnValues[0]).to.be.true()
        })

        xit('should not pan beyond the data extent maximum', function () {
          const { transformMatrix, initialTransformMatrix } = wrapper.find(ScatterPlot).props()
          expect(transformMatrix).to.deep.equal(initialTransformMatrix)

          eventLayer.simulate('mousedown', {
            clientX: 50,
            clientY: 50
          })
          eventLayer.simulate('mousemove', {
            clientX: 50,
            clientY: 2000
          })
          eventLayer.simulate('mouseup')

          // visx switched to typescript and are type checking the event
          // Enzyme's SyntheticEvent fails their type check, so these tests fail
          // because the handler for the event is never called
          // So we can't actually test the outcome of panning.
          // TODO: Add SyntheticEvent to their allowed types?
          expect(isYAxisOutOfBoundsSpy.returnValues[0]).to.be.true()
        })
      })
    })
  })
})
