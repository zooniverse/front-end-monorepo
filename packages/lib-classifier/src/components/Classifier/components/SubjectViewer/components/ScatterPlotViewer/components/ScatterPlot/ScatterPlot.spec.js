import { shallow } from 'enzyme'
import React from 'react'
import { Group } from '@vx/group'
import zooTheme from '@zooniverse/grommet-theme'
import Axes from '../Axes'
import Background from '../../../SVGComponents/Background'
import Chart from '../../../SVGComponents/Chart'
import ScatterPlot from './ScatterPlot'
import { glyphComponents } from '../../helpers/constants'
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

const { variableStar } = lightCurveMockData
const { data, dataPoints } = randomSingleSeriesData

describe('Component > ScatterPlot', function () {
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
    let wrapper
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
    })

    it('should render a number of glyph components equal to the number of data points', function () {
      const glyphs = wrapper.find(glyphComponents[0])
      expect(glyphs).to.have.lengthOf(dataPoints.length)
    })
  })

  describe('when there\'s multiple data series', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <ScatterPlot
          data={variableStar.data}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          transformMatrix={transformMatrix}
        />
      )
    })

    it('should render different glyph components for each data series', function () {
      const renderedSeriesGlyphs = glyphComponents.filter((component) => {
        const components = wrapper.find(component)
        return components.length > 0
      })

      expect(renderedSeriesGlyphs[0]).to.not.equal(renderedSeriesGlyphs[1])
    })

    it('should render a number of glyph components equal to the number of data points for each data series', function () {
      const renderedSeriesGlyphs = glyphComponents.filter((component) => {
        const components = wrapper.find(component)
        return components.length > 0
      })
      variableStar.data.forEach((series, index) => {
        expect(wrapper.find(renderedSeriesGlyphs[index])).to.have.lengthOf(series.seriesData.length)
      })
    })
  })

  describe('when there are error bars', function () {
    describe('for the horizontal (x) direction', function () {
      it('should render a line centered at the glyph component', function () {
        const data = [{
          seriesData: dataSeriesWithXErrors,
          seriesOptions: {
            label: 'My data'
          }
        }]
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
        const data = [{
          seriesData: dataSeriesWithYErrors,
          seriesOptions: {
            label: 'My data'
          }
        }]
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
          expect(line.props().y1).to.be.above(glyph.props().top)
          expect(line.props().y2).to.be.below(glyph.props().top)
        })
      })
    })
  })
})
