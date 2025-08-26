import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { Factory } from 'rosie'

import mockStore from '@test/mockStore/mockStore.js'

import ScatterPlot from './ScatterPlot'
import { glyphComponents } from '../../../../helpers/getDataSeriesSymbol'
import {
  dataSeriesWithXErrors,
  dataSeriesWithYErrors,
  lightCurveMockData,
  margin,
  parentWidth,
  parentHeight,
  randomSingleSeriesData,
  transformMatrix
} from '../../helpers/mockData'
import { left, top } from '../../helpers/utils'

describe('Component > ScatterPlot', function () {
  const { variableStar } = lightCurveMockData
  const { data, dataPoints } = randomSingleSeriesData
  const defaultColors = Object.values(zooTheme.global.colors.drawingTools)

  const dataSelectionWorkflow = Factory.build('workflow', {
    tasks: {
      T0: {
        help: "",
        instruction: "If you spot a transit? If so, mark it!",
        required: false,
        tools: [
          {
            type: "graph2dRangeX",
            label: "Transit?"
          },
          {
            type: "graph2dRangeX",
            label: "Something else"
          }
        ],
        type: "dataVisAnnotation"
      }
    }
  })
  const store = mockStore({ workflow: dataSelectionWorkflow })

  function withStore() {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }

  describe('render', function () {
    beforeEach(function () {
      render(
        <ScatterPlot
          data={data}
          margin={margin}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          transformMatrix={transformMatrix}
        >
          <rect id='test' />
        </ScatterPlot>,
        {
          wrapper: withStore()
        }
      )
    })

    it('should render a Chart', function () {
      const chart = document.querySelector('.scatterPlot')
      expect(chart).to.exist()
    })

    it('should set the Chart\'s width and height from props', function () {
      const chart = document.querySelector('.scatterPlot')
      expect(chart.getAttribute('width')).to.equal(parentWidth.toString())
      expect(chart.getAttribute('height')).to.equal(parentHeight.toString())
    })

    it('should render Backgrounds', function () {
      const backgrounds = document.querySelectorAll('.chartBackground')
      expect(backgrounds).to.have.lengthOf(2)
    })

    it('should style the Background fill', function () {
      const backgrounds = document.querySelectorAll('.chartBackground')
      backgrounds.forEach((backgroundElement) => {
        expect(backgroundElement.getAttribute('fill')).to.be.a('string')
      })
    })

    it('should render a clipPath with a child rect the size of the parent chart minus the axes margin', function () {
      const clipPath = document.querySelector('clipPath')
      expect(clipPath.querySelector('rect').getAttribute('height')).to.equal(`${parentHeight - margin.top - margin.bottom}`)
      expect(clipPath.querySelector('rect').getAttribute('width')).to.equal(`${parentWidth - margin.left - margin.right}`)
    })

    it('should render chart content', function () {
      expect(document.querySelectorAll('g.chartContent')).to.have.lengthOf(1)
    })

    it('should render chart axes', function () {
      expect(document.querySelectorAll('g.chartAxes')).to.have.lengthOf(1)
    })

    it('should set the position of the Group wrapping the Chart', function () {
      const chartGroupWrapper = document.querySelector('g.chartContent')
      const leftPosition = left('outer', margin)
      const topPosition = top('outer', margin)
      expect(chartGroupWrapper.getAttribute('transform')).to.equal(`translate(${leftPosition}, ${topPosition})`)
    })

    it('should set the position of the Group wrapping the Axes', function () {
      const axesGroupWrapper = document.querySelector('g.chartAxes')
      const leftPosition = left('outer', margin)
      expect(axesGroupWrapper.getAttribute('transform')).to.equal(`translate(${leftPosition}, ${margin.top})`)
    })

    it('should render children', function () {
      expect(document.querySelectorAll('rect#test')).to.have.lengthOf(1)
    })
  })

  describe('when there\'s a single data series', function () {
    let glyphs
    beforeEach(function () {
      render(
        <ScatterPlot
          data={data}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          transformMatrix={transformMatrix}
        />,
        {
          wrapper: withStore()
        }
      )
      glyphs = document.querySelectorAll('.visx-glyph-circle')
    })

    it('should render a number of glyph components equal to the number of data points', function () {
      expect(glyphs).to.have.lengthOf(dataPoints.length)
    })

    it('should render the glyph components with a fill color', function () {
      glyphs.forEach((glyph) => {
        expect(glyph.getAttribute('fill')).to.equal(defaultColors[0])
      })
    })
  })

  describe('when there are multiple data series', function () {
    let renderedSeriesGlyphs
    beforeEach(function () {
      render(
        <ScatterPlot
          data={variableStar.scatterPlot.data}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          transformMatrix={transformMatrix}
        />,
        {
          wrapper: withStore()
        }
      )
      renderedSeriesGlyphs = Object.keys(glyphComponents).filter(key => {
        const components = document.querySelectorAll(`.visx-glyph-${key}`)
        return components.length > 0
      })
    })

    it('should render different glyph components for each data series', function () {
      expect(renderedSeriesGlyphs[0]).to.not.equal(renderedSeriesGlyphs[1])
    })

    it('should render a number of glyph components equal to the number of data points for each data series', function () {
      variableStar.scatterPlot.data.forEach((series, index) => {
        const selector = `.visx-glyph-${renderedSeriesGlyphs[index]}`
        const glyphs = document.querySelectorAll(selector)
        expect(glyphs).to.have.lengthOf(series.seriesData.length)
      })
    })

    it('should render the glyph components for each series with different fill colors', function () {
      variableStar.scatterPlot.data.forEach((series, index) => {
        document.querySelectorAll(`.visx-glyph-${renderedSeriesGlyphs[index]}`).forEach((glyph) => {
          const fill = glyph.getAttribute('fill')
          expect(fill).to.equal(zooTheme.global.colors[series.seriesOptions.color])
        })
      })
    })
  })

  describe('when there are error bars', function () {
    describe('for the horizontal (x) direction', function () {
      it('should render a line centered at the glyph component', function () {
        const data = dataSeriesWithXErrors.data
        render(
          <ScatterPlot
            data={data}
            parentHeight={parentHeight}
            parentWidth={parentWidth}
            theme={zooTheme}
            transformMatrix={transformMatrix}
          />,
          {
            wrapper: withStore()
          }
        )

        const lines = document.querySelectorAll('line.errorBar')
        expect(lines).to.have.lengthOf(data[0].seriesData.length)
        const glyphs = document.querySelectorAll('.visx-glyph-circle')
        lines.forEach((line, index) => {
          const glyph = glyphs.item(index).parentElement
          const transform = glyph.getAttribute('transform').replace('translate(', '').replace(')', '')
          const [left, top] = transform.split(',')
          expect(line.getAttribute('x1')).to.not.equal(line.getAttribute('x2'))
          expect(line.getAttribute('y1')).to.equal(line.getAttribute('y2'))
          expect(parseFloat(line.getAttribute('x1'))).to.be.below(parseFloat(left))
          expect(parseFloat(line.getAttribute('x2'))).to.be.above(parseFloat(left))
        })
      })
    })

    describe('for the vertical (y) direction', function () {
      it('should render a line centered at the glyph component', function () {
        const data = dataSeriesWithYErrors.data
        render(
          <ScatterPlot
            data={data}
            parentHeight={parentHeight}
            parentWidth={parentWidth}
            theme={zooTheme}
            transformMatrix={transformMatrix}
          />,
          {
            wrapper: withStore()
          }
        )

        const lines = document.querySelectorAll('line.errorBar')
        expect(lines).to.have.lengthOf(data[0].seriesData.length)
        const glyphs = document.querySelectorAll('.visx-glyph-circle')
        lines.forEach((line, index) => {
          const glyph = glyphs.item(index).parentElement
          const transform = glyph.getAttribute('transform').replace('translate(', '').replace(')', '')
          const [left, top] = transform.split(',')
          expect(line.getAttribute('y1')).to.not.equal(line.getAttribute('y2'))
          expect(line.getAttribute('x1')).to.equal(line.getAttribute('x2'))
          expect(parseFloat(line.getAttribute('y1'))).to.be.below(parseFloat(top))
          expect(parseFloat(line.getAttribute('y2'))).to.be.above(parseFloat(top))
        })
      })
    })
  })

  describe('when there are underlays', function () {
    it('should calculate SVG positions and set it as underlayParameters for the coordinate area Background component', function () {
      const phaseLimit = 0.2
      const underlays = [
        { fill: zooTheme.global.colors['light-3'], startPosition: -phaseLimit, xAxisWidth: phaseLimit },
        { fill: zooTheme.global.colors['light-3'], startPosition: 1, xAxisWidth: phaseLimit }
      ]
      render(
        <ScatterPlot
          data={variableStar.scatterPlot.data}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          transformMatrix={transformMatrix}
          underlays={underlays}
        />,
        {
          wrapper: withStore()
        }
      )

      underlays.forEach(({ fill }) => {
        const underlay = document.querySelector(`.chartBackground-underlay[fill="${fill}"]`)
        expect(underlay).to.exist()
      })
    })
  })

  describe('with selection enabled', function () {
    let brushLayer, user

    describe('without any selections', function () {
      beforeEach(function () {
        render(
          <ScatterPlot
            data={variableStar.scatterPlot.data}
            experimentalSelectionTool
            parentHeight={parentHeight}
            parentWidth={parentWidth}
            theme={zooTheme}
            transformMatrix={transformMatrix}
          />,
          {
            wrapper: withStore()
          }
        )
        brushLayer = document.querySelector('.chartContent .brushLayer')
      })

      it('should render a visx brush layer', function () {
        expect(brushLayer.querySelector('.visx-brush-overlay')).to.exist()
      })
    })

    describe('with selections', function () {
      beforeEach(function () {
        const [task] = store.workflowSteps.active.tasks
        store.classifications.addAnnotation(task, [
          {
            tool: 0,
            toolType: 'graph2dRangeX',
            x: 275,
            width: 50,
            zoomLevelOnCreation: 0
          },
          {
            tool: 0,
            toolType: 'graph2dRangeX',
            x: 500,
            width: 10,
            zoomLevelOnCreation: 0
          }
        ])

        render(
          <ScatterPlot
            data={variableStar.scatterPlot.data}
            experimentalSelectionTool
            parentHeight={parentHeight}
            parentWidth={parentWidth}
            theme={zooTheme}
            transformMatrix={transformMatrix}
          />,
          {
            wrapper: withStore()
          }
        )
        brushLayer = document.querySelector('.chartContent .brushLayer')
      })

      it('should render a visx brush layer', function () {
        expect(brushLayer.querySelector('.visx-brush-overlay')).to.exist()
      })

      it('should render the selections', function () {
        expect(brushLayer.querySelectorAll('.selection')).to.have.lengthOf(2)
      })

      it('should render delete buttons', function () {
        const user = userEvent.setup()
        const buttons = brushLayer.querySelectorAll('[role="button"]')
        expect(buttons).to.have.lengthOf(2)
        buttons.forEach(async (button, index) => {
          const label = button.getAttribute('aria-label')
          expect(label).to.equal('SubjectViewer.ScatterPlotViewer.Selection.delete')
          expect(brushLayer.querySelectorAll('.selection')).to.have.lengthOf(2 - index)
          await user.click(button)
          expect(brushLayer.querySelectorAll('.selection')).to.have.lengthOf(1 - index)
        })
      })
    })

    describe('with selections but disabled', function () {
      beforeEach(function () {
        const [task] = store.workflowSteps.active.tasks
        store.classifications.addAnnotation(task, [
          {
            tool: 0,
            toolType: 'graph2dRangeX',
            x: 275,
            width: 50,
            zoomLevelOnCreation: 0
          },
          {
            tool: 0,
            toolType: 'graph2dRangeX',
            x: 500,
            width: 10,
            zoomLevelOnCreation: 0
          }
        ])

        render(
          <ScatterPlot
            data={variableStar.scatterPlot.data}
            disabled
            experimentalSelectionTool
            parentHeight={parentHeight}
            parentWidth={parentWidth}
            theme={zooTheme}
            transformMatrix={transformMatrix}
          />,
          {
            wrapper: withStore()
          }
        )
        brushLayer = document.querySelector('.chartContent .brushLayer')
      })

      it('should not render a visx brush layer', function () {
        expect(brushLayer.querySelector('.visx-brush-overlay')).not.to.exist()
      })

      it('should render the selections', function () {
        expect(brushLayer.querySelectorAll('.selection')).to.have.lengthOf(2)
      })

      it('should not show delete buttons', function () {
        const buttons = brushLayer.querySelectorAll('[role="button"]')
        expect(buttons).to.have.lengthOf(0)
      })
    })
  })
})
