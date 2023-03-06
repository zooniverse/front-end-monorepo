import { shallow } from 'enzyme'
import { Group } from '@visx/group'
import zooTheme from '@zooniverse/grommet-theme'
import Axes from '../Axes'
import Background from '../../../SVGComponents/Background'
import Chart from '../../../SVGComponents/Chart'
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
  describe('render', function () {
    let wrapper, chart
    before(function () {
      wrapper = shallow(
        <ScatterPlot
          data={data}
          margin={margin}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          transformMatrix={transformMatrix}
        >
          <rect id='test' />
        </ScatterPlot>
      )
      chart = wrapper.find(Chart)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render a Chart', function () {
      expect(chart).to.have.lengthOf(1)
    })

    it('should set the Chart\'s width and height from props', function () {
      expect(chart.props().width).to.equal(parentWidth)
      expect(chart.props().height).to.equal(parentHeight)
    })

    it('should render Backgrounds', function () {
      expect(wrapper.find(Background)).to.have.lengthOf(2)
    })

    it('should style the Background fill', function () {
      wrapper.find(Background).forEach((backgroundElement) => {
        expect(backgroundElement.props().fill).to.be.a('string')
      })
    })

    it('should not render the plot area background if the axis ticks are inner facing', function () {
      wrapper.setProps({ tickDirection: 'inner' })
      expect(wrapper.find(Background)).to.have.lengthOf(1)
      wrapper.setProps({ tickDirection: 'outer' })
    })

    it('should render a clipPath with a child rect the size of the parent chart minus the axes margin', function () {
      const clipPath = wrapper.find('clipPath')
      expect(clipPath).to.have.lengthOf(1)
      expect(clipPath.find('rect').props().height).to.equal(parentHeight - margin.top - margin.bottom)
      expect(clipPath.find('rect').props().width).to.equal(parentWidth - margin.left - margin.right)
    })

    it('should set the clipPath attribute with the clipPath id on the Group wrapping the data', function () {
      const clipPathId = wrapper.find('clipPath').props().id
      expect(wrapper.find(Group).first().props().clipPath).to.equal(`url(#${clipPathId})`)
    })

    it('should render Group components', function () {
      expect(wrapper.find(Group)).to.have.lengthOf(2)
    })

    it('should set the position of the Group wrapping the Chart', function () {
      const chartGroupWrapper = wrapper.find(Group).first()
      const leftPosition = left('outer', margin)
      const topPosition = top('outer', margin)
      expect(chartGroupWrapper.props().left).to.equal(leftPosition)
      expect(chartGroupWrapper.props().top).to.equal(topPosition)
    })

    it('should set the position of the Group wrapping the Axes', function () {
      const axesGroupWrapper = wrapper.find(Group).last()
      const leftPosition = left('outer', margin)
      expect(axesGroupWrapper.props().left).to.equal(leftPosition)
      expect(axesGroupWrapper.props().top).to.equal(margin.top)
    })

    it('should render Axes', function () {
      expect(wrapper.find(Axes)).to.have.lengthOf(1)
    })

    it('should render children', function () {
      expect(wrapper.find('rect#test')).to.have.lengthOf(1)
    })
  })

  describe('when there\'s a single data series', function () {
    let wrapper, glyphs
    before(function () {
      wrapper = shallow(
        <ScatterPlot
          data={data}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          transformMatrix={transformMatrix}
        />
      )
      glyphs = wrapper.find(glyphComponents.circle)
    })

    it('should render a number of glyph components equal to the number of data points', function () {
      expect(glyphs).to.have.lengthOf(dataPoints.length)
    })

    it('should render the glyph components with a fill color', function () {
      glyphs.forEach((glyph) => {
        expect(glyph.props().fill).to.not.be.empty()
        expect(glyph.props().fill).to.not.equal('transparent')
        expect(glyph.props().fill).to.equal(defaultColors[0])
      })
    })
  })

  describe('when there\'s multiple data series', function () {
    let wrapper, renderedSeriesGlyphs
    before(function () {
      wrapper = shallow(
        <ScatterPlot
          data={variableStar.scatterPlot.data}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          transformMatrix={transformMatrix}
        />
      )
      renderedSeriesGlyphs = Object.values(glyphComponents).filter((component) => {
        const components = wrapper.find(component)
        return components.length > 0
      })
    })

    it('should render different glyph components for each data series', function () {
      expect(renderedSeriesGlyphs[0]).to.not.equal(renderedSeriesGlyphs[1])
    })

    it('should render a number of glyph components equal to the number of data points for each data series', function () {
      variableStar.scatterPlot.data.forEach((series, index) => {
        expect(wrapper.find(renderedSeriesGlyphs[index])).to.have.lengthOf(series.seriesData.length)
      })
    })

    it('should render the glyph components for each series with different fill colors', function () {
      variableStar.scatterPlot.data.forEach((series, index) => {
        wrapper.find(renderedSeriesGlyphs[index]).forEach((glyph) => {
          const { fill } = glyph.props()
          expect(fill).to.not.be.empty()
          expect(fill).to.not.equal('transparent')
          expect(fill).to.equal(zooTheme.global.colors[series.seriesOptions.color])
        })
      })
    })
  })

  describe('when there are error bars', function () {
    describe('for the horizontal (x) direction', function () {
      it('should render a line centered at the glyph component', function () {
        const data = dataSeriesWithXErrors.data
        const wrapper = shallow(
          <ScatterPlot
            data={data}
            parentHeight={parentHeight}
            parentWidth={parentWidth}
            theme={zooTheme}
            transformMatrix={transformMatrix}
          />
        )

        const lines = wrapper.find('line')
        expect(lines).to.have.lengthOf(data[0].seriesData.length)
        lines.forEach((line, index) => {
          const glyph = wrapper.find('GlyphCircle').at(index)
          expect(line.props().x1).to.not.equal(line.props().x2)
          expect(line.props().y1).to.equal(line.props().y2)
          expect(line.props().x1).to.be.below(glyph.props().left)
          expect(line.props().x2).to.be.above(glyph.props().left)
        })
      })
    })

    describe('for the vertical (y) direction', function () {
      it('should render a line centered at the glyph component', function () {
        const data = dataSeriesWithYErrors.data
        const wrapper = shallow(
          <ScatterPlot
            data={data}
            parentHeight={parentHeight}
            parentWidth={parentWidth}
            theme={zooTheme}
            transformMatrix={transformMatrix}
          />
        )

        const lines = wrapper.find('line')
        expect(lines).to.have.lengthOf(data[0].seriesData.length)
        lines.forEach((line, index) => {
          const glyph = wrapper.find('GlyphCircle').at(index)
          expect(line.props().x1).to.equal(line.props().x2)
          expect(line.props().y1).to.not.equal(line.props().y2)
          expect(line.props().y1).to.be.below(glyph.props().top)
          expect(line.props().y2).to.be.above(glyph.props().top)
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
      const wrapper = shallow(
        <ScatterPlot
          data={variableStar.scatterPlot.data}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          transformMatrix={transformMatrix}
          underlays={underlays}
        />
      )
      
      const backgroundOfCoordinateArea = wrapper.find(Group).first().find(Background)
      const { underlayParameters } = backgroundOfCoordinateArea.props()
      underlayParameters.forEach((parameters, index) => {
        const { fill, left, width } = parameters
        expect(fill).to.equal(underlays[index].fill)
        expect(left).to.be.a('number')
        expect(width).to.be.a('number')
      })
    })
  })
})
