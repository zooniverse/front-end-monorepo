import { shallow } from 'enzyme'
import React from 'react'
import { genRandomNormalPoints } from '@vx/mock-data'
import { Group } from '@vx/group'
import { Circle } from '@vx/shape'
import { zip } from 'lodash'
import zooTheme from '@zooniverse/grommet-theme'
import Axes from './components/Axes'
import Background from '../SVGComponents/Background'
import Chart from '../SVGComponents/Chart'
import { ScatterPlotViewer } from './ScatterPlotViewer'
import { MARGIN, PADDING } from './helpers/constants'

const parentWidth = 768
const parentHeight = 384

const randomPoints = genRandomNormalPoints()
const xPoints = randomPoints.map((point) => {
  return point[0]
})
const yPoints = randomPoints.map((point) => {
  return point[1]
})

const data = {
  x: xPoints,
  y: yPoints
}

const dataPoints = zip(data.x, data.y)

const transformMatrix = {
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  translateX: 0,
  translateY: 0
}

describe('Component > ScatterPlotViewer', function () {
  describe('render', function () {
    let wrapper, chart
    before(function () {
      wrapper = shallow(
        <ScatterPlotViewer
          data={data}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          transformMatrix={transformMatrix}
        >
          <rect></rect>
        </ScatterPlotViewer>
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
      expect(chart.props().width).to.equal(parentWidth + MARGIN)
      expect(chart.props().height).to.equal(parentHeight)
    })

    it('should render a Background', function () {
      expect(wrapper.find(Background)).to.have.lengthOf(1)
    })

    it('should style the Background fill', function () {
      expect(wrapper.find(Background).props().fill).to.be.a('string')
    })

    it('should render a Group component', function () {
      expect(wrapper.find(Group)).to.have.lengthOf(1)
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

    it('should render Axes', function () {
      expect(wrapper.find(Axes)).to.have.lengthOf(1)
    })

    it('should render children', function () {
      expect(wrapper.find('rect')).to.have.lengthOf(1)
    })
  })
})