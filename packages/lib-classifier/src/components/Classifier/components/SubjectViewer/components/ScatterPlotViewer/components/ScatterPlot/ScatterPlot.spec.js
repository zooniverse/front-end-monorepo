import { mount, shallow } from 'enzyme'
import React from 'react'
import { Group } from '@vx/group'
import { Circle } from '@vx/shape'
import zooTheme from '@zooniverse/grommet-theme'
import Axes from '../Axes'
import Background from '../../../SVGComponents/Background'
import Chart from '../../../SVGComponents/Chart'
import { ScatterPlot } from './ScatterPlot'
import {
  data,
  dataPoints,
  margin,
  parentWidth,
  parentHeight,
  transformMatrix
} from '../../helpers/mockData'
import { left, top } from '../../helpers/utils'

describe('Component > ScatterPlot', function () {
  describe('render', function () {
    let wrapper, chart
    before(function () {
      wrapper = shallow(
        <ScatterPlot
          data={data}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          transformMatrix={transformMatrix}
        >
          <rect></rect>
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

    it('should render a number of Circle components equal to the number of data points', function () {
      const circles = wrapper.find(Circle)
      expect(circles).to.have.lengthOf(dataPoints.length)
    })

    it('should style the Circle\'s fill', function () {
      const circles = wrapper.find(Circle)
      circles.forEach((circle) => {
        expect(circle.props().fill).to.be.a('string')
      })
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
      expect(wrapper.find('rect')).to.have.lengthOf(1)
    })
  })
})