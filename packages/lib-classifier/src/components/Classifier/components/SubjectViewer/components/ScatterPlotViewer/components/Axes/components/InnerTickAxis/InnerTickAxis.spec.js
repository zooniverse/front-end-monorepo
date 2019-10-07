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

describe.only('Component > InnerTickAxis', function () {
  it('should render without crashing', function () {
    const wrapper = mount(
      <svg>
        <InnerTickAxis
          axis={bottomAxis}
          parentHeight={parentHeight}
          parentWidth={parentWidth}
          theme={zooTheme}
        />
      </svg>
    )
    expect(wrapper).to.be.ok()
  })

  describe('Axis', function () {
    let wrapper, axisComponent
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
    })

    it('should render', function () {
      expect(axisComponent).to.have.lengthOf(1)
    })

    it('should hide the axis line', function () {
      expect(axisComponent.props().hideAxisLine).to.be.true()
    })

    it('should have a label', function () {
      expect(axisComponent.props().label).to.equal(bottomAxis.label)
    })
  })
})