import { shallow } from 'enzyme'
import { AxisLeft, AxisBottom } from '@visx/axis'
import zooTheme from '@zooniverse/grommet-theme'
import { Axis } from './Axis'
import InnerTickAxis from '../InnerTickAxis'
import {
  bottomAxis,
  color,
  fontFamily,
  fontSize,
  leftAxis,
  margin,
  padding,
  parentWidth,
  parentHeight,
  xScale
} from '../../../../helpers/mockData'

describe('Component > Axis', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <Axis
        axis={bottomAxis}
        margin={margin}
        padding={padding}
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
        axis={{
          label: 'a label'
        }}
        margin={margin}
        padding={padding}
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
          color={color}
          margin={margin}
          padding={padding}
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
      const dx = xScale.range()[1] / 2
      expect(wrapperProps.labelProps).to.deep.equal({
        dx: -dx,
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
      expect(wrapperProps.top).to.equal(parentHeight - margin.top - margin.bottom)
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
          color={color}
          margin={margin}
          padding={padding}
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
        dy: '2.5em',
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
      expect(wrapperProps.left).to.equal(padding.left)
    })
  })

  describe('InnerTickAxis', function () {
    let wrapper, wrapperProps
    before(function () {
      wrapper = shallow(
        <Axis
          axis={leftAxis}
          color={color}
          margin={margin}
          padding={padding}
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
