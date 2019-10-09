import { mount, shallow } from 'enzyme'
import React from 'react'
import * as d3 from 'd3'
import { scaleLinear } from '@vx/scale'
import { genRandomNormalPoints } from '@vx/mock-data'
import { Axis } from '@vx/axis'
import { Group } from '@vx/group'
import { Line } from '@vx/shape'
import zooTheme from '@zooniverse/grommet-theme'
import InnerTickAxis from './InnerTickAxis'
import { MARGIN, PADDING } from '../../../../helpers/constants'


const parentWidth = 768
const parentHeight = 384
const color = zooTheme.global.colors['light-1']
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

describe.only('Component > InnerTickAxis', function () {
  it('should render without crashing', function () {
    const wrapper = mount(
      <svg>
        <InnerTickAxis
          axis={bottomAxis}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
        />
      </svg>
    )
    expect(wrapper).to.be.ok()
  })

  describe('Axis', function () {
    let wrapper, axisComponent, axisComponentProps
    before(function () {
      wrapper = mount(
        <svg>
          <InnerTickAxis
            axis={bottomAxis}
            color={color}
            fontSize={fontSize}
            parentHeight={parentHeight}
            parentWidth={parentWidth}
          />
        </svg>
      )
      axisComponent = wrapper.find(Axis)
      axisComponentProps = axisComponent.props()
    })

    it('should render', function () {
      expect(axisComponent).to.have.lengthOf(1)
    })

    it('should hide the axis line', function () {
      expect(axisComponentProps.hideAxisLine).to.be.true()
    })

    it('should have a label', function () {
      expect(axisComponentProps.label).to.equal(bottomAxis.label)
    })

    it('should have a scale', function () {
      expect(axisComponentProps.scale).to.be.a('function')
      expect(axisComponentProps.scale).to.equal(bottomAxis.scale)
    })

    it('should be positioned left', function () {
      expect(axisComponentProps.left).to.equal(0)
    })

    it('should have a configurable tick length', function () {
      expect(axisComponentProps.tickLength).to.equal(5)
      wrapper.setProps({ children:
        <InnerTickAxis
          axis={bottomAxis}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          tickLength={10}
        />
      })
      expect(wrapper.find(Axis).props().tickLength).to.equal(10)
    })

    it.only('should have tick labels', function () {
      const ticks = axisComponent.find(Group).find(Group).find('text')
      // vx Axis defaults to 10 number of ticks
      console.log(axisComponent.debug())
      expect(ticks).to.have.lengthOf(10)
    })

    it('should style the tick labels', function () {
      const ticks = axisComponent.find(Group).first().find('text')
      ticks.forEach((tick) => {
        const tickProps = tick.props()
        expect(tickProps.fontSize).to.equal(fontSize)
        expect(tickProps.fill).to.equal(color)
      })
    })

    it('should style the tick line', function () {
      const lines = axisComponent.find(Group).first().find(Line)
      lines.forEach((line) => {
        const lineProps = line.props()
        expect(lineProps.stroke).to.equal(color)
      })
    })

    it('should set each tick line to and from props with x and y coordinates', function () {
      const lines = axisComponent.find(Group).first().find(Line)
      lines.forEach((line) => {
        const lineProps = line.props()
        expect(lineProps.to.x).to.be.a('number')
        expect(lineProps.to.y).to.be.a('number')
        expect(lineProps.from.x).to.be.a('number')
        expect(lineProps.from.x).to.be.a('number')
      })
    })
  })

  describe('with the bottom orientation', function () {
    let wrapper, axisComponent, axisComponentProps
    before(function () {
      wrapper = mount(
        <svg>
          <InnerTickAxis
            axis={bottomAxis}
            parentHeight={parentHeight}
            parentWidth={parentWidth}
            theme={zooTheme}
          />
        </svg>
      )
      axisComponent = wrapper.find(Axis)
      axisComponentProps = axisComponent.props()
    })

    it('should translate the top position using the parentHeight, MARGIN and PADDING', function () {
      expect(axisComponentProps.top).to.equal(`translate(${parentWidth - (PADDING + MARGIN)}, ${0 - MARGIN})`)
    })

    it('should set the orientation to be bottom', function () {
      expect(axisComponentProps.orientation).to.equal('bottom')
    })
  })
})