import { mount } from 'enzyme'
import React from 'react'
import { Axis } from '@vx/axis'
import { Line } from '@vx/shape'
import zooTheme from '@zooniverse/grommet-theme'
import InnerTickAxis from './InnerTickAxis'
import {
  bottomAxis,
  color,
  fontSize,
  keplerMockDataWithOptions,
  leftAxis,
  parentWidth,
  parentHeight,
  xScale
} from '../../../../helpers/mockData'

const margin = keplerMockDataWithOptions.chartOptions.margin
const padding = keplerMockDataWithOptions.chartOptions.padding

describe('Component > InnerTickAxis', function () {
  describe('render', function () {
    let wrapper, axisComponent, axisComponentProps
    before(function () {
      wrapper = mount(
        <svg>
          <InnerTickAxis
            axis={bottomAxis}
            color={color}
            fontSize={fontSize}
            margin={margin}
            padding={padding}
            parentHeight={parentHeight}
            parentWidth={parentWidth}
          />
        </svg>
      )
      axisComponent = wrapper.find(Axis)
      axisComponentProps = axisComponent.props()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render', function () {
      expect(axisComponent).to.have.lengthOf(1)
    })

    it('should hide the axis line', function () {
      expect(axisComponentProps.hideAxisLine).to.be.true()
    })

    it('should have a label', function () {
      const labelText = axisComponent.find('text').last()
      expect(axisComponentProps.label).to.equal(bottomAxis.label)
      expect(labelText.text()).to.equal(bottomAxis.label)
    })

    it('should style the label', function () {
      const textLabelProps = axisComponent.find('text').last().props()
      expect(textLabelProps.fill).to.equal(color)
      expect(textLabelProps.fontSize).to.equal(fontSize)
    })

    it('should have a scale', function () {
      expect(axisComponentProps.scale).to.be.a('function')
      expect(axisComponentProps.scale).to.equal(bottomAxis.scale)
    })

    it('should be positioned left', function () {
      expect(axisComponentProps.left).to.equal(0)
    })

    it('should render ticks', function () {
      const ticks = axisComponent.find('g.vx-axis-tick')
      expect(ticks.length).to.be.above(0)
    })

    it('should have a configurable tick length', function () {
      const lines = axisComponent.find('g.vx-axis-tick').find(Line)
      lines.forEach((line) => {
        expect(line.props().to.y - line.props().from.y).to.equal(axisComponentProps.tickLength)
      })
      wrapper.setProps({
        children: (
          <InnerTickAxis
            axis={bottomAxis}
            color={color}
            fontSize={fontSize}
            margin={margin}
            padding={padding}
            parentHeight={parentHeight}
            parentWidth={parentWidth}
            tickLength={10}
          />
        )
      })
      const longerLines = wrapper.find(Axis).find('g.vx-axis-tick').find(Line)
      longerLines.forEach((line) => {
        expect(line.props().to.y - line.props().from.y).to.equal(wrapper.find(Axis).props().tickLength)
      })
    })

    it('should have a label for each tick', function () {
      const tickLabels = axisComponent.find('g.vx-axis-tick').find('text')
      const ticks = xScale.ticks(10) // default numTick is 10

      expect(tickLabels).to.have.lengthOf(ticks.length)
    })

    describe('with the bottom orientation', function () {
      let wrapper, axisComponent, axisComponentProps
      before(function () {
        wrapper = mount(
          <svg>
            <InnerTickAxis
              axis={bottomAxis}
              margin={margin}
              padding={padding}
              parentHeight={parentHeight}
              parentWidth={parentWidth}
              theme={zooTheme}
            />
          </svg>
        )
        axisComponent = wrapper.find(Axis)
        axisComponentProps = axisComponent.props()
      })

      it('should calculate the top position using the parentHeight and tickLength', function () {
        expect(axisComponentProps.top).to.equal(parentHeight - margin.top - axisComponentProps.tickLength)
      })

      it('should set the orientation to be bottom', function () {
        expect(axisComponentProps.orientation).to.equal('bottom')
      })

      it('should position the label using a CSS transform calculated with the parentWidth, padding, and margin', function () {
        const transform = axisComponent.find('text').last().props().transform
        expect(transform).to.equal(`translate(${parentWidth - (padding.left + margin.left)}, ${0 - margin.right})`)
      })
    })

    describe('with the left orientation', function () {
      let wrapper, axisComponent, axisComponentProps
      before(function () {
        wrapper = mount(
          <svg>
            <InnerTickAxis
              axis={leftAxis}
              margin={margin}
              padding={padding}
              parentHeight={parentHeight}
              parentWidth={parentWidth}
              theme={zooTheme}
            />
          </svg>
        )
        axisComponent = wrapper.find(Axis)
        axisComponentProps = axisComponent.props()
      })

      it('should set the top position to be equal to the padding top', function () {
        expect(axisComponentProps.top).to.equal(padding.top)
      })

      it('should set the orientation to be right', function () {
        // this is 'right' because of the way the VX Axis works...
        expect(axisComponentProps.orientation).to.equal('right')
      })

      it('should position the label using a CSS transform calculated with the margin', function () {
        const transform = axisComponent.find('text').last().props().transform
        expect(transform).to.equal(`translate(${margin.left}, ${margin.right})`)
      })
    })
  })
})
