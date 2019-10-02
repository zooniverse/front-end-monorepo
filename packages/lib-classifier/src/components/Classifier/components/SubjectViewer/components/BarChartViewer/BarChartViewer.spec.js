import { mount, shallow } from 'enzyme'
import React from 'react'
import { Bar } from '@vx/shape'
import { Group } from '@vx/group'
import { AxisBottom, AxisLeft } from '@vx/axis'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { scaleBand, scaleLinear } from '@vx/scale'

import mockData, { mockDataWithColor } from './mockData'
import { BarChartViewer } from './BarChartViewer'
import Chart from '../SVGComponents/Chart'
import Background from '../SVGComponents/Background'

const {
  data,
  options: {
    xAxisLabel,
    xAxisMargin,
    yAxisLabel,
    yAxisMargin
  }
} = mockData

const darkZooTheme = Object.assign({}, zooTheme, { dark: true })

const darkZooTheme = Object.assign({}, zooTheme, { dark: true })

describe.only('Component > BarChartViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <BarChartViewer
        data={data}
        parentHeight={500}
        parentWidth={500}
        xAxisLabel={xAxisLabel}
        xAxisMargin={xAxisMargin}
        yAxisLabel={yAxisLabel}
        yAxisMargin={yAxisMargin}
      />
    )
    expect(wrapper).to.be.ok()
  })

  describe('Chart', function () {
    const originalSize = 500
    const newSize = 200
    let wrapper
    before(function () {
      wrapper = shallow(
        <BarChartViewer
          data={data}
          parentHeight={originalSize}
          parentWidth={originalSize}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
    })

    it('should render', function () {
      expect(wrapper.find(Chart)).to.have.lengthOf(1)
    })

    it('should resize when the parent container size changes', function () {
      let chart = wrapper.find(Chart)
      expect(chart.props().height).to.equal(originalSize)
      expect(chart.props().width).to.equal(originalSize)
      wrapper.setProps({ parentHeight: newSize, parentWidth: newSize })
      chart = wrapper.find(Chart)
      expect(chart.props().height).to.equal(newSize)
      expect(chart.props().width).to.equal(newSize)
    })
  })

  describe('Background', function () {
    let wrapper
    before(function () {
      wrapper = mount(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
    })

    it('should render', function () {
      expect(wrapper.find(Background)).to.have.lengthOf(1)
    })

    it('should set the fill color from the theme', function () {
      expect(wrapper.find(Background).props().fill).to.equal('white')
      wrapper.setProps({ theme: darkZooTheme })
      const { theme } = wrapper.props()
      expect(wrapper.find(Background).props().fill).to.equal(theme.global.colors['dark-3'])
    })
  })

  describe('Group', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
    })
    it('should render', function () {
      expect(wrapper.find(Group)).to.have.lengthOf(2)
    })

    it('should set its left position with margin props', function () {
      const groups = wrapper.find(Group)
      groups.forEach((group) => {
        expect(group.props().left).to.be.a('number')
        expect(group.props().left).to.equal(xAxisMargin)
      })
    })
  })

  describe('Bar', function () {
    let wrapper
    before(function () {
      wrapper = mount(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
    })

    it('should render a Bar for each item in the data array', function () {
      expect(wrapper.find(Bar)).to.have.lengthOf(data.length)
    })

    it('should default to use the theme brand color for the fill', function () {
      const bars = wrapper.find(Bar)
      const { theme } = wrapper.props()
      bars.forEach((bar) => {
        expect(bar.props().fill).to.equal(theme.global.colors.brand)
      })
    })

    it('should set the x value each bar from the data using a band scale', function () {
      const bars = wrapper.find(Bar)
      bars.forEach((bar) => {
        expect(bar.props().x).to.be.a('number')
      })
    })

    it('should set the y value each bar from the data using a linear scale', function () {
      const bars = wrapper.find(Bar)
      bars.forEach((bar) => {
        expect(bar.props().x).to.be.a('number')
      })
    })

    it('should set the each bar\'s calculated width and height', function () {
      const bars = wrapper.find(Bar)
      bars.forEach((bar) => {
        expect(bar.props().width).to.be.a('number')
        expect(bar.props().height).to.be.a('number')
      })
    })

    it('should use defined colors from the data if defined', function () {
      wrapper.setProps({ data: mockDataWithColor.data })
      const bars = wrapper.find(Bar)
      bars.forEach((bar) => {
        expect(bar.props().fill).to.equal(zooTheme.global.colors['accent-3'])
      })
    })
  })

  describe('AxisBottom', function () {
    it('should render', function () {
      const wrapper = shallow(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
      expect(wrapper.find(AxisBottom)).to.have.lengthOf(1)
    })

    it('should have a defined scale', function () {
      const wrapper = shallow(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
      expect(wrapper.find(AxisBottom).props().scale).to.be.a('function')
    })

    it('should use the theme text colors', function () {
      let axisBottomProps
      const wrapper = mount(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
      const { theme } = wrapper.props()
      const lightTextColor = theme.global.colors.text.light
      const darkTextColor = theme.global.colors.text.dark
      axisBottomProps = wrapper.find(AxisBottom).props()
      expect(axisBottomProps.stroke).to.equal(lightTextColor)
      expect(axisBottomProps.tickStroke).to.equal(lightTextColor)
      expect(axisBottomProps.tickLabelProps().fill).to.equal(lightTextColor)
      expect(axisBottomProps.labelProps.fill).to.equal(lightTextColor)

      wrapper.setProps({ theme: darkZooTheme })
      axisBottomProps = wrapper.find(AxisBottom).props()
      expect(axisBottomProps.stroke).to.equal(darkTextColor)
      expect(axisBottomProps.tickStroke).to.equal(darkTextColor)
      expect(axisBottomProps.tickLabelProps().fill).to.equal(darkTextColor)
      expect(axisBottomProps.labelProps.fill).to.equal(darkTextColor)
    })

    it('should use the font family from the theme', function () {
      const wrapper = mount(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
      const { theme } = wrapper.props()
      const axisBottomProps = wrapper.find(AxisBottom).props()
      expect(axisBottomProps.labelProps.fontFamily).to.equal(theme.global.font.family)
      expect(axisBottomProps.tickLabelProps().fontFamily).to.equal(theme.global.font.family)
    })

    it('should use the xAxisLabel prop for the axis label', function () {
      const wrapper = shallow(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )

      expect(wrapper.find(AxisBottom).props().label).to.equal(xAxisLabel)
    })
  })

  describe('AxisLeft', function () {
    it('should render', function () {
      const wrapper = shallow(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
      expect(wrapper.find(AxisLeft)).to.have.lengthOf(1)
    })

    it('should have a defined scale', function () {
      const wrapper = shallow(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
      expect(wrapper.find(AxisLeft).props().scale).to.be.a('function')
    })

    it('should use the theme text colors', function () {
      let axisLeftProps
      const wrapper = mount(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
      const { theme } = wrapper.props()
      const lightTextColor = theme.global.colors.text.light
      const darkTextColor = theme.global.colors.text.dark
      axisLeftProps = wrapper.find(AxisLeft).props()
      expect(axisLeftProps.stroke).to.equal(lightTextColor)
      expect(axisLeftProps.tickStroke).to.equal(lightTextColor)
      expect(axisLeftProps.tickLabelProps().fill).to.equal(lightTextColor)
      expect(axisLeftProps.labelProps.fill).to.equal(lightTextColor)

      wrapper.setProps({ theme: darkZooTheme })
      axisLeftProps = wrapper.find(AxisLeft).props()
      expect(axisLeftProps.stroke).to.equal(darkTextColor)
      expect(axisLeftProps.tickStroke).to.equal(darkTextColor)
      expect(axisLeftProps.tickLabelProps().fill).to.equal(darkTextColor)
      expect(axisLeftProps.labelProps.fill).to.equal(darkTextColor)
    })

    it('should use the font family from the theme', function () {
      const wrapper = mount(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )
      const { theme } = wrapper.props()
      const axisLeftProps = wrapper.find(AxisLeft).props()
      expect(axisLeftProps.labelProps.fontFamily).to.equal(theme.global.font.family)
      expect(axisLeftProps.tickLabelProps().fontFamily).to.equal(theme.global.font.family)
    })

    it('should use the yAxisLabel prop for the axis label', function () {
      const wrapper = shallow(
        <BarChartViewer
          data={data}
          parentHeight={500}
          parentWidth={500}
          theme={zooTheme}
          xAxisLabel={xAxisLabel}
          xAxisMargin={xAxisMargin}
          yAxisLabel={yAxisLabel}
          yAxisMargin={yAxisMargin}
        />
      )

      expect(wrapper.find(AxisLeft).props().label).to.equal(yAxisLabel)
    })
  })
})
