import { shallow } from 'enzyme'
import React from 'react'
import { Group } from '@vx/group'
import { Circle } from '@vx/shape'
import zooTheme from '@zooniverse/grommet-theme'
import Axes from '../Axes'
import Background from '../../../SVGComponents/Background'
import Chart from '../../../SVGComponents/Chart'
import ScatterPlot from './ScatterPlot'
import { glyphComponents } from '../../helpers/constants'
import {
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

    it('should render a Background', function () {
      expect(wrapper.find(Background)).to.have.lengthOf(1)
    })

    it('should style the Background fill', function () {
      expect(wrapper.find(Background).props().fill).to.be.a('string')
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
})
