import { act, createEvent, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import sinon from 'sinon'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import ZoomingScatterPlot from './ZoomingScatterPlot'
import ScatterPlot from '../ScatterPlot'
import ZoomEventLayer from '../../../SVGComponents/ZoomEventLayer'
import zooTheme from '@zooniverse/grommet-theme'
import {
  dataSeriesWithXErrors,
  parentHeight as height,
  parentWidth as width
} from '../../helpers/mockData'
import { expect } from 'chai'

describe.only('Component > ZoomingScatterPlot', function() {
  const mockData = [{
    seriesData: [{ x: 1, y: 6 }, { x: 10, y: 1 }],
    seriesOptions: {
      label: 'My data'
    }
  }]

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

  it('should render without crashing', function() {
    const output = render(
      <Provider classifierStore={mockStore}>
        <ZoomingScatterPlot
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          theme={zooTheme}
          xAxisLabelOffset={10}
          yAxisLabelOffset={10}
        />
      </Provider>
    )
    expect(output).to.be.ok()
  })

  it('should render a scatter plot', function () {
    const output = render(
      <Provider classifierStore={mockStore}>
        <ZoomingScatterPlot
          data={mockData}
          parentHeight={height}
          parentWidth={width}
          theme={zooTheme}
          xAxisLabelOffset={10}
          yAxisLabelOffset={10}
        />
      </Provider>
    )

    expect(output.getAllByRole('graphics-document')).to.have.lengthOf(1)
  })

  describe('when zooming', function () {
    describe('with the default configuration of allowing zoom in both directions', function () {
      it('should scale both axes and transform data points', function () {
        const { container, getByTestId } = render(
          <Provider classifierStore={mockStore}>
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              xAxisLabelOffset={10}
              yAxisLabelOffset={10}
            />
          </Provider>
        )

        // Original transform position and axes labels
        const pointTransformPreZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPreZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPreZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        // Zoomed in transform position and axes labels
        const pointTransformPostZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPreZoomIn).to.not.equal(pointTransformPostZoomIn)
        // The the scales change, therefore the labels of the ticks change
        expect(xAxisLabelPreZoomIn).to.not.equal(xAxisLabelPostZoomIn)
        expect(yAxisLabelPreZoomIn).to.not.equal(yAxisLabelPostZoomIn)
      })

      it('should scale both axes out and and transform data points', function () {
        const { container, getByTestId } = render(
          <Provider classifierStore={mockStore}>
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              xAxisLabelOffset={10}
              yAxisLabelOffset={10}
            />
          </Provider>
        )

        // Original transform position and axes labels
        const pointTransformPreZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPreZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPreZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        // We zoom in twice to make sure we don't hit the zoom out constrain limit
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        // Zoomed in transform position and axes labels
        const pointTransformPostZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPreZoomIn).to.not.equal(pointTransformPostZoomIn)
        // The the scales change, therefore the labels of the ticks change
        expect(xAxisLabelPreZoomIn).to.not.equal(xAxisLabelPostZoomIn)
        expect(yAxisLabelPreZoomIn).to.not.equal(yAxisLabelPostZoomIn)
        // Zoom out
        fireEvent.wheel(getByTestId('zoom-layer'), zoomOutEventMock)
        const pointTransformPostZoomOut = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomOut = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomOut = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPostZoomIn).to.not.equal(pointTransformPostZoomOut)
        // The the scales change, therefore the labels of the ticks change
        expect(xAxisLabelPostZoomIn).to.not.equal(xAxisLabelPostZoomOut)
        expect(yAxisLabelPostZoomIn).to.not.equal(yAxisLabelPostZoomOut)
      })

      it('should reset the scale when zooming out beyond the minimum scale', function () {
        const { container, getByTestId } = render(
          <Provider classifierStore={mockStore}>
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              xAxisLabelOffset={10}
              yAxisLabelOffset={10}
            />
          </Provider>
        )

        // Original transform position and axes labels
        const pointTransformPreZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPreZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPreZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        // We zoom in once to make sure we hit the zoom out constraint next
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        // Zoomed in transform position and axes labels
        const pointTransformPostZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPreZoomIn).to.not.equal(pointTransformPostZoomIn)
        // The the scales change, therefore the labels of the ticks change
        expect(xAxisLabelPreZoomIn).to.not.equal(xAxisLabelPostZoomIn)
        expect(yAxisLabelPreZoomIn).to.not.equal(yAxisLabelPostZoomIn)
        // Zoom out
        fireEvent.wheel(getByTestId('zoom-layer'), zoomOutEventMock)
        const pointTransformPostZoomOut = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomOut = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomOut = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        // The the scales and transform are reset
        expect(pointTransformPostZoomOut).to.equal(pointTransformPreZoomIn)
        expect(xAxisLabelPostZoomOut).to.equal(xAxisLabelPreZoomIn)
        expect(yAxisLabelPostZoomOut).to.equal(yAxisLabelPreZoomIn)
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
        const { container, getByTestId } = render(
          <Provider classifierStore={mockStore}>
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              xAxisLabelOffset={10}
              yAxisLabelOffset={10}
              zoomConfiguration={zoomConfig}
            />
          </Provider>
        )

        // Original transform position and axes labels
        const pointTransformPreZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPreZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPreZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        // Zoomed in transform position and axes labels
        const pointTransformPostZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPreZoomIn).to.not.equal(pointTransformPostZoomIn)
        // The the scales change, therefore the labels of the ticks change only for the x-axis
        expect(xAxisLabelPreZoomIn).to.not.equal(xAxisLabelPostZoomIn)
        expect(yAxisLabelPreZoomIn).to.equal(yAxisLabelPostZoomIn)
      })

      it('should scale the x-axis out', function () {
        const { container, getByTestId } = render(
          <Provider classifierStore={mockStore}>
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              xAxisLabelOffset={10}
              yAxisLabelOffset={10}
              zoomConfiguration={zoomConfig}
            />
          </Provider>
        )

        // Original transform position and axes labels
        const pointTransformPreZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPreZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPreZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        // We zoom in twice to make sure we don't hit the zoom out constrain limit
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        // Zoomed in transform position and axes labels
        const pointTransformPostZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPreZoomIn).to.not.equal(pointTransformPostZoomIn)
        // The the scales change, therefore the labels of the ticks change only for the x-axis
        expect(xAxisLabelPreZoomIn).to.not.equal(xAxisLabelPostZoomIn)
        expect(yAxisLabelPreZoomIn).to.equal(yAxisLabelPostZoomIn)
        // Zoom out
        fireEvent.wheel(getByTestId('zoom-layer'), zoomOutEventMock)
        const pointTransformPostZoomOut = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomOut = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomOut = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPostZoomIn).to.not.equal(pointTransformPostZoomOut)
        // The the scales change, therefore the labels of the ticks change only for the x-axis
        expect(xAxisLabelPostZoomIn).to.not.equal(xAxisLabelPostZoomOut)
        expect(yAxisLabelPostZoomIn).to.equal(yAxisLabelPostZoomOut)
      })

      it('should reset the x-scale when zooming out beyond the minimum', function () {
        const { container, getByTestId } = render(
          <Provider classifierStore={mockStore}>
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              xAxisLabelOffset={10}
              yAxisLabelOffset={10}
              zoomConfiguration={zoomConfig}
            />
          </Provider>
        )

        // Original transform position and axes labels
        const pointTransformPreZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPreZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPreZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        // We zoom in once to make sure we hit the zoom out constraint next
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        // Zoomed in transform position and axes labels
        const pointTransformPostZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPreZoomIn).to.not.equal(pointTransformPostZoomIn)
        // The the scales change, therefore the labels of the ticks change for the x-axis
        expect(xAxisLabelPreZoomIn).to.not.equal(xAxisLabelPostZoomIn)
        expect(yAxisLabelPreZoomIn).to.equal(yAxisLabelPostZoomIn)
        // Zoom out
        fireEvent.wheel(getByTestId('zoom-layer'), zoomOutEventMock)
        const pointTransformPostZoomOut = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomOut = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomOut = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        // The the scales and transform are reset
        expect(pointTransformPostZoomOut).to.equal(pointTransformPreZoomIn)
        expect(xAxisLabelPostZoomOut).to.equal(xAxisLabelPreZoomIn)
        expect(yAxisLabelPostZoomOut).to.equal(yAxisLabelPreZoomIn)
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
        const { container, getByTestId } = render(
          <Provider classifierStore={mockStore}>
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              xAxisLabelOffset={10}
              yAxisLabelOffset={10}
              zoomConfiguration={zoomConfig}
            />
          </Provider>
        )

        // Original transform position and axes labels
        const pointTransformPreZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPreZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPreZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        // Zoomed in transform position and axes labels
        const pointTransformPostZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPreZoomIn).to.not.equal(pointTransformPostZoomIn)
        // The the scales change, therefore the labels of the ticks change only for the y-axis
        expect(xAxisLabelPreZoomIn).to.equal(xAxisLabelPostZoomIn)
        expect(yAxisLabelPreZoomIn).to.not.equal(yAxisLabelPostZoomIn)
      })

      it('should scale the y-axis out', function () {
        const { container, getByTestId } = render(
          <Provider classifierStore={mockStore}>
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              xAxisLabelOffset={10}
              yAxisLabelOffset={10}
              zoomConfiguration={zoomConfig}
            />
          </Provider>
        )

        // Original transform position and axes labels
        const pointTransformPreZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPreZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPreZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        // We zoom in twice to make sure we don't hit the zoom out constrain limit
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        // Zoomed in transform position and axes labels
        const pointTransformPostZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPreZoomIn).to.not.equal(pointTransformPostZoomIn)
        // The the scales change, therefore the labels of the ticks change only for the y-axis
        expect(xAxisLabelPreZoomIn).to.equal(xAxisLabelPostZoomIn)
        expect(yAxisLabelPreZoomIn).to.not.equal(yAxisLabelPostZoomIn)
        // Zoom out
        fireEvent.wheel(getByTestId('zoom-layer'), zoomOutEventMock)
        const pointTransformPostZoomOut = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomOut = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomOut = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPostZoomIn).to.not.equal(pointTransformPostZoomOut)
        // The the scales change, therefore the labels of the ticks change only for the y-axis
        expect(xAxisLabelPostZoomIn).to.equal(xAxisLabelPostZoomOut)
        expect(yAxisLabelPostZoomIn).to.not.equal(yAxisLabelPostZoomOut)
      })

      it('should reset the y-scale when zooming out beyond the minimum', function () {
        const { container, getByTestId } = render(
          <Provider classifierStore={mockStore}>
            <ZoomingScatterPlot
              data={mockData}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              xAxisLabelOffset={10}
              yAxisLabelOffset={10}
              zoomConfiguration={zoomConfig}
            />
          </Provider>
        )

        // Original transform position and axes labels
        const pointTransformPreZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPreZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPreZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        // We zoom in once to make sure we hit the zoom out constraint next
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        // Zoomed in transform position and axes labels
        const pointTransformPostZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomIn = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomIn = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPreZoomIn).to.not.equal(pointTransformPostZoomIn)
        // The the scales change, therefore the labels of the ticks change for the x-axis
        expect(xAxisLabelPreZoomIn).to.equal(xAxisLabelPostZoomIn)
        expect(yAxisLabelPreZoomIn).to.not.equal(yAxisLabelPostZoomIn)
        // Zoom out
        fireEvent.wheel(getByTestId('zoom-layer'), zoomOutEventMock)
        const pointTransformPostZoomOut = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZoomOut = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZoomOut = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        // The the scales and transform are reset
        expect(pointTransformPostZoomOut).to.equal(pointTransformPreZoomIn)
        expect(xAxisLabelPostZoomOut).to.equal(xAxisLabelPreZoomIn)
        expect(yAxisLabelPostZoomOut).to.equal(yAxisLabelPreZoomIn)
      })
    })
  })

  describe.only('panning', function () {
    describe('when panning is disabled', function () {
      it('should not translate the SVG position', function () {
        const { container, getByTestId } = render(
          <Provider classifierStore={mockStore}>
            <ZoomingScatterPlot
              data={mockData}
              panning={false}
              parentHeight={height}
              parentWidth={width}
              theme={zooTheme}
              xAxisLabelOffset={10}
              yAxisLabelOffset={10}
            />
          </Provider>
        )

        const eventMock = {
          preventDefault: sinon.spy()
        }
        // Original transform position and axes labels
        const pointTransformPrePanning = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPrePanning = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPrePanning = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        // Simulate panning
        fireEvent.mouseDown(getByTestId('zoom-layer'), eventMock)
        fireEvent.mouseMove(getByTestId('zoom-layer'), eventMock)
        fireEvent.mouseUp(getByTestId('zoom-layer'), eventMock)
        fireEvent.mouseLeave(getByTestId('zoom-layer'), eventMock)
        // Original transform position and axes labels
        const pointTransformPostPanning = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostPanning = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostPanning = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
        expect(pointTransformPrePanning).to.equal(pointTransformPostPanning)
        expect(xAxisLabelPrePanning).to.equal(xAxisLabelPostPanning)
        expect(yAxisLabelPrePanning).to.equal(yAxisLabelPostPanning)
      })
    })

    describe('when panning is enabled', function () {
      describe.only('with the default configuration allowing pan in both directions', function () {
        it('should transform the data points and scale the axes', function () {
          const { container, getByTestId } = render(
            <Provider classifierStore={mockStore}>
              <ZoomingScatterPlot
                data={mockData}
                panning={false}
                parentHeight={height}
                parentWidth={width}
                theme={zooTheme}
                xAxisLabelOffset={10}
                yAxisLabelOffset={10}
              />
            </Provider>
          )

          const eventLayer = getByTestId('zoom-layer')

          // We zoom in a bit so we don't run into the data boundary constraints
          // fireEvent.wheel(eventLayer, zoomInEventMock)

          // The position and labels prior to panning
          const pointTransformPrePanning = container.querySelector('.visx-glyph').getAttribute('transform')
          const xAxisLabelPrePanning = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
          const yAxisLabelPrePanning = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

          screen.debug()
          // // Now to simulate the panning
          fireEvent.mouseDown(eventLayer, {
            clientX: 50,
            clientY: 50
          })
          fireEvent.mouseMove(eventLayer, {
            clientX: 155,
            clientY: 155
          })
          fireEvent.mouseUp(eventLayer)
          // Get the changes post panning
          const pointTransformPostPanning = container.querySelector('.visx-glyph').getAttribute('transform')
          const xAxisLabelPostPanning = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
          const yAxisLabelPostPanning = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

          screen.debug()
          expect(pointTransformPrePanning).to.not.equal(pointTransformPostPanning)
          expect(xAxisLabelPrePanning).to.not.equal(xAxisLabelPostPanning)
          expect(yAxisLabelPrePanning).to.not.equal(yAxisLabelPostPanning)
        })
      })
    })
  })
})