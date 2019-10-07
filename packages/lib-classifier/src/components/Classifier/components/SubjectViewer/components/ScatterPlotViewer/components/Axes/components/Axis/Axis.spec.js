import { mount, shallow } from 'enzyme'
import React from 'react'
import * as d3 from 'd3'
import { scaleLinear } from '@vx/scale'
import { genRandomNormalPoints } from '@vx/mock-data'
import { AxisLeft, AxisBottom } from '@vx/axis'
import zooTheme from '@zooniverse/grommet-theme'
import { Axis } from './Axis'
import InnerTickAxis from '../InnerTickAxis'
import { MARGIN, PADDING } from '../../../../helpers/constants'


const parentWidth = 768
const parentHeight = 384
const color = zooTheme.global.colors['light-1']
const fontFamily = zooTheme.global.font.family
const fontSize = zooTheme.text.xsmall.size

const randomPoints = genRandomNormalPoints()
const xPoints = randomPoints.filter((point) => {
  return point[0]
})
const yPoints = randomPoints.filter((point) => {
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

describe('Component > Axis', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <Axis
        axis={bottomAxis}
        parentHeight={parentHeight}
        parentWidth={parentWidth}
        theme={zooTheme}
      />
    )
    expect(wrapper).to.be.ok()
  })

  it('should render null if missing an orientation', function () {
    const wrapper = shallow(
      <Axis
        parentHeight={parentHeight}
        parentWidth={parentWidth}
        theme={zooTheme}
      />
    )
    expect(wrapper.html()).to.be.null()
  })

  describe('AxisBottom', function () {
    let wrapper, wrapperProps
    before(function () {
      wrapper = shallow(
        <Axis
          axis={bottomAxis}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
        />
      )
      wrapperProps = wrapper.props()
    })

    it('should render an AxisBottom', function () {
      expect(wrapper.find(AxisBottom)).to.have.lengthOf(1)
    })

    it('should use the x-axis label', function () {
      expect(wrapperProps.label).to.equal(bottomAxis.label)
    })

    it('should style the ticks and label with the theme', function () {
      const color = zooTheme.global.colors['light-1']
      const fontFamily = zooTheme.global.font.family
      const fontSize = zooTheme.text.xsmall.size
      expect(wrapperProps.labelProps).to.deep.equal({
        fill: color,
        fontFamily,
        fontSize
      })
      expect(wrapperProps.tickLabelProps().fill).to.equal(color)
      expect(wrapperProps.tickLabelProps().fontFamily).to.equal(fontFamily)
      expect(wrapperProps.tickLabelProps().fontSize).to.equal(fontSize)
      expect(wrapperProps.tickStroke).to.equal(color)
      expect(wrapperProps.stroke).to.equal(color)
    })

    it('should position the axis at the bottom of the svg', function () {
      expect(wrapperProps.top).to.equal(parentHeight - PADDING)
      expect(wrapperProps.left).to.equal(0)
    })

    it('should use the d3 linear scale for the x-axis', function () {
      expect(wrapperProps.scale).to.equal(xScale)
    })
  })

  describe('AxisLeft', function () {
    let wrapper, wrapperProps
    before(function () {
      wrapper = shallow(
        <Axis
          axis={leftAxis}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
        />
      )
      wrapperProps = wrapper.props()
    })

    it('should render an AxisLeft', function () {
      expect(wrapper.find(AxisLeft)).to.have.lengthOf(1)
    })

    it('should use the y-axis label', function () {
      expect(wrapperProps.label).to.equal(leftAxis.label)
    })

    it('should style the ticks and label with the theme', function () {
      expect(wrapperProps.labelProps).to.deep.equal({
        fill: color,
        fontFamily,
        fontSize
      })
      expect(wrapperProps.tickLabelProps().fill).to.equal(color)
      expect(wrapperProps.tickLabelProps().fontFamily).to.equal(fontFamily)
      expect(wrapperProps.tickLabelProps().fontSize).to.equal(fontSize)
      expect(wrapperProps.tickStroke).to.equal(color)
      expect(wrapperProps.stroke).to.equal(color)
    })

    it('should position the axis at the left of the svg', function () {
      expect(wrapperProps.top).to.equal(0)
      expect(wrapperProps.left).to.equal(PADDING)
    })
  })

  describe('InnerTickAxis', function () {
    let wrapper, wrapperProps
    before(function () {
      wrapper = shallow(
        <Axis
          axis={leftAxis}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
          tickDirection='inner'
          tickLength={3}
        />
      )
      wrapperProps = wrapper.props()
    })

    it('should render a InnerTickAxis when the direction is configured to inner', function () {
      expect(wrapper.find(InnerTickAxis)).to.have.lengthOf(1)
    })

    it('should receive style related props', function () {
      expect(wrapperProps.color).to.equal(color)
      expect(wrapperProps.fontSize).to.equal(fontSize)
      expect(wrapperProps.parentHeight).to.equal(parentHeight)
      expect(wrapperProps.parentWidth).to.equal(parentWidth)
    })

    it('should receive the axis props', function () {
      expect(wrapperProps.axis).to.equal(leftAxis)
    })

    it('should receive the tick length prop', function () {
      expect(wrapperProps.tickLength).to.equal(3)
    })
  })
})