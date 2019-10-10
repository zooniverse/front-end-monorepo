import { mount, shallow } from 'enzyme'
import React from 'react'
import * as d3 from 'd3'
import { scaleLinear } from '@vx/scale'
import { genRandomNormalPoints } from '@vx/mock-data'
import { Group } from '@vx/group'
import Axes from './Axes'
import Axis from './components/Axis'
import { MARGIN, PADDING } from '../../helpers/constants'

const parentWidth = 768
const parentHeight = 384

const randomPoints = genRandomNormalPoints()
const xPoints = randomPoints.map((point) => {
  return point[0]
})
const yPoints = randomPoints.map((point) => {
  return point[1]
})

const dataExtent = {
  x: d3.extent(xPoints),
  y: d3.extent(yPoints)
}

const xScale = scaleLinear({
  domain: dataExtent.x,
  range: [0 + PADDING, parentWidth - MARGIN]
})

const yScale = scaleLinear({
  domain: dataExtent.y,
  range: [parentHeight - PADDING, 0 + MARGIN]
})

const bottomAxis = {
  label: 'Days',
  orientation: 'bottom',
  scale: xScale
}

const leftAxis = {
  label: 'Brightness',
  orientation: 'left',
  scale: yScale
}

const axesConfig = {
  xAxis: bottomAxis,
  yAxis: leftAxis
}

describe('Component > Axes', function () {
  describe('render', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <Axes
          axesConfig={axesConfig}
          tickDirection='outer'
          tickLength={10}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
        />
      )
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render a Group of Axis components', function () {
      expect(wrapper.find(Group)).to.have.lengthOf(1)
      expect(wrapper.find(Axis)).to.have.lengthOf(2)
    })

    it('should pass the xAxis to only one of the Axis components', function () {
      expect(wrapper.find({ axis: axesConfig.xAxis })).to.have.lengthOf(1)
    })

    it('should pass the yAxis to only one of the Axis components', function () {
      expect(wrapper.find({ axis: axesConfig.yAxis })).to.have.lengthOf(1)
    })

    it('should pass the rest of the props to the Axis components', function () {
      const axisComponents = wrapper.find(Axis)
      axisComponents.forEach((component) => {
        expect(component.props().tickDirection).to.equal('outer')
        expect(component.props().tickLength).to.equal(10)
        expect(component.props().parentHeight).to.equal(parentHeight)
        expect(component.props().parentWidth).to.equal(parentWidth)
      })
    })
  })
})