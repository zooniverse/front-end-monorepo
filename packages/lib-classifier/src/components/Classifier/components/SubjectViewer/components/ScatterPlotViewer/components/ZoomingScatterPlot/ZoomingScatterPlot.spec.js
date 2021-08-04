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

    describe.only('with the default configuration of allowing zoom in both directions', function () {
      it('should scale both axes in', function () {
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
        console.log(container.querySelector('.visx-axis-bottom').querySelectorAll('tspan')[0])
        
        const pointTransformPreZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        fireEvent.wheel(getByTestId('zoom-layer'), zoomInEventMock)
        const pointTransformPostZoomIn = container.querySelector('.visx-glyph').getAttribute('transform')
        expect(pointTransformPreZoomIn).to.not.equal(pointTransformPostZoomIn)
        // console.log(container.querySelector('.visx-axis-left'))
        console.log(container.querySelector('.visx-axis-bottom').querySelectorAll('tspan')[0])
        // screen.debug()

        // const { initialTransformMatrix, transformMatrix, zoomConfiguration } = wrapper.find(ScatterPlot).props()
        // expect(transformMatrix).to.deep.equal(initialTransformMatrix)
        // wrapper.find(ZoomEventLayer).simulate('wheel', zoomInEventMock)

        // const zoomedInTransformMatrix = wrapper.find(ScatterPlot).props().transformMatrix
        // testTransformations({
        //   currentTransformMatrix: zoomedInTransformMatrix,
        //   previousTransformMatrix: initialTransformMatrix,
        //   zoomValue: zoomConfiguration.zoomInValue,
        //   direction: 'both'
        // })
      })
    })
  })
})