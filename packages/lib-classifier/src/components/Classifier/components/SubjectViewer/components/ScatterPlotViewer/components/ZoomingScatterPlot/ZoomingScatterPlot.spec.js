import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import sinon from 'sinon'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import ZoomingScatterPlot from './ZoomingScatterPlot'
import zooTheme from '@zooniverse/grommet-theme'
import {
  parentHeight as height,
  parentWidth as width
} from '../../helpers/mockData'
import { expect } from 'chai'

describe('Component > ZoomingScatterPlot', function() {
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

    expect(output.getAllByTestId('data-vis-chart')).to.have.lengthOf(1)
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

  describe.skip('panning', function () {
    describe('when panning is disabled', function () {
      it('should not translate the SVG position', function () {
        render(
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
        const glyph = document.querySelector('.visx-glyph')
        const xAxisLabel = document.querySelector('.visx-axis-bottom')
        const yAxisLabel = document.querySelector('.visx-axis-left')
        // Original transform position and axes labels
        const pointTransformPrePanning = glyph.getAttribute('transform')
        const xAxisLabelPrePanning = xAxisLabel.querySelector('tspan').innerHTML
        const yAxisLabelPrePanning = yAxisLabel.querySelector('tspan').innerHTML
        // Simulate panning
        const zoomLayer = screen.getByTestId('zoom-layer')
        fireEvent.pointerDown(zoomLayer, eventMock)
        fireEvent.pointerMove(zoomLayer, eventMock)
        fireEvent.pointerUp(zoomLayer, eventMock)
        fireEvent.pointerLeave(zoomLayer, eventMock)
        // Original transform position and axes labels
        const pointTransformPostPanning = glyph.getAttribute('transform')
        const xAxisLabelPostPanning = xAxisLabel.querySelector('tspan').innerHTML
        const yAxisLabelPostPanning = yAxisLabel.querySelector('tspan').innerHTML
        expect(pointTransformPrePanning).to.equal(pointTransformPostPanning)
        expect(xAxisLabelPrePanning).to.equal(xAxisLabelPostPanning)
        expect(yAxisLabelPrePanning).to.equal(yAxisLabelPostPanning)
      })
    })

    describe('when panning is enabled', function () {
      describe('with the default configuration allowing pan in both directions', function () {
        it('should transform the data points and scale the axes', function () {
          render(
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

          const glyph = document.querySelector('.visx-glyph')
          const xAxisLabel = document.querySelector('.visx-axis-bottom')
          const yAxisLabel = document.querySelector('.visx-axis-left')
          // The position and labels prior to panning
          const pointTransformPrePanning = glyph.getAttribute('transform')
          const xAxisLabelPrePanning = xAxisLabel.querySelector('tspan').innerHTML
          const yAxisLabelPrePanning = yAxisLabel.querySelector('tspan').innerHTML

          // // Now to simulate the panning
          const zoomLayer = screen.getByTestId('zoom-layer')
          fireEvent.pointerDown(zoomLayer, {
            clientX: 50,
            clientY: 50
          })
          fireEvent.pointerMove(zoomLayer, {
            clientX: 155,
            clientY: 155
          })
          fireEvent.pointerUp(zoomLayer)

          // Get the changes post panning
          const pointTransformPostPanning = glyph.getAttribute('transform')
          const xAxisLabelPostPanning = xAxisLabel.querySelector('tspan').innerHTML
          const yAxisLabelPostPanning = yAxisLabel.querySelector('tspan').innerHTML

          expect(pointTransformPrePanning).to.not.equal(pointTransformPostPanning)
          expect(xAxisLabelPrePanning).to.not.equal(xAxisLabelPostPanning)
          expect(yAxisLabelPrePanning).to.not.equal(yAxisLabelPostPanning)
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

          render(
            <Provider classifierStore={mockStore}>
              <ZoomingScatterPlot
                data={mockData}
                parentHeight={height}
                parentWidth={width}
                theme={zooTheme}
                xAxisLabelOffset={10}
                yAxisLabelOffset={10}
                zoomConfiguration={zoomConfiguration}
              />
            </Provider>
          )

          const glyph = document.querySelector('.visx-glyph')
          const xAxisLabel = document.querySelector('.visx-axis-bottom')
          const yAxisLabel = document.querySelector('.visx-axis-left')
          // The position and labels prior to panning
          const pointTransformPrePanning = glyph.getAttribute('transform')
          const xAxisLabelPrePanning = xAxisLabel.querySelector('tspan').innerHTML
          const yAxisLabelPrePanning = yAxisLabel.querySelector('tspan').innerHTML

          // // Now to simulate the panning
          const zoomLayer = screen.getByTestId('zoom-layer')
          fireEvent.pointerDown(zoomLayer, {
            clientX: 50,
            clientY: 50
          })
          fireEvent.pointerMove(zoomLayer, {
            clientX: 155,
            clientY: 155
          })
          fireEvent.pointerUp(zoomLayer)

          // Get the changes post panning
          const pointTransformPostPanning = glyph.getAttribute('transform')
          const xAxisLabelPostPanning = xAxisLabel.querySelector('tspan').innerHTML
          const yAxisLabelPostPanning = yAxisLabel.querySelector('tspan').innerHTML

          expect(pointTransformPrePanning).to.not.equal(pointTransformPostPanning)
          expect(xAxisLabelPrePanning).to.not.equal(xAxisLabelPostPanning)
          expect(yAxisLabelPrePanning).to.equal(yAxisLabelPostPanning)
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
          render(
            <Provider classifierStore={mockStore}>
              <ZoomingScatterPlot
                data={mockData}
                parentHeight={height}
                parentWidth={width}
                theme={zooTheme}
                xAxisLabelOffset={10}
                yAxisLabelOffset={10}
                zoomConfiguration={zoomConfiguration}
              />
            </Provider>
          )

          const glyph = document.querySelector('.visx-glyph')
          const xAxisLabel = document.querySelector('.visx-axis-bottom')
          const yAxisLabel = document.querySelector('.visx-axis-left')
          // The position and labels prior to panning
          const pointTransformPrePanning = glyph.getAttribute('transform')
          const xAxisLabelPrePanning = xAxisLabel.querySelector('tspan').innerHTML
          const yAxisLabelPrePanning = yAxisLabel.querySelector('tspan').innerHTML

          // // Now to simulate the panning
          const zoomLayer = screen.getByTestId('zoom-layer')
          fireEvent.pointerDown(zoomLayer, {
            clientX: 50,
            clientY: 50
          })
          fireEvent.pointerMove(zoomLayer, {
            clientX: 155,
            clientY: 155
          })
          fireEvent.pointerUp(zoomLayer)

          // Get the changes post panning
          const pointTransformPostPanning = glyph.getAttribute('transform')
          const xAxisLabelPostPanning = xAxisLabel.querySelector('tspan').innerHTML
          const yAxisLabelPostPanning = yAxisLabel.querySelector('tspan').innerHTML

          expect(pointTransformPrePanning).to.not.equal(pointTransformPostPanning)
          expect(xAxisLabelPrePanning).to.equal(xAxisLabelPostPanning)
          expect(yAxisLabelPrePanning).to.not.equal(yAxisLabelPostPanning)
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

        // The position and labels prior to zooming
        const pointTransformPreZooming = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPreZooming = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPreZooming = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

        // multiplying the scale 1.2 nine times is 5.159780352
        let pointTransformOnNinthZoom, xAxisLabelOnNinthZoom, yAxisLabelOnNinthZoom, pointTransformOnTenthZoom, xAxisLabelOnTenthZoom, yAxisLabelOnTenthZoom
        for (let i = 0; i < 11; i++) {
          fireEvent.dblClick(getByTestId('zoom-layer'), zoomInEventMock)
          // Ninth zoom in event
          if (i === 8) {
            pointTransformOnNinthZoom = container.querySelector('.visx-glyph').getAttribute('transform')
            xAxisLabelOnNinthZoom = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
            yAxisLabelOnNinthZoom = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
          }
          // Tenth zoom in event
          if (i === 9) {
            pointTransformOnTenthZoom = container.querySelector('.visx-glyph').getAttribute('transform')
            xAxisLabelOnTenthZoom = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
            yAxisLabelOnTenthZoom = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML
          }
        }

        // Confirming we're zoomed in
        expect(pointTransformPreZooming).to.not.equal(pointTransformOnNinthZoom)
        expect(xAxisLabelPreZooming).to.not.equal(xAxisLabelOnNinthZoom)
        expect(yAxisLabelPreZooming).to.not.equal(yAxisLabelOnNinthZoom)

        // Zooming should now have stopped because of the max zoom constraint
        expect(pointTransformOnNinthZoom).to.equal(pointTransformOnTenthZoom)
        expect(xAxisLabelOnNinthZoom).to.equal(xAxisLabelOnTenthZoom)
        expect(yAxisLabelOnNinthZoom).to.equal(yAxisLabelOnTenthZoom)
      })

      it('should not zoom out beyond the minimum zoom configuration and reset the zoom', function () {
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

        // The position and labels prior to zooming
        const pointTransformPreZooming = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPreZooming = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPreZooming = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

        // zoom in first
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        const pointTransformPostZooming = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelPostZooming = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelPostZooming = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

        // zoom out by mouse wheel
        // 1 * 1.2 * 0.8 is 0.96
        fireEvent.wheel(getByTestId('zoom-layer'), zoomOutEventMock)

        const pointTransformZoomedOut = container.querySelector('.visx-glyph').getAttribute('transform')
        const xAxisLabelZoomedOut = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
        const yAxisLabelZoomedOut = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

        // Confirm we zoomed in first
        expect(pointTransformPreZooming).to.not.equal(pointTransformPostZooming)
        expect(xAxisLabelPreZooming).to.not.equal(xAxisLabelPostZooming)
        expect(yAxisLabelPreZooming).to.not.equal(yAxisLabelPostZooming)

        // When the constraint is hit, we should reset
        expect(pointTransformZoomedOut).to.not.equal(pointTransformPostZooming)
        expect(pointTransformZoomedOut).to.equal(pointTransformPreZooming)
        expect(xAxisLabelZoomedOut).to.not.equal(xAxisLabelPostZooming)
        expect(xAxisLabelZoomedOut).to.equal(xAxisLabelPreZooming)
        expect(yAxisLabelZoomedOut).to.not.equal(yAxisLabelPostZooming)
        expect(yAxisLabelZoomedOut).to.equal(yAxisLabelPreZooming)
      })
    })

    describe('when panning', function () {
      describe('in the x-axis direction', function () {
        it('should not pan beyond the data extent minimum', function () {
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

          // The position and labels prior to panning
          const pointTransformPrePan = container.querySelector('.visx-glyph').getAttribute('transform')
          const xAxisLabelPrePan = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
          const yAxisLabelPrePan = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

          // // Now to simulate the panning
          fireEvent.pointerDown(getByTestId('zoom-layer'), {
            clientX: 50,
            clientY: 50
          })
          fireEvent.pointerMove(getByTestId('zoom-layer'), {
            clientX: -2000,
            clientY: 50
          })
          fireEvent.pointerUp(getByTestId('zoom-layer'), {
            clientX: -2000,
            clientY: 50
          })

          const pointTransformPostPan = container.querySelector('.visx-glyph').getAttribute('transform')
          const xAxisLabelPostPan = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
          const yAxisLabelPostPan = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

          // We expect no change because our arbitrary panning simulation instantly went from clientX 50 to clientX -2000
          // In reality, mousemove would be firing the whole time and the pan position would be the edge of minimum data point
          // But I have no idea of what that would be numerically
          expect(pointTransformPrePan).to.equal(pointTransformPostPan)
          expect(xAxisLabelPrePan).to.equal(xAxisLabelPostPan)
          expect(yAxisLabelPrePan).to.equal(yAxisLabelPostPan)
        })

        it('should not pan beyond the data extent maximum', function () {
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

          // The position and labels prior to panning
          const pointTransformPrePan = container.querySelector('.visx-glyph').getAttribute('transform')
          const xAxisLabelPrePan = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
          const yAxisLabelPrePan = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

          // // Now to simulate the panning
          fireEvent.pointerDown(getByTestId('zoom-layer'), {
            clientX: 50,
            clientY: 50
          })
          fireEvent.pointerMove(getByTestId('zoom-layer'), {
            clientX: 2000,
            clientY: 50
          })
          fireEvent.pointerUp(getByTestId('zoom-layer'), {
            clientX: 2000,
            clientY: 50
          })

          const pointTransformPostPan = container.querySelector('.visx-glyph').getAttribute('transform')
          const xAxisLabelPostPan = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
          const yAxisLabelPostPan = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

          // We expect no change because our arbitrary panning simulation instantly went from clientX 50 to clientX 2000
          // In reality, mousemove would be firing the whole time and the pan position would be the edge of minimum data point
          // But I have no idea of what that would be numerically
          expect(pointTransformPrePan).to.equal(pointTransformPostPan)
          expect(xAxisLabelPrePan).to.equal(xAxisLabelPostPan)
          expect(yAxisLabelPrePan).to.equal(yAxisLabelPostPan)
        })
      })

      describe('in the y-axis direction', function () {
        it('should not pan beyond the data extent minimum', function () {
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

          // The position and labels prior to panning
          const pointTransformPrePan = container.querySelector('.visx-glyph').getAttribute('transform')
          const xAxisLabelPrePan = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
          const yAxisLabelPrePan = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

          // // Now to simulate the panning
          fireEvent.pointerDown(getByTestId('zoom-layer'), {
            clientX: 50,
            clientY: 50
          })
          fireEvent.pointerMove(getByTestId('zoom-layer'), {
            clientX: 50,
            clientY: -2000
          })
          fireEvent.pointerUp(getByTestId('zoom-layer'), {
            clientX: 50,
            clientY: -2000
          })

          const pointTransformPostPan = container.querySelector('.visx-glyph').getAttribute('transform')
          const xAxisLabelPostPan = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
          const yAxisLabelPostPan = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

          // We expect no change because our arbitrary panning simulation instantly went from clientY 50 to clientY -2000
          // In reality, mousemove would be firing the whole time and the pan position would be the edge of minimum data point
          // But I have no idea of what that would be numerically
          expect(pointTransformPrePan).to.equal(pointTransformPostPan)
          expect(xAxisLabelPrePan).to.equal(xAxisLabelPostPan)
          expect(yAxisLabelPrePan).to.equal(yAxisLabelPostPan)
        })

        it('should not pan beyond the data extent maximum', function () {
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

          // The position and labels prior to panning
          const pointTransformPrePan = container.querySelector('.visx-glyph').getAttribute('transform')
          const xAxisLabelPrePan = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
          const yAxisLabelPrePan = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

          // // Now to simulate the panning
          fireEvent.pointerDown(getByTestId('zoom-layer'), {
            clientX: 50,
            clientY: 50
          })
          fireEvent.pointerMove(getByTestId('zoom-layer'), {
            clientX: 50,
            clientY: 2000
          })
          fireEvent.pointerUp(getByTestId('zoom-layer'), {
            clientX: 50,
            clientY: 2000
          })

          const pointTransformPostPan = container.querySelector('.visx-glyph').getAttribute('transform')
          const xAxisLabelPostPan = container.querySelector('.visx-axis-bottom').querySelector('tspan').innerHTML
          const yAxisLabelPostPan = container.querySelector('.visx-axis-left').querySelector('tspan').innerHTML

          // We expect no change because our arbitrary panning simulation instantly went from clientY 50 to clientY 2000
          // In reality, mousemove would be firing the whole time and the pan position would be the edge of minimum data point
          // But I have no idea of what that would be numerically
          expect(pointTransformPrePan).to.equal(pointTransformPostPan)
          expect(xAxisLabelPrePan).to.equal(xAxisLabelPostPan)
          expect(yAxisLabelPrePan).to.equal(yAxisLabelPostPan)
        })
      })
    })
  })
})